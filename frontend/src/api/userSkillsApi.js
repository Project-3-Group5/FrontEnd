import API from "./api.js";

export const getUserSkills = (userId) =>
    API.get(`/user-skill/user/${userId}`);

export const getOfferedSkills = (userId) =>
    API.get(`/user-skill/user/${userId}/offered`);

export const getDesiredSkills = (userId) =>
    API.get(`/user-skill/user/${userId}/desired`);

export const addSkillToUser = (userId, skillId, offered) =>
    API.post("/user-skill/add", null, {
        params: {
            userId,
            skillId,
            offered,
        },
    });