<template>
	<view class="dati-box">
		<view class="dati-box-switch-box">
			<view class="dati-box-switch">
				<uni-segmented-control :values="items" styleType="button" activeColor="#7468BE" activeTextColor="#fff" inactiveTextColor="#7468be"
					@clickItem="onClickItem"></uni-segmented-control>
			</view>
		</view>


		<swiper :indicator-dots="false" :autoplay="false">
			<swiper-item>
				<scroll-view scroll-y="true">
					<view class="swiper-item">
						<view class="timu-description">
							<view class="timu-description-type">
								<template v-if="questions.is_multi == 1">
									多选
								</template>
								<template v-else>
									单选
								</template>
							</view>
							<view class="timu-description-text">
								{{questions.id+'.'+questions.q_description}}
							</view>
						</view>
						<view class="timu-description-image" v-if=" questions.image_url != ''">
							<image :src="questions.image_url"></image>
						</view>
						<view class="timu-choice-list">
							<template v-if="current == 1">
								<!-- 是背题模式 -->
								<view class="timu-choice-list">
									<dati-item choice="A" v-if="questions.option_a != ''" :text="questions.option_a" :mode="a_mode"
										:choice_mode="a_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="B" v-if="questions.option_b != ''" :text="questions.option_b" :mode="b_mode"
										:choice_mode="b_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="C" v-if="questions.option_c != ''" :text="questions.option_c" :mode="c_mode"
										:choice_mode="c_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="D" v-if="questions.option_d != ''" :text="questions.option_d" :mode="d_mode"
										:choice_mode="d_mode" :is_multi="questions.is_multi"></dati-item>
								</view>
							</template>
							<template v-else>
								<!-- 刷题模式 -->
								<view class="timu-choice-list">
									<dati-item choice="A" v-if="questions.option_a != ''" :text="questions.option_a" @click="changemode('A')"
										:mode="a_answer_mode" :choice_mode="a_answer_choice_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="B" v-if="questions.option_b != ''" :text="questions.option_b" @click="changemode('B')"
										:mode="b_answer_mode" :choice_mode="b_answer_choice_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="C" v-if="questions.option_c != ''" :text="questions.option_c" @click="changemode('C')"
										:mode="c_answer_mode" :choice_mode="c_answer_choice_mode" :is_multi="questions.is_multi"></dati-item>
									<dati-item choice="D" v-if="questions.option_d != ''" :text="questions.option_d" @click="changemode('D')"
										:mode="d_answer_mode" :choice_mode="d_answer_choice_mode" :is_multi="questions.is_multi"></dati-item>
								</view>
							</template>
						</view>
						<view class="timu-submit-button" v-if="current == 0 && mode == 'check' ">
							<u-button type="default" :hair-line="false" @click="submitAnswer">提交</u-button>
						</view>
						<view class="timu-submit-button">
							<u-button type="primary" v-if="!show_comment" @click="gotoComment">查看评论</u-button>
						</view>
					</view>
				</scroll-view>
			</swiper-item>

		</swiper>

		<view class="dati-bottom">
			<view class="dati-bottom-last-button" @click="gotoPre">
				上一题
			</view>
			<view>
				<u-icon name="error" color="#ff0000"></u-icon>
				错误率:{{(questions.error_rate*100)}}%
			</view>
			<view class="dati-bottom-collection">
				<uni-fav :checked="checked" class="favBtn" circle="true" bgColor="#ffffff" fgColor="#7468BE"
					fgColorChecked="#ffffff" bgColorChecked="#7468BE" @click="favClick" />
			</view>
			<view>
				<u-icon @click="showPop" name="grid" color="#0000ff" size="28" style="margin-left: 10rpx;"></u-icon>
				<text @click="showPop" style="margin-left: 5rpx;">{{(index+1)+'/'+questions2.length}}</text>
			</view>
			<view class="dati-bottom-next-button" @click="gotoNext">
				下一题
			</view>
		</view>
		<uni-popup ref="popup" type="message" style="font-size: 50rpx;">
			<uni-popup-message type="error" message="没有啦" :duration="2000"></uni-popup-message>
		</uni-popup>
		<view>
			<u-popup v-model="show" mode="bottom" height="600rpx">
				<view class="q-box">
					<view class="q-area" v-for="(item2,i) in status" :key = "item2.id">
						<view :class="'q-button'+item2" @click="gotoIndex(i)">
							{{i+1}}
						</view>
						
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"
	import uniCard from "@/uni_modules/uni-card/components/uni-card/uni-card.vue"
	import datiItem from "@/components/datiItem.vue"

	export default {
		components: {
			uniSegmentedControl,

			uniCard,
			datiItem
		},
		data() {
			return {
				items: ["刷题", "背题"],
				show:false,
				isSort: 0,
				id: 1,
				status: [],
				courseId: 1,
				index: 0,
				current: 0,
				colorIndex: 0,
				show_comment: false,
				questions: {
					id: 1,
					q_description: "",
					option_a: "",
					option_b: "",
					option_c: "",
					option_d: "",
					answer: "",
					image_url:null,
					is_multi: 0,
					is_collected: 1
				},
				questions2: [],
				checked: false,
				answerCheck: false,
				mode: "check",
				a_mode: 'default',
				b_mode: 'default',
				c_mode: 'default',
				d_mode: 'default',
				a_answer_mode: 'default',
				b_answer_mode: 'default',
				c_answer_mode: 'default',
				d_answer_mode: 'default',
				a_answer_choice_mode: 'default',
				b_answer_choice_mode: 'default',
				c_answer_choice_mode: 'default',
				d_answer_choice_mode: 'default'
			}
		},
		onLoad(options) {
			var loginRes = this.checkLogin("/pages/rili/rili", 1);
			if (!loginRes) {
				return;
			}


			this.questions2 = uni.getStorageSync('questions')
			uni.removeStorageSync('questions');
			this.index = parseInt(options.index)
			var nowid;
			nowid = this.questions2[this.index].id
			this.questions = this.questions2[this.index]
			this.id = this.questions.id
			if (this.questions.is_collected == 0) {
				this.checked = false
			} else {
				this.checked = true
			}
			if (this.questions.answer.indexOf("A") != -1) {
				this.a_mode = 'right'
			}
			if (this.questions.answer.indexOf("B") != -1) {
				this.b_mode = 'right'
			}
			if (this.questions.answer.indexOf("C") != -1) {
				this.c_mode = 'right'
			}
			if (this.questions.answer.indexOf("D") != -1) {
				this.d_mode = 'right'
			}
			for (var i = 0; i < this.questions2.length; i++) {
				this.status[i] = 0
			}

		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			this.update(this.id)
		},
		methods: {
			gotoIndex(index2) {
				this.index = index2
				this.update(index2)
				this.show = false
			},
			showPop() {
				this.show = !this.show
			},
			gotoPre() {
				var _self = this;
				if (this.index <= 0) {
					_self.$refs.popup.open('top')
					return null
				}
				this.index = this.index - 1;
				this.update(this.index)

			},
			gotoNext() {
				var _self = this;
				if (this.index >= this.questions2.length - 1) {
					_self.$refs.popup.open('top')
					return null
				}
				this.index = this.index + 1;
				this.update(this.index)
			},
			update(newIndex) {
				this.a_answer_mode = 'default'
				this.b_answer_mode = 'default'
				this.c_answer_mode = 'default'
				this.d_answer_mode = 'default'
				this.a_answer_choice_mode = 'default'
				this.b_answer_choice_mode = 'default'
				this.c_answer_choice_mode = 'default'
				this.d_answer_choice_mode = 'default'
				var _self = this
				this.mode = 'check'
				this.questions = this.questions2[newIndex]
				this.id = this.questions.id
				this.answerCheck = false
				if (this.questions.is_collected == 0) {
					this.checked = false
				} else {
					this.checked = true
				}
				if (this.questions.answer.indexOf("A") != -1) {
					this.a_mode = 'right'
				} else {
					this.a_mode = 'default'
				}
				if (this.questions.answer.indexOf("B") != -1) {
					this.b_mode = 'right'
				} else {
					this.b_mode = 'default'
				}
				if (this.questions.answer.indexOf("C") != -1) {
					this.c_mode = 'right'
				} else {
					this.c_mode = 'default'
				}
				if (this.questions.answer.indexOf("D") != -1) {
					this.d_mode = 'right'
				} else {
					this.d_mode = 'default'
				}
			},
			async favClick() {
				var _self = this;
				var res;
				if (!this.checked) {
					res = await this.$http({
						url: '/question/collect/',
						data: {
							id: this.id,
							course_id: getApp().globalData.courseId
						},
						method: 'POST'
					})


				} else {
					res = await this.$http({
						url: '/question/cancel_collect/',
						data: {
							id: this.id,
							course_id: getApp().globalData.courseId
						},
						method: 'POST'
					})
				}

				if (res.data.code == 2) {
					uni.showToast({
						title: "功能不可用,请先登录",
						icon: "none"
					})
					return;
				}
				this.checked = !this.checked
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			gotoComment() {
				var timuid = this.questions.id;
				uni.navigateTo({
					url: "/pages/comment/comment?timuId=" + timuid
				})
			},
			changemode(who) {
				if (who == 'A') {
					if (this.mode == "check") {
						if (this.a_answer_mode == "default") {
							this.a_answer_mode = "checked";
							this.a_answer_choice_mode = "checked"
						} else {
							this.a_answer_mode = "default"
							this.a_answer_choice_mode = "default"
						}
					}
				} else if (who == 'B') {
					if (this.mode == "check") {
						if (this.b_answer_mode == "default") {
							this.b_answer_mode = "checked";
							this.b_answer_choice_mode = "checked"
						} else {
							this.b_answer_mode = "default"
							this.b_answer_choice_mode = "default"
						}
					}
				} else if (who == 'C') {
					if (this.mode == "check") {
						if (this.c_answer_mode == "default") {
							this.c_answer_mode = "checked"
							this.c_answer_choice_mode = "checked"
						} else {
							this.c_answer_mode = "default"
							this.c_answer_choice_mode = "default"
						}
					}
				} else if (who == 'D') {
					if (this.mode == "check") {
						if (this.d_answer_mode == "default") {
							this.d_answer_mode = "checked"
							this.d_answer_choice_mode = "checked"
						} else {
							this.d_answer_mode = "default"
							this.d_answer_choice_mode = "default"
						}
					}
				}
			},
			submitAnswer() {
				this.mode = 'submit'
				var _self = this;
				var answer_commit = '';
				if (this.a_answer_mode == "checked") {
					if (answer_commit == '') {
						answer_commit = answer_commit + 'A'
					} else {
						answer_commit = answer_commit + '-A'
					}
				}
				if (this.b_answer_mode == "checked") {
					if (answer_commit == '') {
						answer_commit = answer_commit + 'B'
					} else {
						answer_commit = answer_commit + '-B'
					}
				}
				if (this.c_answer_mode == "checked") {
					if (answer_commit == '') {
						answer_commit = answer_commit + 'C'
					} else {
						answer_commit = answer_commit + '-C'
					}
				}
				if (this.d_answer_mode == "checked") {
					if (answer_commit == '') {
						answer_commit = answer_commit + 'D'
					} else {
						answer_commit = answer_commit + '-D'
					}
				}
				this.$http({
					url: '/question/judge',
					data: {
						id: this.id,
						course_id: getApp().globalData.courseId,
						user_answer: answer_commit,
						mode: this.isSort
					},
					method: 'POST',
					success: (res) => {
						if (res.data.data.status == -1) {
							this.status[this.index] = -1
						} else {
							this.status[this.index] = 1
						}
						if ((this.a_answer_mode == "checked" && this.a_mode == "default")) {
							this.a_answer_mode = "wrong"
						} else if (this.a_mode == "right") {
							this.a_answer_mode = "right"
						} else {
							this.a_answer_mode = "default"
						}
						if ((this.b_answer_mode == "checked" && this.b_mode == "default")) {
							this.b_answer_mode = "wrong"
						} else if (this.b_mode == "right") {
							this.b_answer_mode = "right"
						} else {
							this.b_answer_mode = "default"
						}
						if ((this.c_answer_mode == "checked" && this.c_mode == "default")) {
							this.c_answer_mode = "wrong"
						} else if (this.c_mode == "right") {
							this.c_answer_mode = "right"
						} else {
							this.c_answer_mode = "default"
						}
						if ((this.d_answer_mode == "checked" && this.d_mode == "default")) {
							this.d_answer_mode = "wrong"
						} else if (this.d_mode == "right") {
							this.d_answer_mode = "right"
						} else {
							this.d_answer_mode = "default"
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.dati-box {
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $u-bg-color;

		.dati-box-switch-box {
			width: 600rpx;
			height: 10%;
			display: flex;
			justify-content: center;
			align-items: center;

			.dati-box-switch {
				width: 500rpx;
				height: 80rpx;
			}
		}

		swiper {
			margin-top: 30rpx;
			width: 750rpx;
			height: 80%;

			scroll-view {
				height: 100%;
			}

			.swiper-item {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.timu-description {
					width: 700rpx;
					display: flex;
					justify-content: space-evenly;
					background-color: #FFFFFF;
					box-shadow: 1rpx 1rpx 1rpx 3rpx #c0c0c0;
					border-radius: 10rpx;
					min-height: 100rpx;

					.timu-description-type {
						width: 80rpx;
						height: 100%;
						margin-right: 10rpx;
						margin-top: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10rpx;
						color: #fff;
						background-color: #ccc;
					}

					.timu-description-text {
						width: 80%;
						font-size: 30rpx;
						margin-top: 10rpx;
						margin-bottom: 10rpx;

						overflow: hidden;
						white-space: normal;
						word-break: break-all;
					}
				}

				.timu-description-image {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-top: 30rpx;
					margin-bottom: 30rpx;
				}

				.timu-choice-list {
					width: 700rpx;
					margin-top: 30rpx;
					display: flex;
					flex-direction: column;

				}

				.timu-submit-button {
					margin-top: 40rpx;
					width: 150rpx;
					height: 75rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.timu-comment-box {
					width: 700rpx;
					margin-top: 20rpx;
				}
			}
		}

		.dati-bottom {
			box-sizing: border-box;
			padding: 0 10rpx;
			border-top: 3rpx solid $shadow-gray-color;
			display: flex;
			width: 750rpx;
			height: 10%;
			justify-content: space-between;
			align-items: center;
			font-size: 30rpx;
			.dati-bottom-last-button{
				font-size: 36rpx;
			}
			.dati-bottom-next-button{
				font-size: 36rpx;
			}

		}
		
		.q-box {
				width: 700rpx;
				margin-left: 20rpx;
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
		
				.q-area {
					width: 90rpx;
					height: 90rpx;
					margin-left: 20rpx;
					margin-bottom: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}
		
		.q-button1{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: $u-type-success-light;
			border:1px solid $u-type-success;
			
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.q-button0{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: 1px solid $u-type-info-dark;
			
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.q-button-1{
			width: 80rpx;
			height: 80rpx;
			border: 1px solid red;
			border-radius: 50%;
			background-color: #f4acac;
			border:1px solid red;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

	}
</style>
