<template>
	<view class="ziyuan-item-box">
		<view class="ziyuan-item-title">{{item.topic}}</view>
		<view class="ziyuan-item-detail-box">
					<view class="ziyuan-item-detail-content">
						<view class="ziyuan-item-detail-url">资源描述: {{item.description}}</view>
						<view>
						<u-collapse  event-type="close" :arrow="true" :accordion="true" @change="">
							<u-collapse-item @change="" :title="'上传用户: '+item.user_name" >
								<view class="ziyuan-item-detail-upfold">
									<view class="ziyuan-item-detail-url">地址:{{item.link}}</view>
									<view style="margin-top: 10rpx;">有效期限:{{item.time}}</view>
									<view style="margin-top: 10rpx;">访问密码:{{item.password}}</view>
									<view class="zhiyuan-item-settings">
										<u-icon color="#030303" name="cut" :size="40"
										@click="copy()"></u-icon>
										<u-icon v-if="item.can_delete == 1" color="#030303" name="more-dot-fill" :size="30"
										@click="settings()"></u-icon>
									</view>
								</view>
							</u-collapse-item>
						</u-collapse>
						</view>
					</view>
<!-- 					<view class="ziyuan-item-detail-logo" >
						<u-icon name="share" color="#82848a" size="80"></u-icon>
					</view> -->
		</view>
		<view class="ziyuan-item-id">
			#{{item.id}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"ziyuanItem",
		
		data() {
			return {
			};
		},props:{
			item:{
				type:Object
			}
		},
		methods: {
			settings(){
				this.$emit("click",this.item.id)
			},
			copy() {
				var url = this.item.link
			    uni.setClipboardData({
					data: url,
			        success: function () {
			                uni.showToast({
			                	title: '复制链接成功',
			                	icon: "none"
			                })
			            }
			      });
			    },
		}
	}
</script>

<style lang="scss">
	.ziyuan-item-box{
		margin-top: 30rpx;
		width: 100%;
		.ziyuan-item-title{
			font-size: 35rpx;
			height: 50rpx;
			font-weight: 550;
			
		}
		.ziyuan-item-detail-box{
			background-color: $u-bg-color;
			width: 100%;
			border-radius: 30rpx;
			display: flex;
				.ziyuan-item-detail-content{
					padding: 20rpx;
					width: 100%;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					justify-content: space-evenly;
					.ziyuan-item-detail-url{
						width: 100%;
						word-wrap: break-word;
					}
				}
				.ziyuan-item-detail-logo{
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.ziyuan-item-detail-upfold{
					width: 100%;
					display: flex;
					flex-direction: column;
					font-size: 30rpx;
					justify-content: space-evenly;
					margin-top: 10rpx;
					.zhiyuan-item-settings{
					width: 100%;
					height: 50rpx;
					display: flex;
					justify-content: space-between;
				}
				}
			
		}
		.ziyuan-item-id{
			padding: 20rpx;
			width: 90%;
			height: 50rpx;
			display: flex;
			align-items: center;
			color:$u-tips-color;
		}
	}
</style>
