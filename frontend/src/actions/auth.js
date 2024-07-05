"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";
import api from ".";

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

        const response = await api.post('register', params);
        
        if (response.status_code != 100) {
            throw new Error(response.message);
        }
        
        return response;

    } catch (error) {
        throw new Error(error.message);
    }
}