<template>
	<view class="content">
		<view class="tiku">
			<view class="tikuBox">

				<image :src="course.image_url" mode="" class="tikuImage"></image>

				<view class="detailBox">
					<view class="switchBox">
						<view class="currentBox">
							{{course.label}}
						</view>
						<view class="switchButton" @click="showSwitchCoursePopup">
							<image src="../../static/plus.png" mode=""></image>
						</view>
					</view>
					<view class="progressBar">
						<progress :percent="Math.round(userInfo.problem_done_sum/course.total *100)" show-info :border-radius="20"
							activeColor="#D382DF" font-size="12" />
					</view>
					<view class="detail">
						<text>已刷题目</text>
						<text>{{userInfo.problem_done_sum}}/{{course.total}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="nav-box">
			<view class="nav-item" v-for="(item,i) in navItem" :key="item.directUrl" @click="gotoNextPage(item.directUrl)">
				<image :src="item.logoUrl" mode=""></image>
				<text>{{item.navName}}</text>
			</view>
		</view>
		<view class="start-box">
			<view class="segment-control-box">
				<uni-segmented-control :current="current" :values="shuatiOptions" styleType="text" activeColor="#7468BE"
					activeTextColor="#000"
					@clickItem="onClickItem"></uni-segmented-control>
			</view>

			<view class="start-button-box">
				<view class="start-button" @click="startDati">
					开始
				</view>
			</view>
		</view>
		<u-select v-model="showSwitchCourseHandler" mode="single-column" :list="courseList"
			@confirm="confirmSwitchCourse"></u-select>
		<u-select v-model="showSwitchExamHandler" title="请选择您的判题模式" mode="single-column" :list="examModeList"
			@confirm="confirmSwitchExam"></u-select>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"
	var loginRes;
	const NO_DEV_LIST = ["/pages/rili/rili","/pages/kapian/kapian","/pages/ziyuan/ziyuan","/pages/wenda/wenda"]
	export default {
		components: {
			uniSegmentedControl,
		},
		data() {
			return {
				current: 0,
				colorIndex: 0,
				showSwitchExamHandler: false,
				title: '',
				examModeList:[{
					value: 0,
					label: "实时判题",
				},{
					value: 1,
					label: "统一判题",
				}],
				shuatiOptions: ['顺序刷题', '随机刷题', '易错刷题', '模拟考试'],
				navItem: [{
						directUrl: "/pages/rili/rili",
						logoUrl: "../../static/rili.png",
						navName: "考期日历"
					},
					{
						directUrl: "/pages/shoucang/shoucang",
						logoUrl: "../../static/collect.png",
						navName: "收藏|错题"
					},
					{
						directUrl: "/pages/kapian/kapian",
						logoUrl: "../../static/card.png",
						navName: "知识卡片"
					}, 
					{
						directUrl: "/pages/tiku/tiku",
						logoUrl: "../../static/tiku.png",
						navName: "题库"
					}, 
					{
						directUrl: "/pages/ziyuan/ziyuan",
						logoUrl: "../../static/resource.png",
						navName: "资源社区"
					},
					
					{
						directUrl: "/pages/wenda/wenda",
						logoUrl: "../../static/wenda.png",
						navName: "问题中心"
					}
				],
				showSwitchCourseHandler: false,
				courseList: [{
					value: 1,
					label: "航概(理)",
					image_url:"@/static/logo.png",
					total:996
				},
				{
					value: 2,
					label: "航概(文)",
					image_url:"@/static/logo.png",
					total:996
				}],
				userInfo:{
					problem_done_sum:1
				},
				course:{
					value: 1,
					label: "航概(理)",
					image_url:"@/static/logo.png",
					total:996
				}
			}
		},
		async onLoad() {
			
			var loginRes = this.checkLogin("/pages/index/index", 1);
			if (!loginRes) {
				return;
			}
			// 获取目录列表
			
			// this.getMenuList()
			var res = await this.$http({
					url:"/user/all?course_id="+getApp().globalData.courseId
			})
			this.userInfo = res.data.data
			this.$http({
				url: '/course/info',
				success: (res) => {
					this.courseList = res.data.data.courseList
					this.course = this.courseList[getApp().globalData.courseId - 1]
				}
			})
			
			
		},
		async onShow(){
			//获取通知数量
		
				
			this.getNoticeNum()
			
		
			
			var res = await this.$http({
					url:"/user/all?course_id="+getApp().globalData.courseId
			})
			this.userInfo = res.data.data
			this.course = this.courseList[getApp().globalData.courseId - 1]
			
		},
		methods: {
			confirmSwitchExam(res){
				var chose = res[0]
				if(chose.value == 0){
					uni.navigateTo({
						url: "/pages/dati/dati2"
					})
				}else{
					uni.navigateTo({
						url: "/pages/dati/dati4"
					})
				}
			},
			gotoNextPage(url) {
			
				uni.navigateTo({
					url: url
				});
			},
			startDati() {
				var _self = this;
				if (this.current == 0) {
					this.$http({
						url:  '/question/last_id/' + getApp().globalData.courseId,
						success: (res) => {
							var gotoId = res.data.data.id
							uni.navigateTo({
								url: "/pages/dati/dati?id=" + gotoId + "&isSort=1"
							})
						},
						fail:(res)=>{
						}
					})
				} else if (this.current == 1) {
					uni.navigateTo({
						url: "/pages/dati/dati?random=1"
					})
				} else if (this.current == 2) {
					this.$http({
						url: '/question/display_easy-wrong/' + getApp().globalData.courseId,
						success: (res) => {
							if(res.data.data.questions.length == 0){
								uni.showToast({
									title:"上线第一天，还没有错题喔！客官明天再来吧。",
									icon:"none"
								})
							}else{
								uni.setStorage({
									key: 'questions',
									data: res.data.data.questions,
									success: function() {
										uni.navigateTo({
											url: "/pages/dati/dati3?index=0"
										})
									}
								});
							}
						}
					})
				} else if (this.current == 3) {
					if(getApp().globalData.courseId < 4){
					this.showSwitchExamHandler = true}else{
						uni.showToast({
							title:"该课程不支持模拟考试",
							icon:"none"
						})
					}
					// uni.navigateTo({
					// 	url: "/pages/dati/dati2"
					// })
				}
			},
			showSwitchCoursePopup() {
				this.showSwitchCourseHandler = true;
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			confirmSwitchCourse(res) {
				res = res[0]
				getApp().globalData.courseId = res.value;
				getApp().globalData.courseName = res.label;
			
				this.course = this.courseList[getApp().globalData.courseId - 1]
				this.$http({
						url:"/user/all?course_id="+getApp().globalData.courseId,
						success: (res) => {
							this.userInfo = res.data.data
						}
				})
			}
		
			,
			async getNoticeNum(){
				var res = await this.$http({
					url:"/message/getNum"
				})
				var num = res.data.data.num;
				this.noticeNum = num;
				if(num > 99){
					num = 99+"+"
				}else{
					num = num+""
				}
				
				if(num != "0" ){
					uni.setTabBarBadge({
					  index:1,
					  text: num+''
					})
				}else{
					uni.removeTabBarBadge({
						index:1
					})
				}
				this.$forceUpdate()
				
			},
			// async getMenuList(){
			// 	var res =await this.$http({
			// 		url:"/getmenulist"
			// 	})
						
			// 	this.navItem = res.data
			// }
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.tiku {
		width: 100%;
		background-color: $theme-purple-color;
		height: 40%;
		border-bottom-left-radius: 150rpx;
		border-bottom-right-radius: 150rpx;
		display: flex;
		justify-content: center;

		.tikuBox {
			margin-top: 40rpx;
			width: 600rpx;
			height: 240rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.tikuImage {
				width: 150rpx;
				height: 150rpx;
				background-color: #fff;
				border-radius: 20rpx;
			}

			.detailBox {
				width: 400rpx;
				height: 150rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.switchBox {
					width: 100%;
					height: 50rpx;
					display: flex;
					align-items: center;
					overflow: hidden;

					.currentBox {
						width: 200rpx;
						height: 50rpx;
						background-color: $pink-color;
						text-align: center;
						color: #FFFFFF;
						font-size: 24rpx;
						line-height: 50rpx;
						border-top-left-radius: 10rpx;
						border-bottom-left-radius: 10rpx;
					}

					.switchButton {
						width: 50rpx;
						height: 50rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #FFFFFF;
						margin-left: 4rpx;
						border-top-right-radius: 10rpx;
						border-bottom-right-radius: 10rpx;

						image {
							width: 30rpx;
							height: 30rpx;

						}
					}
				}

				.progressBar {
					margin-top: 20rpx;
					color: #FFFFFF;
				}

				.detail {
					display: flex;
					justify-content: space-between;

					text {
						color: #FFFFFF;
						font-size: 20rpx;
					}
				}
			}
		}



	}

	.nav-box {
		background-color: #FFFFFF;
		width: 650rpx;
		height: 30%;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translateX(-50%);
		border-radius: 30rpx;
		display: flex;
		box-shadow: 2rpx 2rpx 2rpx 2rpx $shadow-gray-color;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		/* 	padding-top: 30rpx; */
		.nav-item {
			width: 210rpx;
			height: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				margin-top: 20rpx;
				width: 80rpx;
				height: 80rpx;
			}

			text {
				margin-top: 10rpx;
				font-size: 25rpx;
				color: #2C405A;
			}
		}
	}

	.start-box {
		width: 750rpx;
		height: 35%;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		box-shadow: 0rpx 2rpx 2rpx 2rpx #2C405A;

		.segment-control-box {
			width: 700rpx;
			height: 20%;
			margin: 0 auto;
		}

		.start-button-box {
			width: 750rpx;
			height: 80%;
			display: flex;
			justify-content: center;
			align-items: center;

			.start-button {
				width: 200rpx;
				height: 200rpx;
				border-radius: 50%;
				background-color: $pink-color;
				text-align: center;
				line-height: 200rpx;
				font-size: 44rpx;
				color: #f1f1f1;
			}
		}

	}
</style>
