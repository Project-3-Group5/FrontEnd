import API from "./api.js";

export const getUsers = () => API.get("/users");

export const getUserById = (id) => API.get(`/users/${id}`);

export const updateUser = (id, user) => API.put(`/users/${id}`, user);

export const updateUserBio = (id, bio) =>
    API.patch(`/users/${id}/bio`, bio, {
        headers: {
            "Content-Type": "text/plain",
        },
    });

export const deleteUser = (id) => API.delete(`/users/${id}`);