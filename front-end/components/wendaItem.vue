<template>
	<view class="wenda-item-box" :class="first?'wenda-item-first':''" @click="click">
		<view class="wenda-item-left">
			<view class="wenda-item-title">
				<view class="wenda-item-title-state">
					[{{titleState}}]
				</view>
				<view class="wenda-item-title-content">
					{{item.post_title}}
				</view>
			</view>
			<view class="wenda-item-left-bottom">
				<view class="wenda-item-left-num">
					#{{item.post_id}}
				</view>
				
				<u-tag class="tag" :text="tagText" shape="circle" :type = "tagType"  mode="dark" size='mini' />
			<!-- 	<u-tag v-if="item.is_top==1"class="tag" text="置顶" shape="circle" type = "success" /> -->
			</view>
		</view>
		<view class="wenda-item-right">
			
			<u-icon name="chat-fill" color="#7468BE" size="40"></u-icon> 
			{{item.people_in_discussion}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "wendaItem",
		props:["item","first"],
		data() {
			return {

			};
		},
		methods:{
			click(){
				this.$emit('click',this.item.post_id)
			}
		},
		computed:{
			titleState(){
				var map = ["讨论","提问"]
				return map[this.item.post_type]
			},
			tagText(){
				var map = ["OPEN","CLOSED"]
				return map[this.item.cur_status]
			},
			tagType(){
				var map = ["primary","error"]
				return map[this.item.cur_status]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag{
		margin-right: 10rpx;
	}
	.wenda-item-first{
		margin-top: 20rpx;
	}
	.wenda-item-box {
		width: 100%;
		display: flex;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #e4e7ed;
		padding-top: 10rpx;
		border-top: 1rpx solid #e4e7ed;
		
		justify-content: center;
		align-items: center;
		.wenda-item-left {
			width: 90%;
			height: 100%;

			.wenda-item-title {
				width: 100%;
			
				display: flex;

				.wenda-item-title-state{
					width: 15%;
				}
				.wenda-item-title-content {
					
					width: 85%;
				}
			}

			.wenda-item-left-bottom {
				width: 100%;
				height: 70rpx;
				display: flex;
				align-items: center;

				.wenda-item-left-num {
					color: #c8c9cc;
					width: 15%;
					display: flex;
					
					align-items: center;
				}
			}
		}

		.wenda-item-right {
			width: 10%;
			height: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			font-size: 40rpx;
			color: #7468BE;
		}
	}
</style>
