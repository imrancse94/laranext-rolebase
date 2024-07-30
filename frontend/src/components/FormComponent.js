"use client"

import { useMemo, useState } from "react";
import Form from "@/components/Form";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from "@/components/Alert";
import Button from "@/components/Button";

export default function FormComponent({ ...props }) {

    const {
        validationSchema,
        initialValues,
        action,
        getResponse,
        closeAction,
        children
    } = props;

    const [error, setError] = useState("")

    const defaultValues = useMemo(() => (initialValues), [])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const onSubmit = handleSubmit(async (params) => {
        try {
            setError("");
            const response = await action(params);

            if (response?.status_code === 103) {
                Object.keys(initialValues).map(i => {
                    if(response?.errors[i]){
                        setError(response.errors[i])
                    }
                })
            }

            if (getResponse) {
                getResponse(response)
            }
        } catch (error) {
            setError(error.message)
        }

    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <div className="space-y-4">
                {error && <Alert type="warning" message={error} />}
                {children}
                <div className="flex">
                    {action &&
                        <Button
                            className="mr-2 w-auto bg-green-500 text-sm hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            loading={isSubmitting}
                            type="submit"
                            label="Save"
                        />
                    }

                    {closeAction && 
                    <Button
                        className="w-auto bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        action={closeAction}
                        type="button"
                        label="Colse"
                    />}
                </div>
            </div>
        </Form>
    )
}