


// const BASE_URL = "http://10.135.118.176:3000"

import {baseUrl} from "@/options.js"

// 封装后的带token的uni.request的promise对象
export const http = (options) => {
	return new Promise((resolve, reject) => {
		// if(uni.getStorage("token") == null || uni.getStorage("token") == ""){
		// 	return;
		// }
	
		uni.request({
			url: baseUrl + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				"token": uni.getStorageSync('token')
			},
			success: (res) => {
				
				if (res == '') {
					return uni.showToast({
						icon: 'loading',
						title: '获取数据失败'
					})
				
				}
				if(res.data.code == 2){
					uni.showToast({
						title:"功能不可用,请先登录",
						icon:"none"
					})
					return;
				}
				// if(res.data.code != 1){
				// 	uni.showToast({
				// 		title:"请求失败",
				// 		icon:"none"
				// 	})
				// 	return;
				// }
				if (options.success) {
					options.success(res)
				} else {

					resolve(res)
				}
			},
			fail: (err) => {
			
				return uni.showToast({
					icon: 'loading',
					title: '请求失败'
				})
				if (options.fail) {
					options.fail(res)
				} else {
					reject(err)
				}

			}
		})
	})
}
