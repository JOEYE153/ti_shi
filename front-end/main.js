import Vue from 'vue'
import App from './App'
import {http} from "@/common/request.js"
import uView from "uview-ui";
Vue.use(uView);
import {baseUrl} from "@/options.js"
import share from './common/share.js'
Vue.mixin(share) 
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$http = http;
Vue.prototype.checkLogin = function(backpage,backtype){
	
	var token = uni.getStorageSync("token")
	if(token==""){
		uni.redirectTo({
			url:"/pages/login/login?backpage="+backpage+"&backtype"+backtype,
		});
		return false;
	}
	return [token]
	
}

Vue.prototype.apiserver = baseUrl
 // Vue.prototype.apiserver = "http://10.135.5.193:3000"

const app = new Vue({
    ...App,share
})
app.$mount()
