// "use server"

import {auth, signIn, signOut} from "@/auth";
import {redirect} from "next/navigation";
import {updatePermission} from "@/app/actions/auth";
import ServiceContainer from "@/libs/serviceContainer";

class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getInstance(){
        return this;
    }

    async request(endpoint, options = {}) {
        const session = await auth()
        const url = `${this.baseURL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if(session?.access_token){
            defaultHeaders['Authorization'] = `Bearer ${session.access_token}`
        }

        if(session?.permission_version){
            defaultHeaders['permission-version'] = `${session.permission_version}`
        }

        const updatedOptions = {
            ...options,
            headers: defaultHeaders
        };

        const response = await fetch(url, updatedOptions);
        const final_response =   await response.json()
        console.log('final_response',final_response?.permission_version)

        if(final_response?.permission_version){
           //await redirect(`/api/hello`)
           //  await updatePermission({
           //     ...session,
           //      type:'permission',
           //      permission:final_response.permission,
           //      permission_version:final_response?.permission_version
           //
           //  })

        }

        return final_response;
        //return fetch(url, updatedOptions);
    }

    async get(endpoint, params = {}, headers = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(endpoint + `?${queryString}`, {
            method: 'GET',
            headers
        });
    }

    async post(endpoint, body, headers = {}) {
        const res = await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers
        });
        return res;
    }

    async put(endpoint, body, headers = {}) {
        return await this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers
        });
    }

    async delete(endpoint, headers = {}) {
        return await this.request(endpoint, {
            method: 'DELETE',
            headers
        });
    }
}

// Usage example


const api = new Api('http://localhost:8000/api/v1/');

export default api;

