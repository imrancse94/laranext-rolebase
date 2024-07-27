import api from "@/app/actions/index";

export const getRoles = async (params = {}) => {
    const response = await api.get(`acl/roles`,params)

    return response;
}