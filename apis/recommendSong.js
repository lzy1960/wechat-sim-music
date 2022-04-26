import request from "../utils/request";

export const getRecommendSong = (query) => request('/recommend/songs', query)