"use server"

import api from "@/app/actions";

export async function getUser() {
    try {
        return await api.get('auth/user');
    } catch (e) {

    }

    return null;
}

export async function getAllUsers(params = {}) {
    try {
        return await api.get('acl/users',params);
    } catch (e) {

    }

    return null;
}

export async function createUser(params) {
    try {

        return await api.post('acl/users/create', params);

    } catch (error) {
        throw error;
    }
}
export async function updateUserById(id,params) {
    try {

        return await api.post(`acl/users/update/${id}`, params);

    } catch (error) {
        throw error;
    }
}
export async function getUserById(id = {}) {

    try {
        return await api.get(`acl/users/${id}`);
    } catch (e) {

    }

    return null;
}
