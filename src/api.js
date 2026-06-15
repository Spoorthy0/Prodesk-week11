const BASE = 'http://localhost:3000';

const handle = async (res) => {
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `HTTP ${res.status}`);
    }
    return res.json();
};

export const getPosts = () =>
    fetch(`${BASE}/api/posts`).then(handle);

export const getTopRecentPosts = () =>
    fetch(`${BASE}/api/posts/top-recent`).then(handle);

export const createPost = (formData) =>
    fetch(`${BASE}/api/posts`, { method: 'POST', body: formData }).then(handle);

export const updatePost = (id, data) =>
    fetch(`${BASE}/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handle);

export const deletePost = (id) =>
    fetch(`${BASE}/api/posts/${id}`, { method: 'DELETE' }).then(handle);

export const register = (data) =>
    fetch(`${BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handle);

export const login = (data) =>
    fetch(`${BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handle);
