<template>
	<view class="userBox">
		<scroll-view scroll-y="true">
			<view class="top-banner">
			</view>
			<view class="user-box">
				<view class="user-info-box">
					<u-avatar :src="avatar" size="large" @tap="chooseAvatar"></u-avatar>
					<text style="font-size: 36rpx;">{{userInfo.username}}</text>
				</view>
				<view class="top-nav">
					<view class="top-nav-switch">
						<uni-segmented-control :values="items" styleType="button" activeColor="#0076E1"
							activeTextColor="#fff"  inactiveTextColor="#0076e1"
							:current="current" @clickItem="clickItem"></uni-segmented-control>
					</view>
					<view class="top-nav-switchTK">
						<view class="top-nav-switchTK-text">切换科目:</view>
						<view class="top-nav-switchTK-button" @click="showSwitchCoursePopup">
							{{course.label}}
							
						</view>
					</view>
				</view>
				<view class="h-line">
				</view>
				<view class="data-box">
					<view class="data-box-item">
						<text class="data-box-item-num">{{userInfoShow[0].data}}</text>
						<text class="data-box-item-text">{{userInfoShow[0].title}}</text>
					</view>
					<view class="v-line">
					</view>
					<view class="data-box-item">
						<text class="data-box-item-num">{{userInfoShow[1].data}}</text>
						<text class="data-box-item-text">{{userInfoShow[1].title}}</text>
					</view>
					<view class="v-line">
					</view>
					<view class="data-box-item-end">
						<view class="data-box-item-button" @click="gotoOtherPage">
							{{userInfoShow[2].data}}
						</view>
					</view>

				</view>
				<view class="h-line">
				</view>
				
				
				<view class="content-box" v-for="(item,index) in userSettingList" :key="item.title" @click="gotoSettings(item.pageUrl)">
					
				
					<uni-badge size="small" :text="noticeNum" absolute="rightTop" type="error" v-if="item.title == '消息通知'">
					    <image :src="item.imgSrc" class="content-box-logo">
					    </image>
					</uni-badge>
					<image :src="item.imgSrc" class="content-box-logo" v-else>
					</image>
					<text class="content-box-text">{{item.title}}</text>
					
			
					<image src="../../static/right-arrow.png" mode="" class="content-box-right-arrow"></image>

				</view>
				<view class="button-box">
					<button type="default" size="mini" @click="logout()">退出</button>
				</view>
			</view>



		</scroll-view>
		<u-select v-model="showSwitchCourseHandler" mode="single-column" :list="courseList"
			@confirm="confirmSwitchCourse"></u-select>

	</view>
</template>

