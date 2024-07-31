"use server"

import api from "@/app/actions/index";
import { revalidatePath } from "next/cache";
const validateRoute = '/acl/roles'
export const getRoles = async (params = {}) => {
    const response = await api.get(`acl/roles`,params)
    // revalidatePath(validateRoute)
    return response;
}

export const createRole = async (params) => {
    const response = await api.post(`acl/roles/create`,params)
    revalidatePath(validateRoute)
    return response;
}


export const getRoleById = async (id,params = {}) => {
    const response = await api.get(`acl/roles/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}

export const updateRoleById = async (id,params) => {
    const response = await api.put(`acl/roles/update/${id}`,params)
    revalidatePath(validateRoute)
    return response;
}

export const deleteRoleById = async (id,params = {}) => {
    const response = await api.delete(`acl/roles/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}