<template>
	<view class="wenda-detail-topic-box">
		<view class="topic-title">
			{{'['+titleState+']' +item.post_title}}
			<u-tag :text="tagText" shape="circle" :type = "tagType" />
		</view>
		<view class="topic-user">
			<u-avatar :src='item.img_url' size="60"></u-avatar>
			<view class="user-name-time">
				<view class="user-name">
					{{item.user_name}}
				</view>
				<view class="user-time">
					{{item.create_time}}
				</view>
			</view>
			<view class="topic-setting">
				<u-icon class="setting" name="more-dot-fill" :size="40"
					@click="settingClick"></u-icon>
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
		name:"wendaDetailTopic",
		props:{
			item:{
				type:Object,
				default:()=>({
					post_id:"",
					img_url:"",
					user_name:"",
					create_time:"",
					content:"",
					cur_status:"",
					post_type:"",
					post_title:""
				
				}) 
			}
		},
		components:{
			mpHtml
		},
		data() {
			return {
				
			};
		},
		methods:{
			settingClick(){
				this.$emit("settingClick",this.item)
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
			},
			
		}
	}
</script>

<style lang="scss">
	.wenda-detail-topic-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.topic-title{
			width: 90%;
			font-size: 40rpx;
			color: #121212;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.topic-user{
			margin:30rpx 0;
			width: 90%;
		
			display: flex;
			justify-content: space-between;
			align-items: center;
			.user-name-time{
				width: 580rpx;
				margin-left: 20rpx;
				.user-name{
					display: flex;
					align-items: center;
					color:$u-tips-color;
					font-weight: 600;
				}
				.user-time{
					display: flex;
					align-items: center;
					color:$u-tips-color;
					font-weight: 600;
					font-size: 20rpx;
				}
			}
			.topic-setting{
				width:40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
		}
		.topic-content{
			width: 90%;
		}
	}
</style>
