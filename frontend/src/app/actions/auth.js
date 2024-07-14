"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";
import api from "./index";

export async function login(params) {

    try {
        const response = await signIn("credentials", {
            ...params,
            redirect: false
        })
        
        return response;
    } catch (error) {

        if (error instanceof AuthError) {
            const { cause } = error;
            console.log('error',cause)
            throw new Error(cause?.err?.message);
        }

        throw error;
    }


}

export async function logout() {
    await signOut()
}

export async function register(params) {
    try {

        return await api.post('register', params);

    } catch (error) {
         // console.log('error',error)
        throw error;
    }
}