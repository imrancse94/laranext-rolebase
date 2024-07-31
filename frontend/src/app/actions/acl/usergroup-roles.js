"use server"

import api from "@/app/actions/index";

export const assignRole = async (params) => {
    return await api.post(`acl/usergroup-role-assoc/assign/role`,params);
}