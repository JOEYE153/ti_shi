<template>
	<view class="content">

		<scroll-view scroll-y="true" class="q-description">
		
		
			<view v-for="(item,i) in questions" :key="item.id" class="q-description-item" @click="gotoDatiPage(datiURL,item.id,i)" :class="i==0?'q-description-item-first':''">
				<view class="q-text">
					
					<view class="q-text-box">
						{{item.id +'.'+item.q_description}}
					</view>
					<uni-icons type="arrowright" class="q_icon" ></uni-icons>
				</view>
			</view>
		</scroll-view>
		
		<view class="begin-do">
			<button class="begin_button" @click="gotoDatiPage(datiURL,-1,0)">开始</button>
		</view>
		<uni-popup ref="popup" type="message" style="font-size: 50rpx;">
			<uni-popup-message type="error" message="没有啦" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datiURL:"/pages/dati/dati",
				questions:[]
			}
		},
		onLoad (options) {
			
			
			var loginRes = this.checkLogin("/pages/timuList/timuList",1);
			if(!loginRes){
				return;
			}
			
			this.questions = uni.getStorageSync('questions')
		
			uni.removeStorageSync('questions');		
		},
		methods: {
			gotoDatiPage(url,id,index){
				var _self = this;
			
				var newId;
				if(this.questions.length == 0){
					_self.$refs.popup.open('top')
					return
				}
				if(id == -1){
					newId = this.questions[0].id
				}else{
					newId = id
				}
				uni.setStorage({
				    key: 'questions',
				    data: this.questions,
				    success: function () {
				      
				    }
				});
				uni.navigateTo({
					url:url +'?id=' + newId + '&index=' + index
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: 100%;
	}
	.content{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		
	}
	.q-description{
		width: 700rpx;
		height: 85%;
		box-sizing: border-box;
	}
	.q-description-item-first{
		margin-top: 30rpx;
	}
	.q-description-item{
		width: 600rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-left: 50rpx;
		margin-bottom: 50rpx;
		border-style: solid;
		font-size: 30rpx;
		border-width: 1rpx;
		background-color: #FFFFFF;
	}
	.q-text{
		margin-left: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.q-text-box{
			width: 90;
			text-overflow:ellipsis;
			white-space:nowrap;
			overflow:hidden;
		}
	}
	.q_icon{
		float: right;
		margin-right: 10rpx;
	}
	.begin-do{
		width: 100%;
		height: 15%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
	}
	.begin_button{
		width: 150rpx;
		height: 150rpx;
		font-size:40rpx;
		border-radius: 75rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #baaeb0;
		background-color: $theme-purple-color;
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
