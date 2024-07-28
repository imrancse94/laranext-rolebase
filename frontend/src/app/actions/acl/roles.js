"use server"

import api from "@/app/actions/index";

export const getRoles = async (params = {}) => {
    const response = await api.get(`acl/roles`,params)

    return response;
}

export const createRole = async (params) => {
    const response = await api.post(`acl/roles/create`,params)

    return response;
}
