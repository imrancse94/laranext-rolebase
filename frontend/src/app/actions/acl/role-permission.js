"use server"

import api from "@/app/actions/index";

export const assignPermission = async (params) => {
    return await api.post(`acl/role-permission/assign/permission`,params);
}

export const getPermissionByRoleId = async (params) => {
    return await api.get(`acl/role-permission/${params.id}`);
}