import request from "../utils/request";

export const phoneLogin = (query) => request('/login/cellphone', query)