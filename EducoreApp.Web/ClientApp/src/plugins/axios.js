import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import auth from './../utils/auth'
const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'text/plain',
        'Content-Type': 'multipart/form-data'
    },
});

export function useAxiosLoader() {
    const [count, setCount] = useState(0);
    const interceptors = useMemo(() => {
        const inc = () => setCount(count => count + 1);
        const dec = () => setCount(count => count - 1);
        return ({
            request: (request) => {
                inc()
                return request;
            },
            response: (response) => {
                dec()
                return response;
            },
            error: (error) => {
                dec()
                return Promise.reject(error);
            }
        });
    }, []);
    useEffect(() => {
        return () => {
            api.interceptors.request.use(
                interceptors.request,
                interceptors.error
            );
            api.interceptors.response.use(
                interceptors.response,
                interceptors.error
            );
        };
    }, [interceptors]);
    return count > 0;
};

const ApiService = {
    setToken() {
        api.defaults.headers.common['Authorization'] = `Bearer ${auth.getToken()}`;
    },

    query(resource, params) {
        return api.get(resource, params);
    },

    get(resource, slug = '') {
        return api.get(resource + (slug ? '/' + slug : ''));
    },

    post(resource, params) {
        return api.post(resource, params);
    },

    patch(resource, params) {
        return api.patch(resource, params);
    },

    update(resource, slug, params) {
        return api.put(resource + '/' + slug, params);
    },

    put(resource, params) {
        return api.put(resource, params);
    },

    delete(resource, slug = '') {
        return api.delete(resource + (slug ? '/' + slug : ''));
    },
};

export default ApiService;