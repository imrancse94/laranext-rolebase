import { auth } from "@/auth";
class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        const updatedOptions = {
            ...options,
            headers: defaultHeaders
        };

        const response = await fetch(url, updatedOptions);
        return  await response.json()

        //return fetch(url, updatedOptions);
    }

    async get(endpoint, headers = {}) {
        const session = await auth()
        console.log('get')
        headers = {
            ...headers,
            'Authorization':`Bearer ${session.access_token}`
        }
        return await this.request(endpoint, {
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


const api = new Api('http://localhost:8080/api/v1/');

export default api;

