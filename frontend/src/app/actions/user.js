import api from "@/app/actions/index";


export async function getUser() {
    try {
        return await api.get('auth/user');
    }catch (e) {
        console.log('test error',e.message);
    }

    return null;
}