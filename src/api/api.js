import axios from 'axios';
import Cookies from 'js-cookie';

export const apiUrl = 'https://railwayapp-strapi-production-abae.up.railway.app/api/';
export const apiPort = '';
export const baseUrl = apiUrl + apiPort || 'https://railwayapp-strapi-production-abae.up.railway.app/api/';

const getHeaders = (requiresAuth) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (requiresAuth) {
        const jwtCookie = Cookies.get('jwt');

        if (jwtCookie) {
            headers['Authorization'] = `Bearer ${jwtCookie}`;
        } else {
            console.log('error', jwtCookie);
        }
    }

    return headers;
};

const apiGet = async (url, params, requiresAuth = true, language = '') => {
    return axios
        .get(`${baseUrl}${url}${params}`, {
            headers: getHeaders(requiresAuth, language)
        })
        .then((response) => ({
            success: true,
            error: null,
            data: response.data
        }))
        .catch((response) => ({
            success: false,
            error: response.json,
            data: null
        }));
};

const apiPost = async (url, payload, requiresAuth = true, language = '') => {
    return axios
        .post(`${baseUrl}${url}`, payload, {
            headers: getHeaders(requiresAuth, language)
        })
        .then((response) => ({
            success: true,
            error: null,
            data: response.data
        }))
        .catch((response) => ({
            success: false,
            error: response.message,
            data: null
        }));
};
const apiPut = async (url, payload, requiresAuth = true, language = '') => {
    return axios
        .put(`${baseUrl}${url}`, payload, {
            headers: getHeaders(requiresAuth, language)
        })
        .then((response) => ({
            success: true,
            error: null,
            data: response.data
        }))
        .catch((response) => ({
            success: false,
            error: response.json,
            data: null
        }));
};

const apiPatch = async (url, payload, requiresAuth = true, language = '') => {
    return axios
        .patch(`${baseUrl}${url}`, payload, {
            headers: getHeaders(requiresAuth, language)
        })
        .then((response) => ({
            success: true,
            error: null,
            data: response.data
        }))
        .catch((response) => ({
            success: false,
            error: response.json,
            data: null
        }));
};
const apiDelete = async (url, requiresAuth = true, language = '') => {
    return axios
        .delete(`${baseUrl}${url}`, {
            headers: getHeaders(requiresAuth, language)
        })
        .then((response) => ({
            success: true,
            error: null,
            data: response.data
        }))
        .catch((response) => ({
            success: false,
            error: response.json,
            data: null
        }));
};
const api = {
    apiVideo: {
        getBookmarkedMovies: async (params) => apiGet('movies', params),
        deleteBookmarked: async (documentId) => apiDelete(`Bookmarkeds/${documentId}`),
        postBookmarked: async (payload) => apiPost('Bookmarkeds', payload),
        getBookmarked: async (params) => apiGet('Bookmarkeds', params)
    },
    auth: {
        register: async (payload) => apiPost('auth/local/register', payload, false),
        login: async (payload) => apiPost('auth/local', payload, false)
    }
};

export default api;
