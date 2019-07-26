// Core
import { getFullApiUrl } from '../instruments';

const GROUP_ID = 'muigd1gnahf3';
const TOKEN = '0eibdtkic6';
const url = 'https://lab.lectrum.io/react/api';
const api = getFullApiUrl(url, GROUP_ID);

export const request = {
    get: async () => {
        const response = await fetch(api, {
            method: 'GET',
        });

        const { data } = await response.json();

        return data;
    },
    post: async (comment) => {
        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data } = await response.json();

        return data;
    },
    put: async (id) => {
        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const { data } = await response.json();

        return data;
    },
    delete: async (id) => {
        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });
    },
};

export { GROUP_ID, TOKEN, api, url };
