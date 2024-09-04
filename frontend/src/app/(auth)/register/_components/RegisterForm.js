"use client"

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import RouteLink from "@/components/RouteLink";
import { useForm } from "react-hook-form"
import registerSchema from "@/validation/register";
import { yupResolver } from '@hookform/resolvers/yup';
import { register } from "@/app/actions/auth";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const defaultValues = useMemo(() => ({
        name:'',
        email: '',
        password: '',
        password_confirmation:''
      }), [])
    
      const methods = useForm({
        resolver: yupResolver(registerSchema),
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
            const response = await register(params);

            if(response?.status_code === 100){
                setMessage(response.message);
                reset();
            }else{
                if(response?.errors?.email){
                    setError(response?.errors?.email)
                }
            }
            
        } catch (error) {

            setError(error.message)
        }

    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <div className="space-y-2">
            {message && <Alert type="success" message={message}/>}
            {error && <Alert type="warning" message={error}/>}
            <div>
                <Input
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                />
            </div>
            <div>
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div>
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <div>
                <Input
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                />
            </div>
            
            <Button
                loading={isSubmitting}
                type="submit"
                label="Sign in"
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have account ?{" "}
                <RouteLink to={`/login`}>
                    Login
                </RouteLink>
            </p>
            </div>   
        </Form>
    )
}