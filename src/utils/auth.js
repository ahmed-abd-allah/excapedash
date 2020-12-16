import * as Cookies from "js-cookie";
export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    //// console.log("before==================")

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // const currentUser = store.getters.currentUser;


    if (requiresAuth && !Cookies.get("token")) {
      // console.log("not login")
      next('/login');
    } else if (to.path == '/login' && Cookies.get("token")) {

      // console.log("login")

      next('/');
    } else {
      // console.log("you are logined in")

      next();
    }
  });
}
// const axios = axios.create({
//     baseURL: `https://derossy-api.herokuapp.com/api/v1/`,
//     headers: {
//         "Content-Type": "application/json",

//     },
// })

// axios.CancelToken = axios.CancelToken
// axios.isCancel = axios.isCancel

// /*
//  * The interceptor here ensures that we check for the token in local storage every time an axios request is made
//  */
// axios.interceptors.request.use(
//     (config) => {
//         let token = null;
//         if (Cookies.get("token")) {

//             token = Cookies.get("token");
//         }

//         if (token) {
//             config.headers['Authorization'] = `Bearer ${ token }`
//         }

//         return config
//     },

//     (error) => {
//         return Promise.reject(error)
//     }
// )


// export default axios
