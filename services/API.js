const {default: Axios} = require('axios');

const BASE_URL = 'http://178.150.163.118:3030/api/v1/';
const SING_UP = 'sign-up';
const SIGN_IN = 'sign-in';
const RECIPIES_LIST = 'recipes';
// const SKIP = 'skip=';
// const LIMIT = 'limit=';
// const SEARCH = 'search=';

export const authApi = {
  signUp: (data) => Axios.post(`${BASE_URL}${SING_UP}`, data),
  signIn: (data) => Axios.post(`${BASE_URL}${SIGN_IN}`, data),
};

export const recipiesApi = {
  getList: () => Axios.get(`${BASE_URL}${RECIPIES_LIST}`),
  getRecipe: (id) => Axios.get(`${BASE_URL}${RECIPIES_LIST}/${id}`),
  lazyLoad: (skip, limit) =>
    Axios.get(`${BASE_URL}${RECIPIES_LIST}`, {params: {skip, limit}}),
  searcResults: (search, skip, limit) =>
    Axios.get(`${BASE_URL}${RECIPIES_LIST}`, {
      params: {
        search,
        skip,
        limit,
      },
    }),
};
