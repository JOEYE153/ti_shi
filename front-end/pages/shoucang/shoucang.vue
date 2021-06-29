<template>
	<view class="shoucang-box">
		<view class="top-banner">
			<view class="shoucang-switch-box">
				<uni-segmented-control :current="current" :values="items"
				styleType="button" activeColor="#fff" activeTextColor="#7468BE" inactiveTextColor="#fff"
				@clickItem="onClickItem"></uni-segmented-control>
			
				<!-- <u-subsection :list="list" :current="current" active-color=#fff" inactive-color="#000"></u-subsection> -->
			</view>
			<view class="shoucang-data" v-if="current == 0">
				{{total_collect_num}}
			</view>
			<view class="shoucang-data" v-else>
				{{total_err_num}}
			</view>
			<view class="shoucang-text">
				{{nowType + '数'}}
			</view>
			
		</view>
	
		<view class="" v-if="current == 0" >
			<u-card v-for="(item,i) in chaptersShouCang"  padding="0" :key="item.id">
				
					<view  class="c-description-item" @click="gotoDatiPage(timuListURL,item.id)"  slot="body"> 
							<view class="c-text-num">
								{{num[i]}}
							</view>
							<view class="c-text-title">
								{{list[i].chapter_title}}
							</view>
							<text class="c-text-process" v-if="current == 0">
								{{item | processNum(current)}}
							</text>
							<uni-icons type="arrowright" class="c_icon" ></uni-icons>
						
					</view>
				</u-card>
		</view>
		
		<view class=""  v-else>
			<u-card v-for="(item,i) in chaptersCuoTi"  padding="0" :key="item.id"  >
				
					<view  class="c-description-item" @click="gotoDatiPage(timuListURL,item.id)"  slot="body"> 
							<view class="c-text-num">
								{{num[i]}}
							</view>
							<view class="c-text-title">
								{{list[i].chapter_title}}
							</view>
							<text class="c-text-process">
								{{item | processNum(current)}}
							</text>
							<uni-icons type="arrowright" class="c_icon" ></uni-icons>
						
					</view>
			</u-card>
		</view>
		
			
		</view>
	</view>
</template>

<script>
	const CHAPTER_SHOUCANG = []
	const CHAPTER_CUOTI= []
	export default {
		data() {
			return {
				timuListURL:"/pages/timuList/timuList",
				total_collect_num: 0,
				total_err_num: 0,
				nowType:"收藏",
				list:[],
				items:["收藏","错题"],
				num:['第一章','第二章','第三章','第四章','第五章','第六章','第七章','第八章','第九章','第十章'],
				current: 0,
				colorIndex: 0,
				chaptersShouCang:CHAPTER_SHOUCANG,
				chaptersCuoTi:CHAPTER_CUOTI
			}
		},
		onShow() {
			var loginRes = this.checkLogin("/pages/shoucang/shoucang",1);
			if(!loginRes){
				return;
			}
			if(this.current == 0){
				this.$http({
					url:  '/question_collection/display/'+getApp().globalData.courseId,
					success: (res) => {
						if(this.current == 0){
							this.chaptersShouCang = res.data.data.chapters;
						}else{
							this.chaptersCuoTi = res.data.data.chapters;
						}
						this.total_collect_num = parseInt(res.data.data.total_coll)
					}
				})
			}else{
				this.$http({
					url: '/question_error/display/'+getApp().globalData.courseId,
					success: (res) => {
						//this.chapters = res.data.data.chapters
						if(this.current == 0){
							this.chaptersShouCang = res.data.data.chapters;
						}else{
							this.chaptersCuoTi = res.data.data.chapters;
						}
						this.total_err_num = res.data.data.total_err
					}
				})
			}
		},
		
		onLoad(){
			
			var loginRes = this.checkLogin("/pages/shoucang/shoucang",1);
			if(!loginRes){
				return;
			}
			this.$http({
				url: '/question_pool/display/' + getApp().globalData.courseId,
				success: (res) => {
					this.list = res.data.data.chapters
					console.log(this.list)
				}
			})
			var _self = this;
			this.$http({
				url:  '/question_collection/display/'+getApp().globalData.courseId,
				success: (res) => {
					if(this.current == 0){
						this.chaptersShouCang = res.data.data.chapters;
					}else{
						this.chaptersCuoTi = res.data.data.chapters;
					}
					// this.chapters = res.data.data.chapters
					this.total_collect_num = parseInt(res.data.data.total_coll)
				}
			})
		},
		methods: {
			onClickItem(e){
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
				this.nowType = this.items[this.current];
				var _self = this;
				if(this.current == 0){
					this.$http({
						url: '/question_collection/display/'+getApp().globalData.courseId,
						success: (res) => {
							if(this.current == 0){
								this.chaptersShouCang = res.data.data.chapters;
							}else{
								this.chaptersCuoTi = res.data.data.chapters;
							}
							this.total_collect_num = res.data.data.total_coll
						}
					})
				}
				else {
					this.$http({
						url: '/question_error/display/'+getApp().globalData.courseId,
						success: (res) => {
							//this.chapters = res.data.data.chapters
							if(this.current == 0){
								this.chaptersShouCang = res.data.data.chapters;
							}else{
								this.chaptersCuoTi = res.data.data.chapters;
							}
							this.total_err_num = res.data.data.total_err
						}
					})
				}
			},
			gotoDatiPage(url,chapter_id){
				var _self = this;
				var goURL;
				if(this.current == 0){
					goURL = '/question_collection/open_chapter/'
				}else{
					goURL = '/question_error/open_chapter/'
				}
				console.log(chapter_id)
				this.$http({
					url: goURL,
					data:{
						course_id: getApp().globalData.courseId,
						id: chapter_id
					},
					success: (res) => {
						uni.setStorage({
						    key: 'questions' ,
						    data: res.data.data.questions,
						    success: function () {
								uni.navigateTo({
									url:url
								});
						    }
						});
					}
				})
			}
		}
		,
		filters:{
			processNum(item,current){
			
				if(current == 0){
					return item.coll_num + '/' + item.total_num
				}else{
					return item.error_num + '/' + item.total_num
				}
			}
		}
	
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		background-color: $u-bg-color;
	}
	.top-banner {
		width: 750rpx;
		height: 500rpx;
		position: absolute;
		top: 0;
		background-color: $theme-purple-color;
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
		display: flex;
		flex-direction: column;
			align-items: center;
	}
	.shoucang-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 500rpx;
		// justify-content: center;
		align-items: center;
		.shoucang-switch-box{
			margin-top: 50rpx;
			width: 500rpx;
			height: 100rpx;
		}
		.shoucang-data{
			margin-top: 50rpx ;
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			background-color: #FFFFFF;
			justify-content: center;
			display: flex;
			align-items: center;
			font-size: 70rpx;
			color: $theme-purple-color;
		}
		.shoucang-text{
			margin-top: 10rpx;
			font-size: 40rpx;
			color: #FFFFFF;
		}
	}
	.c-description{
		width: 700rpx;
		margin-left: 25rpx;
		margin-top: 100rpx;
	}
	.c-description-item{
		width: 600rpx;
		margin: 20rpx;
	
	
		display: flex;
		align-items: center;
		justify-content: space-around;
		
		.c-text-num{
			width:100rpx;
		}
		.c-text-title{
			width:350rpx;
		}
		.c-text-process{
			width: 100rpx;
			display: flex;
			justify-content: flex-end;
			
					}
	}
</style>
