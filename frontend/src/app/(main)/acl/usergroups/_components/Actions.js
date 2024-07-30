"use client"

import Modal from "@/components/Modal";
import swal from "@/libs/swal"
import { useState } from "react"
import Input from "@/components/Input";
import usergroupSchema from "@/validation/usergroup";
import { useRouter } from "next/navigation";
import FormComponent from "@/components/FormComponent";
import { getUsergroupById,updateUsergroupById,deleteUsergroupById } from "@/app/actions/acl/usergroups";
import toaster from "@/libs/toaster";
import ActionButton from "@/components/ActionButton";
import { FilePenLine,Trash2} from 'lucide-react';


export default function Actions({ params }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usergroup,setUsergroup] = useState({name:''})

    const deleteAction = async () => {
        const s = await swal('delete', 'Are you sure to delete the role ' + params.id)

        if (s.isConfirmed) {
            const response = await deleteUsergroupById(params.id)
            if(response?.status_code === 100){
                toaster('success','Deleted successfully')
            }else  if(response?.status_code === 103){
                toaster('error',response.message)
            }
        }
    }


    const update = async (formData) => {

        const response = await updateUsergroupById(params.id,formData);
        
        if(response?.status_code === 100){
            toaster('success','Usergroup updated successfully')
            setModalOpen(false)
        }

        return response;
    }
    const handleEdit = async() => {
        setLoading(true);
        const dbUsergroup = await getUsergroupById(params.id)
        if(dbUsergroup?.status_code === 100){
            setUsergroup(dbUsergroup.data)
            setModalOpen(true)
        }
        setLoading(false)
    }

    return (
        <>
        {
            isModalOpen &&
            <Modal title="Edit Usergroup" onCloseModal={() => setModalOpen(false)}>
                <FormComponent
                    validationSchema={usergroupSchema}
                    initialValues={usergroup}
                    action={update}
                   // getResponse={createRoleResponse}
                    closeAction={() => setModalOpen(false)}
                >
                    <div className="text-left">
                        <Input
                            label="Name"
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                    </div>

                </FormComponent>
            </Modal>
        }
        <div className="flex justify-center">
           <ActionButton
                loading={loading}
                icon={<FilePenLine size="18"/>}
                keyName="edit-usergroup"
                onAction={handleEdit}
                className="underline mx-1 cursor-pointer text-indigo-600 hover:text-indigo-900"
                label="Edit"
            />
            <ActionButton
                icon={<Trash2 size={18} />}
                keyName="delete-usergroup"
                onAction={deleteAction}
                className="underline mx-1 text-xs cursor-pointer text-red-600 hover:text-red-900"
                label="Delete"
            />
        </div>
        </>
    )
}