import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const isPermitted = async (key) => {
    const {permission} = await auth()
    const allow = permission.some(p=>p.key === key)
    if(!allow){
        redirect('/dashboard')
    }
}

