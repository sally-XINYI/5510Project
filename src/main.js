import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$axios = axios;
Vue.prototype.HOST = '/api'
axios.defaults.baseURL = '/api/'
axios.defaults.headers.common['token'] = "f4c902c9ae5a2a9d8f84868ad064e706"
Vue.config.productionTip = false;
//设置请求头

export const GET = (url, param) => {
    return axios.get(`${BASE_URL}${url}`, param).then(res => res.data);
};

export const POST = (url, param) => {
    return axios.get(`${BASE_URL}${url}`, param).then(res => res.data);
};

export const PUT = (url, param) => {
    return axios.get(`${BASE_URL}${url}`, param).then(res => res.data);
};

// axios.defaults.headers.put["Content-type"] = "application/json"
// axios.defaults.headers.post["Content-type"] = "application/json"

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
