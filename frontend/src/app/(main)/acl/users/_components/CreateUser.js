"use client"

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {useState} from "react";
import Input from "@/components/Input";
import userSchema from "@/validation/user";
import FormComponent from "@/components/FormComponent";
import {createUser} from "@/app/actions/acl/user";
import toaster from "@/libs/toaster";
import RhfMultiCheckbox from "@/components/RhfMultiCheckbox";



export default function CreateUser({usergroups}) {

    const [isModalOpen, setModalOpen] = useState(false);

    const initialValues = {
        usergroup_id: [],
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }

    const handleAction = () => {
        setModalOpen(true)
    }

    const createUserResponse = (response) => {
        if (response?.status_code === 100) {
            toaster('success', 'User added successfully.')
            setModalOpen(false)
        }
    }


    return (
        <div className="ml-2">
            <Button
                type="button"
                action={handleAction}
                label="Add User"
                keyName="create-user"
                className="w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>

            {
                isModalOpen &&
                <Modal title="Add User" onCloseModal={() => setModalOpen(false)}>
                    <FormComponent
                        validationSchema={userSchema.createUserSchema}
                        initialValues={initialValues}
                        action={createUser}
                        getResponse={createUserResponse}
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
                        <div className="text-left">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="text-left">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="text-left">
                            <Input
                                label="Confirm Password"
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="text-left">
                            <RhfMultiCheckbox
                                className="w-auto h-auto max-h-[200px]"
                                name="usergroup_id"
                                label="User Group"
                                options={usergroups || []}
                            />
                        </div>
                    </FormComponent>
                </Modal>
            }
        </div>

    )
}