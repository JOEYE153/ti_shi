import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './plugins'
import resource from 'vue-resource'
import VueApexCharts from 'vue-apexcharts'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
})

Vue.config.productionTip = false
Vue.use(resource)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

// axios.defaults.baseURL = 'http://10.191.151.56:3000/'
axios.defaults.baseURL = 'https://buaatishi.com:3000/'
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
const token = sessionStorage.getItem('token')
if (token) {
  axios.defaults.headers.common.Authorization = token
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('loginStatus') === 'success') {
      next()
    } else {
      next({
        path: '/',
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
