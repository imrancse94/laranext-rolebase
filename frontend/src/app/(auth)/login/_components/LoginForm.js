"use client"

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import RouteLink from "@/components/RouteLink";
import { useForm } from "react-hook-form"
import loginSchema from "@/validation/login";
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from "@/actions/auth";
import Alert from "@/components/Alert";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [error,setError] = useState("")
    const defaultValues = useMemo(() => ({
        email: '',
        password: ''
      }), [])
    
      const methods = useForm({
        resolver: yupResolver(loginSchema),
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
            const response = await login(params);
            
            if(response){
                router.push('/dashboard');
            }
        } catch (error) {
            setError(error.message)
        }

    })

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <div className="space-y-4">
            {error && <Alert type="warning" message={error}/>}
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
            
            <Button
                type="submit"
                label="Sign in"
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <RouteLink to={`/register`}>
                    Sign up
                </RouteLink>
            </p>
            </div>
        </Form>
    )
}