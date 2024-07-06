// async function api(url, options = {}) {
//     // Set default headers if not provided
//     const defaultHeaders = {
//         'Content-Type': 'application/json',
//         ...options.headers
//     };

import { auth } from "@/auth";
import { useSession } from "next-auth/react"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

//     // Update options with default headers
//     const updatedOptions = {
//         ...options,
//         headers: defaultHeaders
//     };

//     // Make the fetch call with updated options
//     const response = await fetch(url, updatedOptions);

//     // Check if the response is okay (status in the range 200-299)
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Parse and return JSON response
//     return response.json();
// }

class Api {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const session = await auth();
        const url = `${this.baseURL}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.accessToken}`,
            ...options.headers
        };

        const updatedOptions = {
            ...options,
            headers: defaultHeaders
        };

        const response = await fetch(url, updatedOptions);
        return  await response.json()
    }

    async get(endpoint, headers = {}) {
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
const api = new Api('http://localhost:8000/api/v1/');

export default api;

