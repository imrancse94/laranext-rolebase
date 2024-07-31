"use client"

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import Input from "@/components/Input";
import permissionSchema from "@/validation/permission";
import FormComponent from "@/components/FormComponent";
import { createPermission } from "@/app/actions/acl/permissions";
import toaster from "@/libs/toaster";

export default function CreatePermission() {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleAction = () => {
        setModalOpen(true)
    }

    const createPermissionResponse = (response) => {
        if(response?.status_code === 100){
            toaster('success','Permission added successfully.')
            setModalOpen(false)
        }
    }

    return (
        <div className="ml-2">
            <Button
                type="button"
                action={handleAction}
                label="Add Permission"
                keyName="create-permission"
                className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />

            {
                isModalOpen &&
                <Modal title="Add Permission" onCloseModal={() => setModalOpen(false)}>
                    <FormComponent
                         validationSchema={permissionSchema}
                         initialValues={{title:'',key:''}}
                         action={createPermission}
                         getResponse={createPermissionResponse}
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
        </div>

    )
}