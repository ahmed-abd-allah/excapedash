/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)
import vSelect from 'vue-select'
// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'
 
// Vue.use(VueMoment, {
//     moment,
// })
import * as moment from "moment/moment";

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';
Vue.use(require('vue-moment'));
Vue.use(moment);

import {
  initialize
} from './utils/auth';

// axios
import axiosApi from "./axios.js"
Vue.prototype.$http = axiosApi


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import {
  VueHammer
} from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Snotify
import 'vue-snotify/styles/material.css';

import Snotify, {
  SnotifyPosition
} from 'vue-snotify'

const SnotifyOptions = {
  toast: {
    position: SnotifyPosition.leftTop,
  }
}
Vue.use(Snotify, SnotifyOptions)


// Feather font icon
require('./assets/css/iconfont.css')

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate, {
  locale: 'ar'
})



// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false
initialize(store, router);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
