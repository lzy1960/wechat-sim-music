import request from "../utils/request";

export const getDefault = (query) => request('/search/default', query)
export const getHotList = (query) => request('/search/hot/detail', query)
export const getSearchList = (query) => request('/search', query)
export const getSearchSuggest = (query) => request('/search/suggest', query)