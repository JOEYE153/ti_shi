<template>
	<view class="wenda-detail-topic-box">
		
		<view class="topic-user" :class="item.is_right_answer==1 ? 'topic-right-answer' :'topic-nonright-answer'">
			<view class="topic-user-box">
				<u-avatar :src='item.img_url' size="60"></u-avatar>
				<view class="user-name-time">
					<view class="user-name">
						{{item.user_name}}
					</view>
					<view class="user-time">
						{{item.create_time}}
					</view>
				</view>
				<view class="topic-dianzan" >
					<u-icon v-if="!item.is_like" name="thumb-up" :size="40" color="#9a9a9a" @click="likeClick()">
					</u-icon>
					<u-icon v-if="item.is_like" name="thumb-up-fill" :size="40" @click="likeClick()"></u-icon>
					{{item.like_count}}
								
				</view>
				
				<view class="topic-setting">
					<u-icon class="setting" name="more-dot-fill" :size="40" @click="settingClick"></u-icon>
				</view>
			</view>
			
			
		</view>
		<view class="topic-content">

			<mp-html :content="item.content" />

		</view>
	</view>
</template>

<script>
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue'
	export default {
		name: "wendaDetailTopic",
		props:{
			item:{
				type:Object,
				default:()=>( {
					post_comment_id:"",
					img_url:"",
					user_name:"",
					create_time:"",
					is_like:"",
					is_right_answer:"",
					content:"",
					
				})
					
			}
		},
		components: {
			mpHtml
		},
		data() {
			return {
				html: '<div>Hello World!</div>'
			};
		},
		methods: {
			settingClick() {
				this.$emit("settingClick", this.item)
			},
			likeClick(){
				this.$emit("likeClick",this.item)
			}
		},
		created(){
			console.log(this.item)
		}
	}
</script>

<style lang="scss">
	.wenda-detail-topic-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10rpx 0;
		color: $u-tips-color;
		background-color: #fff;
		.topic-title {
			width: 90%;
			font-size: 40rpx;
			color: #121212;
			font-weight: 600;
		}
		.topic-dianzan{
			width: 80rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			margin-right: 20rpx;
			
		}
		
		.topic-user{
			width: 100%;
			
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.topic-right-answer{
			background-color: #dbf1e1;
		}
		.topic-user-box {
			
			padding: 30rpx 0;
			width:90%;
			
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user-name-time {
				width: 580rpx;
				margin-left: 20rpx;

				.user-name {
					display: flex;
					align-items: center;
					
					
					font-weight: 600;
				}

				.user-time {
					display: flex;
					align-items: center;
					
					font-weight: 600;
					font-size: 20rpx;
				}
			}

			.topic-setting {
				width: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}

		.topic-content {
			width: 90%;
			margin: 20rpx 0;
		}
	}
</style>
