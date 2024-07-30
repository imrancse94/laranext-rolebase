"use client"

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useState } from "react";
import Input from "@/components/Input";
import usergroupSchema from "@/validation/usergroup";
import FormComponent from "@/components/FormComponent";
import { createUsergroup } from "@/app/actions/acl/usergroups";
import toaster from "@/libs/toaster";

export default function CreateUsergroup() {
    const [isModalOpen, setModalOpen] = useState(false);
    const handleAction = () => {
        setModalOpen(true)
    }

    const createUsergroupResponse = (response) => {
        if(response?.status_code === 100){
            toaster('success','Usergroup added successfully.')
            setModalOpen(false)
        }
    }

    return (
        <div className="ml-2">
            <Button
                type="button"
                action={handleAction}
                label="Add Usergroup"
                keyName="create-usergroup"
                className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />

            {
                isModalOpen &&
                <Modal title="Add Usergroup" onCloseModal={() => setModalOpen(false)}>
                    <FormComponent
                         validationSchema={usergroupSchema}
                         initialValues={{name:''}}
                         action={createUsergroup}
                         getResponse={createUsergroupResponse}
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
        </div>

    )
}