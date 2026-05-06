import API from "./api.js";

export const getSkills = () => API.get("/skill");

export const getSkillById = (id) => API.get(`/skill/${id}`);

export const deleteSkill = (id) => API.delete(`/skill/${id}`);