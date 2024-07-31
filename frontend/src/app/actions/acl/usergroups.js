"use server"

import api from "@/app/actions/index";
import { revalidatePath } from "next/cache";
const validateRoute = '/acl/usergroups'
export const getUsergroups = async (params = {}) => {
    const response = await api.get(`acl/usergroups`,params)
    // revalidatePath('/acl/roles')
    return response;
}

export const getAllUsergroups = async (params = {}) => {
    const response = await api.get(`acl/usergroups/all-list`)
    // revalidatePath('/acl/roles')
    return response;
}

export const createUsergroup = async (params) => {
    const response = await api.post(`acl/usergroups/create`,params)
    revalidatePath(validateRoute)
    return response;
}


export const getUsergroupById = async (id,params = {}) => {
    const response = await api.get(`acl/usergroups/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}

export const updateUsergroupById = async (id,params) => {
    const response = await api.put(`acl/usergroups/update/${id}`,params)
    revalidatePath(validateRoute)
    return response;
}

export const deleteUsergroupById = async (id,params = {}) => {
    const response = await api.delete(`acl/usergroups/${id}`,params);
    revalidatePath(validateRoute)
    return response;
}

export const getRoleByUsergroupId = async (params = {}) => {
    const response = await api.get(`acl/usergroup-role-assoc/${params.id}`)
    return response;
}