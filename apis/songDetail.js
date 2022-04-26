import request from "../utils/request";

export const getSongDetail = (query) => request('/song/detail', query)
export const getSongUrl = (query) => request('/song/url', query)