<script>
	var loginRes;

	const infoShow1 = [{
			title: "累计做题数",
			data: 0
		}, {
			title: "做题天数",
			data: 0
		},
		{
			title: "战绩",
			data: "历史记录"
		}
	]
	const infoShow2 = [{
			title: "问答数量",
			data: 0
		}, {
			title: "获赞数量",
			data: 0
		},
		
	
		
		{
			title: "答疑解惑",
			data: "问题中心"
		}
	
		
	]
	const USERSETTINGLISTTEST = [
		{
			imgSrc: "../../static/login.png",
			title: "登录",
			pageUrl: "/pages/login/login"
		},
		{
			imgSrc: "../../static/notice.png",
			title: "消息通知",
			pageUrl: "/pages/notice/notice",
		
		},
		{
			imgSrc: "../../static/setting.png",
			title: "个人信息",
			pageUrl: "/pages/settings/settings"
		}, {
			imgSrc: "../../static/aboutus.png",
			title: "关于我们",
			pageUrl: "/pages/aboutUs/aboutUs"
		// }, {
		// 	imgSrc: "../../static/share.png",
		// 	title: "分享[题士]给好友",
		// 	pageUrl: ""
		}
	]
	const USERSETTINGLISTLOGIN = [
		
		{
			imgSrc: "../../static/notice.png",
			title: "消息通知",
			pageUrl: "/pages/notice/notice",
		
		},{
		imgSrc: "../../static/setting.png",
		title: "个人信息",
		pageUrl: "/pages/settings/settings"
	}, {
		imgSrc: "../../static/aboutus.png",
		title: "关于我们",
		pageUrl: "/pages/aboutUs/aboutUs"
	}
	// , {
	// 	imgSrc: "../../static/share.png",
	// 	title: "分享[题士]给好友",
	// 	pageUrl: ""
	// },
	]
	import uniPopup from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				items: ["题库", "社区"],
				userInfo: {},
				current: 0,

				showSwitchCourseHandler: false,
				courseList: [
				],
				userSettingList: USERSETTINGLISTLOGIN,
				course:{
					value: 1,
					label: "航概(理)",
					image_url:"@/static/logo.png",
					total:996
				},
				noticeNum:0
			}
		},
		methods: {
			gotoOtherPage() {
				if (this.userInfoShow[2].data == "历史记录") {
					uni.navigateTo({
						url: "/pages/tiku/tiku"
					})
				} else {
					// var res = await this.$http({
					// 	url:"/"
					// })
					uni.navigateTo({
						url:"/pages/wenda/wenda"
					})
				
				}
			},
			open() {

				this.$refs.popup.open('top')
			},
			logout() {
				uni.removeStorageSync("token");
				uni.redirectTo({
					url: "/pages/login/login?backpage=logout"
				})
				
			},
			clickItem(index) {
				this.current = index.currentIndex;

			},
			async confirmSwitchCourse(res) {
				res = res[0]
				getApp().globalData.courseId = res.value;
				getApp().globalData.courseName = res.label;
				this.course = this.courseList[getApp().globalData.courseId - 1]
				// uni.reLaunch({
				// 	url: '/pages/user/user'
				// })
				var res1 = await this.$http({
					url: "/user/all?course_id=" + getApp().globalData.courseId
				})
				this.userInfo = res1.data.data
			},
			gotoSettings(res) {
				
				uni.navigateTo({
					url: res
				})
			},
			showSwitchCoursePopup() {
				this.showSwitchCourseHandler = true;
			},
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
				
			},
			
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
			
		},
		computed: {
			userInfoShow() {
				var userInfoShow = infoShow1;
				if (this.current == 1) {
					userInfoShow = infoShow2;
					userInfoShow[0].data = this.userInfo.query_sum
					userInfoShow[1].data = this.userInfo.like_sum
				} else {
					userInfoShow = infoShow1;
					userInfoShow[0].data = this.userInfo.problem_done_sum
					userInfoShow[1].data = this.userInfo.day_sum
				}
				return userInfoShow;
			},
			avatar(){
				return this.userInfo.avatar;
			}
			
		},
		created() {
			var _self = this;
			// 监听从裁剪页发布的事件，获得裁剪结果
			
			uni.$on('uAvatarCropper', async path => {

				
				this.userInfo.avatar = path;
				this.$forceUpdate()
				var _self = this;
				var res = await uni.uploadFile({
					url:_self.apiserver+ "/upload/avatar",
					filePath:path,
					name:"file",
					header: {
						"token": uni.getStorageSync('token')
					},
				})
				
				
			})
		
		},
		async onLoad() {
			var loginRes = this.checkLogin("/pages/user/user", 1);
			if (!loginRes) {
				return;
			}

			this.$http({
				url: '/course/info',
				success: (res) => {
					this.courseList = res.data.data.courseList
					this.course = this.courseList[getApp().globalData.courseId - 1]
				}
			})
	
			this.course = getApp().globalData
			var res = await this.$http({
				url: "/user/all?course_id=" + getApp().globalData.courseId
			})
			
			this.userInfo = res.data.data
		
		},
		async onShow() {
			// 获取通知数量
			this.getNoticeNum()
			var token = uni.getStorageSync("token")

			if (token.substr(0, 5) == "test-") {
				this.userSettingList = USERSETTINGLISTTEST
			} else {
				this.userSettingList = USERSETTINGLISTLOGIN
			}
			this.$http({
				url: '/course/info',
				success: (res) => {
					this.courseList = res.data.data.courseList
					this.course = this.courseList[getApp().globalData.courseId - 1]
				}
			})
			var res = await this.$http({
				url: "/user/all?course_id=" + getApp().globalData.courseId
			})
			this.userInfo = res.data.data
			
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	scroll-view {
		width: 100%;
		height: 100%;
	}

	.picker-view {
		width: 750rpx;
		height: 600rpx;
		margin-top: 20rpx;
		position: fixed;
		bottom: 0;

		.item {
			height: 500px;
			align-items: center;
			justify-content: center;
			text-align: center;
		}
	}

	.userBox {
		width: 100%;
		height: 100%;
		background-color: #FBFAFB;
	}

	.top-banner {
		width: 750rpx;
		height: 30%;
		background-color: $theme-purple-color;
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
	}

	.user-box {
		width: 600rpx;
		position: absolute;
		left: 50%;
		top: 5%;
		background-color: #FFFFFF;
		transform: translateX(-50%);
		border-radius: 30rpx;

		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		.user-info-box {
			width: 100%;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 10rpx;

			text {
				margin-top: 10rpx;
				color: #3c3c3c;
				font-size: 20rpx;
			}
		}

		.top-nav {
			width: 600rpx;
			height: 50rpx;
			margin-top: 60rpx;
			display: flex;
			justify-content: space-between;

			.top-nav-switch {
				width: 200rpx;
				height: 100%;
				margin-left: 25rpx;
			}

			.top-nav-switchTK {
				width: 400rpx;
				height: 100%;
				display: flex;
				justify-content: space-evenly;

				.top-nav-switchTK-text {
					text-align: center;
					width: 200rpx;
					height: 100%;

					display: flex;
					align-items: center;
					justify-content: flex-end;
				}

				.top-nav-switchTK-button {
					text-align: center;
			
					height: 100%;
					color: $theme-blue-color;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.h-line {
			width: 550rpx;
			height: 5rpx;
			background-color: $shadow-gray-color;
			margin: 40rpx auto;
		}

		.v-line {
			height: 100%;
			width: 5rpx;
			background-color: $shadow-gray-color;
		}

		.data-box {
			width: 550rpx;
			height: 150rpx;
			display: flex;
			margin: 0 auto;
			justify-content: center;

			.data-box-item-num {
				font-size: 50rpx;
			}

			.data-box-item {
				width: 220rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
			.data-box-item-end {
				width: 220rpx;
				height: 130rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.data-box-item-text {
				font-size: 25rpx;
			}

			.data-box-item-button {
				width: 150rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20rpx;
				line-height: 50rpx;
				background-color: $theme-blue-color;
				color: #fff;
				border-radius: 30rpx;
			}
		}

		.content-box {
			width: 550rpx;
			height: 160rpx;
			display: flex;
			margin: 0 auto;
			justify-content: space-between;
			align-items: center;
			border-bottom: 5rpx solid $shadow-gray-color;
			
			.notice-num{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				color: #fff;
				background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 5rpx;
			}
			.content-box-logo {
				width: 60rpx;
				height: 60rpx;
				
			}

			.content-box-right-arrow {
				width: 20rpx;
				height: 20rpx;

			}

			.content-box-text {
				width: 380rpx;
				font-size: 30rpx;
			}

		}

		.button-box {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
			width: 200rpx;
			height: 150rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
