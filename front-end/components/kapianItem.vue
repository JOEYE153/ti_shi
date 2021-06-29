<template>
	<view class="kapian-item-box" :style="{backgroundColor:bgColor}">
		<view class="delete-box">
			<u-icon name="close" color="#fff" size="40" @click="deleteKapian"></u-icon>
		</view>
		<view class="kapian-item-title">
			{{item.title}}
		</view>
		<view class="kapian-item-left-yinhao">
			<image src="../static/xyinhao.png" mode=""></image>
		</view>
		<scroll-view scroll-y="true" class="kapian-item-content">
			<text class="kapian-content-text">
				{{item.content}}
			</text>
			<!-- {{item.content}} -->
			<!-- 航空是载人或不载人的飞行器在地球大气层中的轨道活动,必须具备空气介质.
			航空是载人或不载人的飞行器在地球大气层中的轨道活动,必须具备空气介质.
			航空是载人或不载人的飞行器在地球大气层中的轨道活动,必须具备空气介质.
			航空是载人或不载人的飞行器在地球大气层中的轨道活动,必须具备空气介质. -->
		</scroll-view>

		<view class="kapian-item-right-yinhao">
			<image src="../static/syinhao.png" mode=""></image>
		</view>
		<view class="kapian-item-bottom">
			
			<u-icon name="edit-pen" color="#fff" size="50" @click = "edit()"></u-icon>
			<u-icon name="more-dot-fill" color="#fff" size="50" @click="settings()"></u-icon>
			
		</view>
	</view>
</template>

<script>

	export default {
		name: "kapianItem",
		props:["item","bgColor"],
		data() {
			return {

			};
		},
		methods:{
			settings(){
				this.$emit("click")
			},
			deleteKapian(){
				this.$emit("deleteKapian")
			},
			edit(){
				this.$emit("edit")
			}
		}
	}
</script>

<style scoped lang="scss">
	.kapian-item-box {
		width: 100%;
		height: 100%;
		
	
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.delete-box{
			width: 90%;
			height: 10%;
			display: flex;
			justify-content: flex-end;
		}
		.kapian-item-title {
		
			color: #FFFFFF;
			font-size: 40rpx;
			width: 90%;
			height: 10%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #fff;
			box-sizing: border-box;
		}

		.kapian-item-left-yinhao {
			width: 90%;
			height: 10%;
			display: flex;

			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.kapian-item-content {
			width: 80%;
			height: 50%;
			display: flex;
			justify-content: center;
			color: #FFFFFF;
			.kapian-content-text{
				width: 100%;
				height: 100%;
				display:inline-block;white-space: pre-wrap; word-wrap: break-word;
			}
		}
		
		.kapian-item-right-yinhao {
			width: 90%;
			height: 10%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.kapian-item-bottom {
			width: 90%;
			height: 10%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
