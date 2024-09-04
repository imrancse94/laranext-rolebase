import {auth, signIn, signOut} from "@/auth";


export const fetchApi = async (endpoint, options) => {
    const session = await auth();
    console.log(`From the fetchClient ${JSON.stringify(session?.access_token)}`);
    const url = `${process.env.API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
            ...(session && { "permission-version": `${session?.permission_version}` }),
            ...(session && { Authorization: `Bearer ${session?.access_token}` }),
        },
    });

    const final_response = await response?.json();
    console.log('final_response11',final_response?.permission_version,final_response)
    if(final_response?.permission_version){
        // await signIn("credentials",{
        //     type:'permission',
        //     permission:final_response?.permission
        // })
        await signOut()
    }

    return final_response;
};