// axiosApi
import axios from 'axios'
import * as Cookies from "js-cookie";




const axiosApi = axios.create({
  baseURL: `https://artist-app12.herokuapp.com/`,
  headers: {
    "Content-Type": "application/json",

  },
})

axiosApi.CancelToken = axiosApi.CancelToken
axiosApi.isCancel = axiosApi.isCancel

/*
 * The interceptor here ensures that we check for the token in local storage every time an axiosApi request is made
 */
axiosApi.interceptors.request.use(
  (config) => {
    let token = null;
    if (Cookies.get("token")) {

      token = Cookies.get("token");
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)


export default axiosApi;
