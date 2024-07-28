"use client"

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import Input from "@/components/Input";
import roleSchema from "@/validation/role";
import { useRouter } from "next/navigation";
import FormComponent from "@/components/FormComponent";
import { createRole } from "@/app/actions/acl/roles";
import { revalidatePath } from 'next/cache';


export default function CreateRole() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("")
    const router = useRouter();
    const handleAction = () => {
        setModalOpen(true)
    }

    const createRoleResponse = (response) => {
        if(response?.status_code === 100){
            setModalOpen(false)
            revalidatePath('/')
        }
    }

    return (
        <>
            <Button
                type="button"
                action={handleAction}
                label="Add Role"
                keyName="create-role"
                className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />

            {
                isModalOpen &&
                <Modal title="Add Role" onCloseModal={() => setModalOpen(false)}>
                    <FormComponent
                         validationSchema={roleSchema}
                         initialValues={{name:''}}
                         action={createRole}
                         getResponse={createRoleResponse}
                         closeAction={() => setModalOpen(false)}
                    >
                        <div>
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
        </>

    )
}