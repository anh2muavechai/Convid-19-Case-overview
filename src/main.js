// environment: this is based on the mode in webpack configs
const env = process.env.NODE_ENV;

//Import packages
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment';

//______________________________
//config Vue
window.Vue = Vue
Vue.prototype.moment = moment
var _ = require('lodash');
Vue.config.devtools = true

// Axios setting
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers["content-type"] = "application/json";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.prototype.axios = axios;

// Import custom js packages
import App from './App.vue';
// Build app into #app div
new Vue({
    el: '#app',
    //.$mount('#app'); $mount is only needed if el: hasn't been specified. vue instance is in unmounted state (no element to
    // attach it to) and that's when $mount comes to play.
    render: (h) => h(App),
});