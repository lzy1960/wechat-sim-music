import request from "../utils/request";

export const getBanner = (query) => request('/banner', query)
export const getRecommend = (query) => request('/personalized', query)
export const getTopList = (query) => request('/toplist', query)
export const getPlaylistDetail = (query) => request('/playlist/detail', query)