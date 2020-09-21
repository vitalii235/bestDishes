const {default: Axios} = require('axios');

const BASE_URL = 'http://178.150.163.118:3030/api/v1/';
const SING_UP = 'sign-up';
const SIGN_IN = 'sign-in';

export const authApi = {
  signUp: (data) => Axios.post(`${BASE_URL}${SING_UP}`, data),
  signIn: (data) => Axios.post(`${BASE_URL}${SIGN_IN}`, data),
};
