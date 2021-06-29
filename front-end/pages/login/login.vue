<template>
	<view class="loginBox">
		<image class="logo" src="/static/logo.png"></image>
		<!-- #ifdef MP-WEIXIN  -->
		<button @tap ="auth">小程序登录授权</button>
		<button @tap ="test" class="wx-test-button">体验</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS||H5 -->
		<button type="default" class="wxButton" @click="wxLogin">微信登录</button>
		<button type="default" class="otherButton" @click="gotoOtherLogin">其他方式登录</button>
		<!-- #endif -->
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				backpage:"",
				backtype:1
			}
		},
		methods: {
			// #ifdef MP-WEIXIN
			async auth(){
				var _self = this;
				var info= await uni.getUserProfile({
					desc:"登录",
					lang:"zh_CN",
				})
			
				var res =await uni.login()
		
				res = 	await uni.request({
							url:_self.apiserver+"/login/wechat",
							method:"POST",
							data:{
								code:res[1].code,
								info:info[1].userInfo
							},
							
						})
				
				uni.setStorageSync("token",res[1].data.data.token)
				
				uni.switchTab({
					url:"/pages/index/index"
				})
				return;
			
				
				
			},
			async test(){
				var _self = this
				var res = await uni.request({
					url: _self.apiserver +"/login/test",
					method:"POST",
				})
				
				uni.setStorageSync("token",res[1].data.data.token)
				
				uni.switchTab({
					url:"/pages/index/index"
				})
				return;
				
			},
			async wxLogin(){
				var _self = this;
				var res = await uni.login();
				res = await uni.request({
					url:_self.apiserver+"/login/wechat",
					method:"POST",
					data:{
						code:res[1].code,
					}
				})
				
				
				res=res[1].data
				if(res.code == 1){
					
					uni.setStorageSync("token",res.data.token)
					if(_self.backpage==undefined){
						uni.switchTab({
							url:"/pages/index/index"
						})
						return;
					}														
					if(_self.backtype == 1){
						uni.redirectTo({
							url: _self.backpage
						})
					}else{
						uni.switchTab({
							url:_self.backpage
						})
					}
				}
			}
			//#endif
			// #ifdef  APP-PLUS||H5
			gotoOtherLogin(){
				uni.navigateTo({
					url:"/pages/otherLogin/otherLogin",
				})
			},
			wxLogin(){
				uni.showToast({
					title:"APP暂不支持微信登录",
					icon:"none"
				})
			}
			//  #endif
		},
		//#ifdef MP-WEIXIN
		onLoad(options){
			
			this.backpage=options.backpage;
			this.backtype=options.backtype;
			
			if(this.backpage !=="logout"){
				 this.wxLogin() 
			}
			
			
			
		}
		// #endif
		//#ifdef  APP-PLUS||H5
		onLoad(options){
			
			this.backpage=options.backpage;
			this.backtype=options.backtype;
			
			var res = uni.getStorageSync("token")
			if(res != "" && res.substr(0,5) != "test-"){
				uni.switchTab({
					url:"/pages/index/index"
				})
				
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.loginBox{
		display: flex;
		flex-direction: column;
	}
	.logo{
		height: 400rpx;
		width: 400rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 200rpx;
	}
	.wxButton{
		color: #fff;
		background-color:$theme-purple-color;
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		box-shadow: 2px 2px 5px #888888;
		margin-bottom: 20rpx;
	}
	.otherButton{
		color: $theme-purple-color;
		background-color:#fff;
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		box-shadow: 2px 2px 5px #888888;
	}
	.wx-test-button{
		margin-top:20rpx;
	}
</style>
