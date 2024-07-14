import api from "@/app/actions/index";
import { auth } from "@/auth";


export async function getUser() {
    try {
        // const session = await auth()
        return await api.get('auth/user');
    }catch (e) {
        console.log('test error',e.message);
    }

    return null;
}