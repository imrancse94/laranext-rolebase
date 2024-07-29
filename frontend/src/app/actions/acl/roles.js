"use server"

import api from "@/app/actions/index";
import { revalidatePath } from "next/cache";

export const getRoles = async (params = {}) => {
    const response = await api.get(`acl/roles`,params)

    return response;
}

export const createRole = async (params) => {
    const response = await api.post(`acl/roles/create`,params)
    revalidatePath('/acl/roles')
    return response;
}


export const getRoleById = async (id,params = {}) => {
    const response = await api.get(`acl/roles/${id}`,params);
    revalidatePath('/acl/roles')
    return response;
}

export const updateRoleById = async (id,params) => {
    const response = await api.put(`acl/roles/update/${id}`,params)
    revalidatePath('/acl/roles')
    return response;
}

export const deleteRoleById = async (id,params = {}) => {
    const response = await api.delete(`acl/roles/${id}`,params);
    revalidatePath('/acl/roles')
    return response;
}