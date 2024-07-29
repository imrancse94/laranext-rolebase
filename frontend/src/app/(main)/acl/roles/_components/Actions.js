"use client"

import Modal from "@/components/Modal";
import swal from "@/libs/swal"
import { useState } from "react"
import Input from "@/components/Input";
import roleSchema from "@/validation/role";
import { useRouter } from "next/navigation";
import FormComponent from "@/components/FormComponent";
import { getRoleById,updateRoleById,deleteRoleById } from "@/app/actions/acl/roles";
import toaster from "@/libs/toaster";
import ActionButton from "@/components/ActionButton";
import { FilePenLine,Trash2,Loader  } from 'lucide-react';


export default function Actions({ params }) {

    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role,setRole] = useState({name:''})

    const deleteAction = async () => {
        const s = await swal('delete', 'Are you sure to delete the role ' + params.id)

        if (s.isConfirmed) {
            const response = await deleteRoleById(params.id)
            if(response?.status_code === 100){
                toaster('success','Deleted successfully')
            }
        }
    }


    const updateRole = async (formData) => {

        const response = await updateRoleById(params.id,formData);

        if(response?.status_code === 100){
            setModalOpen(false)
        }

    }
    const handleEdit = async() => {
        setLoading(true);
        const dbRole = await getRoleById(params.id)
        if(dbRole?.status_code === 100){
            setRole(dbRole.data)
            setModalOpen(true)
        }
        setLoading(false)
    }

    return (
        <>
        {
            isModalOpen &&
            <Modal title="Edit Role" onCloseModal={() => setModalOpen(false)}>
                <FormComponent
                    validationSchema={roleSchema}
                    initialValues={role}
                    action={updateRole}
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
                keyName="edit-role"
                onAction={handleEdit}
                className="underline mx-1 cursor-pointer text-indigo-600 hover:text-indigo-900"
                label="Edit"
            />
            <ActionButton
                icon={<Trash2 size={18} />}
                keyName="delete-role"
                onAction={deleteAction}
                className="underline mx-1 text-xs cursor-pointer text-red-600 hover:text-red-900"
                label="Delete"
            />
        </div>
        </>
    )
}