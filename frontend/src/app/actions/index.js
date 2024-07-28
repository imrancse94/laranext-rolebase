import { auth } from "@/auth";
class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;
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

        const updatedOptions = {
            ...options,
            headers: defaultHeaders
        };

        const response = await fetch(url, updatedOptions);
        return  await response.json()

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

