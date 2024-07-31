"use server"

import api from "@/app/actions/index";
import { revalidatePath } from "next/cache";

const validateRoute = '/acl/permissions'

export const getPermissions = async (params = {}) => {
    const response = await api.get(`acl/permissions`,params)
    // revalidatePath('/acl/roles')
    return response;
}

export const createPermission = async (params) => {
    const response = await api.post(`acl/permissions/create`,params)
    revalidatePath(validateRoute)
    return response;
}


export const getPermissionById = async (id,params = {}) => {
    const response = await api.get(`acl/permissions/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}

export const updatePermissionById = async (id,params) => {
    const response = await api.put(`acl/permissions/update/${id}`,params)
    revalidatePath(validateRoute)
    return response;
}

export const deletePermissionById = async (id,params = {}) => {
    const response = await api.delete(`acl/permissions/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}