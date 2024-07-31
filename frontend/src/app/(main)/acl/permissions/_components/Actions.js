"use client"

import Modal from "@/components/Modal";
import swal from "@/libs/swal"
import { useState } from "react"
import Input from "@/components/Input";
import permissionSchema from "@/validation/permission";
import { useRouter } from "next/navigation";
import FormComponent from "@/components/FormComponent";
import { getPermissionById,updatePermissionById,deletePermissionById } from "@/app/actions/acl/permissions";
import toaster from "@/libs/toaster";
import ActionButton from "@/components/ActionButton";
import { FilePenLine,Trash2} from 'lucide-react';


export default function Actions({ params }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [permission,setPermission] = useState({title:'',key:''})

    const deleteAction = async () => {
        const s = await swal('delete', 'Are you sure to delete the permission ' + params.id)

        if (s.isConfirmed) {
            const response = await deletePermissionById(params.id)
            if(response?.status_code === 100){
                toaster('success','Deleted successfully')
            }else  if(response?.status_code === 103){
                toaster('error',response.message)
            }
        }
    }


    const update = async (formData) => {

        const response = await updatePermissionById(params.id,formData);
        
        if(response?.status_code === 100){
            toaster('success','Permission updated successfully')
            setModalOpen(false)
        }

        return response;
    }

    const handleEdit = async() => {
        setLoading(true);
        const dbPermission = await getPermissionById(params.id)
        if(dbPermission?.status_code === 100){
            setPermission(dbPermission.data)
            setModalOpen(true)
        }
        setLoading(false)
    }

    return (
        <>
        {
            isModalOpen &&
            <Modal title="Edit Permission" onCloseModal={() => setModalOpen(false)}>
                <FormComponent
                    validationSchema={permissionSchema}
                    initialValues={permission}
                    action={update}
                   // getResponse={createRoleResponse}
                    closeAction={() => setModalOpen(false)}
                >
                    <div className="text-left">
                        <Input
                            label="Title"
                            type="text"
                            name="title"
                            placeholder="Title"
                        />
                    </div>
                    <div className="text-left">
                        <Input
                            label="Key"
                            type="text"
                            name="key"
                            placeholder="Key"
                        />
                    </div>
                </FormComponent>
            </Modal>
        }
        <div className="flex justify-center">
           <ActionButton
                loading={loading}
                icon={<FilePenLine size="18"/>}
                keyName="edit-permission"
                onAction={handleEdit}
                className="underline mx-1 cursor-pointer text-indigo-600 hover:text-indigo-900"
                label="Edit"
            />
            <ActionButton
                icon={<Trash2 size={18} />}
                keyName="delete-permission"
                onAction={deleteAction}
                className="underline mx-1 text-xs cursor-pointer text-red-600 hover:text-red-900"
                label="Delete"
            />
        </div>
        </>
    )
}