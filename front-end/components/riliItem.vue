<template>
	<view class="rili-item-box">
		<!-- <view class="rili-item-left">
			<view class="rili-left-icon-box">
				<view :class="item.finish?'rili-left-icon-finish':'rili-left-icon-nonfinish'">
					<u-icon :name="item.finish?'checkbox-mark':'play-right-fill'" :color="item.finish?'#fff':'#7468BE'" size="25"></u-icon>
				</view>
			</view>
			<view :class="!isLast?'rili-left-dot':''" class="rili-left-height">
			</view>
		</view> -->
	<!-- 	<view class="rili-item-right">
			<view class="rili-item-top">
				<view class="rili-top-date">
					{{item.date}}
				</view>
				<view class="rili-top-course">
					{{item.title}}
				</view>
			</view>
			<view class="rili-item-bottom">
				<text class="rili-item-content">
					{{item.content}}
				</text>
				
				<view class="rili-item-settings">
					<u-icon name="edit-pen" color="#fff" size="40" @click="edit()"></u-icon>
					<u-icon color="#fff" name="more-dot-fill" :size="30"
						@click="settings()"></u-icon>
				</view>
				
			</view>
		</view> -->
		<view class="rili-item-top">
			<view class="rili-left-icon-box">
				<view :class="item.finish?'rili-left-icon-finish':'rili-left-icon-nonfinish'">
					<u-icon :name="item.finish?'checkbox-mark':'play-right-fill'" :color="item.finish?'#fff':'#7468BE'" size="25"></u-icon>
				</view>
			</view>
			<view class="rili-top-date">
				{{item.date}}
			</view>
			<view class="rili-top-course">
				{{item.title}}
			</view>
		</view>
		<view class="rili-item-bottom">
			<view class="rili-left-height">
				<view :class="!isLast?'rili-left-dot':''" >
				</view>
			</view>
		
			<view class="rili-item-bottom-right">
				<text class="rili-item-content">
					{{item.content}}
				</text>
				
				<view class="rili-item-settings">
					<u-icon name="edit-pen" color="#fff" size="40" @click="edit()"></u-icon>
					<u-icon color="#fff" name="more-dot-fill" :size="30"
						@click="settings()"></u-icon>
				</view>
			
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"
	export default {

		components: {
			uniIcons
		},
		data() {
			return {

			}
		},
		props: {

			isLast: {
				type: Boolean,
				default: false,


			},
			item:{
				type:Object
			}
			
		},
		methods: {
			settings(){
			
				this.$emit("click",this.item.id)
			},
			edit(){
				this.$emit("edit")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rili-item-box {
		width: 100%;
		min-height: 400rpx;
		
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
			.rili-item-top {
				width: 100%;
				height: 60rpx;
				display: flex;
				// justify-content: center;
				align-items: center;
		
				.rili-top-date {
					box-sizing: border-box;
					width: 300rpx;
					height: 100%;
					font-size: 45rpx;
					display: flex;
					align-items: center;
					color: $theme-purple-color;
					font-weight: bold;
				}
		
				.rili-top-course {
					width: 300rpx;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color:$u-tips-color;
					font-weight: bold;
				}
				.rili-left-icon-box {
						width: 60rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
				
						.rili-left-icon-finish {
							width:37.5rpx;
							height: 37.5rpx;
							border-radius: 50%;
							background-color: $theme-purple-color;
							display: flex;
							justify-content: center;
							align-items: center;
						}
						.rili-left-icon-nonfinish{
							width: 37.5rpx;
							height: 37.5rpx;
							border-radius: 50%;
							background-color: #fff;
							border: 1rpx solid $theme-purple-color;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
			}
			.rili-item-bottom{
				width: 100%;
				display: flex;
				min-height: 240rpx;
				
				.rili-left-height {
					width: 60rpx;
					margin-top: 10rpx;
					min-height: 240rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					.rili-left-dot {
						border-left: 5px dotted $theme-purple-color;
							 position: absolute;
							height: 100%;
					}
				}
				
				.rili-item-bottom-right {
						width: 600rpx;
						min-height: 300rpx;
						box-sizing: border-box;
						margin-top: 20rpx;
						padding: 20rpx;
						background-color: $theme-purple-color;
						border-radius: 20rpx;
						box-shadow: 1rpx 10rpx 1rpx 1rpx  $shadow-gray-color;
						
					
						
				
						.rili-item-content{
							color: #fff;
							font-size: 30rpx;
							width: 100%;
							min-height: 250rpx;
							display:inline-block;
							white-space: pre-wrap; 
							word-wrap: break-word;
						}
						.rili-item-settings{
							width: 100%;
							height:50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				
			}
			// .rili-item-left {
		// 	width: 5%;
		// 	height: 100%;
		// 	display: flex;
		// 	flex-direction: column;
		// 	justify-content: center;
		// 	align-items: center;

		// 	.rili-left-icon-box {
		// 		width: 100%;
		// 		height: 60rpx;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;

		// 		.rili-left-icon-finish {
		// 			width: 100%;
		// 			height: 37.5rpx;
		// 			border-radius: 50%;
		// 			background-color: $theme-purple-color;
		// 			display: flex;
		// 			justify-content: center;
		// 			align-items: center;
		// 		}
		// 		.rili-left-icon-nonfinish{
		// 			width: 100%;
		// 			height: 37.5rpx;
		// 			border-radius: 50%;
		// 			background-color: #fff;
		// 			border: 1rpx solid $theme-purple-color;
		// 			display: flex;
		// 			justify-content: center;
		// 			align-items: center;
		// 		}
		// 	}

		// 	.rili-left-dot {
		// 		border-left: 5px dotted $theme-purple-color;

		// 	}

		// 	.rili-left-height {
		// 		height: 360rpx;
		// 	}
		// }

		// .rili-item-right {
		// 	width: 90%;
		// 	height: 100%;

		// 	.rili-item-top {
		// 		width: 100%;
		// 		height: 60rpx;
		// 		display: flex;
		// 		// justify-content: center;
		// 		align-items: center;

		// 		.rili-top-date {
		// 			box-sizing: border-box;
		// 			width: 60%;
		// 			height: 100%;
		// 			font-size: 45rpx;
		// 			display: flex;
		// 			align-items: center;
		// 			color: $theme-purple-color;
		// 			font-weight: bold;
		// 		}

		// 		.rili-top-course {
		// 			width: 40%;
		// 			height: 100%;
		// 			display: flex;
		// 			justify-content: flex-end;
		// 			align-items: center;
		// 			color:$u-tips-color;
		// 			font-weight: bold;
		// 		}
		// 	}

		// 	.rili-item-bottom {
		// 		width: 100%;
		// 		min-height: 300rpx;
		// 		box-sizing: border-box;
		// 		margin-top: 20rpx;
		// 		padding: 20rpx;
		// 		background-color: $theme-purple-color;
		// 		border-radius: 20rpx;
		// 		box-shadow: 1rpx 10rpx 1rpx 1rpx  $shadow-gray-color;
				
		// 		.rili-item-content{
		// 			color: #fff;
		// 			font-size: 30rpx;
		// 			width: 100%;
		// 			height: 90%;
		// 			display:inline-block;
		// 			white-space: pre-wrap; 
		// 			word-wrap: break-word;
		// 		}
		// 		.rili-item-settings{
		// 			width: 100%;
		// 			height:10%;
		// 			display: flex;
		// 			justify-content: space-between;
		// 		}
		// 	}
		// }

		// .rili-item-top{
		// 	width: 100%;
		// 	height: 60rpx;
		// 	display: flex;
		// 	// justify-content: center;
		// 	align-items: center;
		// 	.rili-top-icon{
		// 		width: 5%;
		// 		height: 62.5%;
		// 		border-radius: 50%;
		// 		background-color: $theme-purple-color;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 	}
		// 	.rili-top-date{
		// 		box-sizing: border-box;
		// 		width: 40%;
		// 		height: 100%;
		// 		font-size: 45rpx;
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		margin-left: 20rpx;
		// 		color: $theme-purple-color;
		// 		font-weight: bold;
		// 	}
		// 	.rili-top-course{
		// 		width: 55%;
		// 		height: 100%;
		// 		line-height: 60rpx;
		// 	    white-space: nowrap; 
		// 		text-overflow:ellipsis;
		// 		overflow:hidden; 

		// 	}
		// }
		// .rili-item-bottom{
		// 	width: 100%;
		// 	height: 200rpx;
		// 	display: flex;
		// 	align-items: center;
		// 	.{
		// 		.rili-bottom-dot{

		// 		}
		// 	}
		// }
	}
</style>
