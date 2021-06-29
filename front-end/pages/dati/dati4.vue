<template>
	<!-- 模拟考试 -->
	<view class="dati-box">
		<view class="dati-box-switch-box">
			<view class="dati-box-switch">
				<u-icon v-if="!isSub" name="hourglass-half-fill" size="50" color="#994ce6"></u-icon>
				<u-count-down v-if="!isSub" bg-color="$u-bg-color" :timestamp="timestamp" @end="countDownEnd"
					separator-size="50" font-size="50"></u-count-down>
				<u-icon name="file-text" v-if="!isSub" @click="popSure" size="50" color="#000000"
					style="margin-left: 50rpx;"></u-icon>
				<text style="font-size: 40rpx;" v-if="!isSub" @click="popSure">交卷</text>
				<u-icon name="edit-pen" v-if="isSub" size="50" color="#000000" style="margin-left: 50rpx;"></u-icon>
				<text style="font-size: 40rpx;" v-if="isSub" @click="popSure">得分:{{score}}</text>
			</view>
		</view>

		<view>
			<!-- 确认提交的框 -->
			<u-modal v-model="isSureShow" @confirm="confirmSub" :show-cancel-button="true" :mask-close-able="true"
				confirm-text="莽了" cancel-text="怂了">
				<view class="slot-content" v-if="!is_finish">
					<text>您还有{{questions2.length - haveDone}}题未完成，真的要这么勇吗？</text>
				</view>
				<view class="slot-content" v-else>
					<text>您已经完成所有题目了，还有时间，不检查检查？</text>
				</view>
			</u-modal>
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
							<dati-item choice="A" v-if="questions.option_a != ''" :text="questions.option_a" @click="changemode('A')"
								:mode="a_answer_mode_now" :choice_mode="a_answer_choice_mode_now"
								:is_multi="questions.is_multi"></dati-item>
							<dati-item choice="B" v-if="questions.option_b != ''" :text="questions.option_b" @click="changemode('B')"
								:mode="b_answer_mode_now" :choice_mode="b_answer_choice_mode_now"
								:is_multi="questions.is_multi"></dati-item>
							<dati-item choice="C" v-if="questions.option_c != ''" :text="questions.option_c" @click="changemode('C')"
								:mode="c_answer_mode_now" :choice_mode="c_answer_choice_mode_now"
								:is_multi="questions.is_multi"></dati-item>
							<dati-item choice="D" v-if="questions.option_d != ''" :text="questions.option_d" @click="changemode('D')"
								:mode="d_answer_mode_now" :choice_mode="d_answer_choice_mode_now"
								:is_multi="questions.is_multi"></dati-item>
						</view>
						<!-- 						<view class="timu-submit-button" v-if="mode[index] == 'check' && !isSub">
							<u-button type="default" @click="submitAnswer" >提交</u-button>
						</view> -->
					</view>
				</scroll-view>
			</swiper-item>

		</swiper>

		<view class="dati-bottom">
			<view class="dati-bottom-last-button" @click="gotoPre">
				上一题
			</view>

			<!-- 			<view>
				<u-icon name="checkmark" color="#0055ff"></u-icon>
				{{pass}}
				<u-icon name="close" color="#ff0000" size="28" style="margin-left: 20rpx;"></u-icon>
				{{error}}
			</view> -->
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
					<view class="q-area" v-for="(item2,i) in status2" :key = "item2.id">
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
				score: 0,
				is_finish: false,
				haveDone: 0,
				id: 1,
				courseId: 1,
				isSub: false,
				index: 0,
				isSureShow: false,
				is_random: false,
				timestamp: 3600,
				timer: {},
				time: 0,
				current: 0,
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
				show: false,
				status: [],
				status2: [],
				mode: [],
				user_answer:[],
				sub_id:[],
				a_mode: [],
				b_mode: [],
				c_mode: [],
				d_mode: [],
				a_answer_mode: [],
				b_answer_mode: [],
				c_answer_mode: [],
				d_answer_mode: [],
				a_answer_choice_mode: [],
				b_answer_choice_mode: [],
				c_answer_choice_mode: [],
				d_answer_choice_mode: [],
				a_answer_mode_now: 'default',
				b_answer_mode_now: 'default',
				c_answer_mode_now: 'default',
				d_answer_mode_now: 'default',
				a_answer_choice_mode_now: 'default',
				b_answer_choice_mode_now: 'default',
				c_answer_choice_mode_now: 'default',
				d_answer_choice_mode_now: 'default',
				pass: 0,
				error: 0
			}
		},
		async onLoad(options) {
			var loginRes = this.checkLogin("/pages/rili/rili", 1);
			if (!loginRes) {
				return;
			}
			if (options.index != null) {
				this.is_finish = true
				this.isSub = true
				this.index = parseInt(options.index)
				this.score = parseInt(options.score)
				this.error = parseInt(options.error)
				this.pass = parseInt(options.pass)
				this.questions2 = uni.getStorageSync('questions')
				uni.removeStorageSync('questions');
				this.a_answer_choice_mode = uni.getStorageSync('a_answer_choice_mode')
				uni.removeStorageSync('a_answer_choice_mode');
				this.b_answer_choice_mode = uni.getStorageSync('b_answer_choice_mode')
				uni.removeStorageSync('b_answer_choice_mode');
				this.c_answer_choice_mode = uni.getStorageSync('c_answer_choice_mode')
				uni.removeStorageSync('c_answer_choice_mode');
				this.d_answer_choice_mode = uni.getStorageSync('d_answer_choice_mode')
				uni.removeStorageSync('d_answer_choice_mode');
				this.a_answer_choice_mode_now = uni.getStorageSync('a_answer_choice_mode_now')
				uni.removeStorageSync('a_answer_choice_mode_now');
				this.b_answer_choice_mode_now = uni.getStorageSync('b_answer_choice_mode_now')
				uni.removeStorageSync('b_answer_choice_mode_now');
				this.c_answer_choice_mode_now = uni.getStorageSync('c_answer_choice_mode_now')
				uni.removeStorageSync('c_answer_choice_mode_now');
				this.d_answer_choice_mode_now = uni.getStorageSync('d_answer_choice_mode_now')
				uni.removeStorageSync('d_answer_choice_mode_now');
				this.a_answer_mode = uni.getStorageSync('a_answer_mode')
				uni.removeStorageSync('a_answer_mode');
				this.b_answer_mode = uni.getStorageSync('b_answer_mode')
				uni.removeStorageSync('b_answer_mode');
				this.c_answer_mode = uni.getStorageSync('c_answer_mode')
				uni.removeStorageSync('c_answer_mode');
				this.d_answer_mode = uni.getStorageSync('d_answer_mode')
				uni.removeStorageSync('d_answer_mode');
				this.a_answer_mode_now = uni.getStorageSync('a_answer_mode_now')
				uni.removeStorageSync('a_answer_mode_now');
				this.b_answer_mode_now = uni.getStorageSync('b_answer_mode_now')
				uni.removeStorageSync('b_answer_mode_now');
				this.c_answer_mode_now = uni.getStorageSync('c_answer_mode_now')
				uni.removeStorageSync('c_answer_mode_now');
				this.d_answer_mode_now = uni.getStorageSync('d_answer_mode_now')
				uni.removeStorageSync('d_answer_mode_now');
				this.updateMode()
				this.status = uni.getStorageSync('status')
				uni.removeStorageSync('status');
				this.questions = this.questions2[this.index]
				this.id = this.questions.id
				if (this.questions.is_collected == 0) {
					this.checked = false
				} else {
					this.checked = true
				}
			} else {
				this.time = 0
				this.timer = setInterval(() => {
					this.time++;
					if (this.time == 5400) {
						clearInterval(this.timer);
					}
				}, 1000)
				var res = await this.$http({
					url: '/question/display_exam/' + getApp().globalData.courseId,
				})
				this.questions2 = res.data.data.questions
				this.questions = this.questions2[this.index]
				this.id = this.questions.id
				if (this.questions.is_collected == 0) {
					this.checked = false
				} else {
					this.checked = true
				}
				for (var i = 0; i < this.questions2.length; i++) {
					this.mode[i] = "check"
					this.a_mode[i] = "default"
					this.b_mode[i] = "default"
					this.c_mode[i] = "default"
					this.d_mode[i] = "default"
					this.a_answer_mode[i] = "default"
					this.b_answer_mode[i] = "default"
					this.c_answer_mode[i] = "default"
					this.d_answer_mode[i] = "default"
					this.a_answer_choice_mode[i] = "default"
					this.b_answer_choice_mode[i] = "default"
					this.c_answer_choice_mode[i] = "default"
					this.d_answer_choice_mode[i] = "default"
					this.status[i] = 0
					this.status2[i] = 0
				}
				if (this.questions.answer.indexOf("A") != -1) {
					this.a_mode[this.index] = 'right'
				}
				if (this.questions.answer.indexOf("B") != -1) {
					this.b_mode[this.index] = 'right'
				}
				if (this.questions.answer.indexOf("C") != -1) {
					this.c_mode[this.index] = 'right'
				}
				if (this.questions.answer.indexOf("D") != -1) {
					this.d_mode[this.index] = 'right'
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			this.update(this.index)
		},
		onBackPress(options) {
			if (!this.isSub) {
				uni.showModal({
					title: '提示',
					content: '本次退出不会保持您的考试数据，是否退出？',
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/index/index'
							})
						} else if (res.cancel) {

						}
					}
				});
				return true;
			}
		},
		methods: {
			popSure() {
				if (!this.isSub) {
					this.haveDone = 0
					for(var i =0;i<this.questions2.length;i++){
						if(this.a_answer_mode[i] == "checked" ||
						this.b_answer_mode[i] == "checked" ||
						this.c_answer_mode[i] == "checked"||this.d_answer_mode[i] == "checked"){
							this.haveDone++
						}
					}
					if (this.haveDone == this.questions2.length) {
						this.is_finish = true
					}
					this.isSureShow = true
				}
			},
			showPop() {
				for(var i =0;i<this.questions2.length;i++){
					if(this.a_answer_mode[i] == "checked" ||
					this.b_answer_mode[i] == "checked" ||
					this.c_answer_mode[i] == "checked"||this.d_answer_mode[i] == "checked"){
						this.status2[i] = 1
					}else{
						this.status2[i] = 0
					}
				}
				this.show = !this.show
			},
			gotoPre() {
				var nextId;
				if (this.index <= 0) {
					this.$refs.popup.open('top')
					return null
				}
				this.index = this.index - 1;
				this.update(this.index)
			},
			gotoNext() {
				var nextId;
				if (this.index >= this.questions2.length - 1) {
					this.$refs.popup.open('top')
					return null
				}
				this.index = this.index + 1;
				this.update(this.index)
			},
			updateMode() {
				this.a_answer_mode_now = this.a_answer_mode[this.index],
					this.b_answer_mode_now = this.b_answer_mode[this.index],
					this.c_answer_mode_now = this.c_answer_mode[this.index],
					this.d_answer_mode_now = this.d_answer_mode[this.index],
					this.a_answer_choice_mode_now = this.a_answer_choice_mode[this.index],
					this.b_answer_choice_mode_now = this.b_answer_choice_mode[this.index],
					this.c_answer_choice_mode_now = this.c_answer_choice_mode[this.index],
					this.d_answer_choice_mode_now = this.d_answer_choice_mode[this.index]
			},
			update(newIndex) {
				this.questions = this.questions2[newIndex]
				this.id = this.questions.id
				this.answerCheck = false
				if (this.questions.is_collected == 0) {
					this.checked = false
				} else {
					this.checked = true
				}
				if (this.questions.answer.indexOf("A") != -1) {
					this.a_mode[this.index] = 'right'
				} else {
					this.a_mode[this.index] = 'default'
				}
				if (this.questions.answer.indexOf("B") != -1) {
					this.b_mode[this.index] = 'right'
				} else {
					this.b_mode[this.index] = 'default'
				}
				if (this.questions.answer.indexOf("C") != -1) {
					this.c_mode[this.index] = 'right'
				} else {
					this.c_mode[this.index] = 'default'
				}
				if (this.questions.answer.indexOf("D") != -1) {
					this.d_mode[this.index] = 'right'
				} else {
					this.d_mode[this.index] = 'default'
				}
				this.updateMode()
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

				if (res.data.code == 2) {
					uni.showToast({
						title: "功能不可用,请先登录",
						icon: "none"
					})
					return;
				}
				this.checked = !this.checked
			},
			gotoIndex(index2) {
				this.index = index2
				this.update(index2)
				this.show = false
			},
			async confirmSub() {
				this.isSub = true
				for (var i = 0; i < this.questions2.length; i++){
					this.mode[i] = 'submit'
					var answer_commit = '';
					if (this.a_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'A'
						} else {
							answer_commit = answer_commit + '-A'
						}
					}
					if (this.b_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'B'
						} else {
							answer_commit = answer_commit + '-B'
						}
					}
					if (this.c_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'C'
						} else {
							answer_commit = answer_commit + '-C'
						}
					}
					if (this.d_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'D'
						} else {
							answer_commit = answer_commit + '-D'
						}
					}
					this.user_answer[i] = answer_commit
					this.sub_id[i] = this.questions2[i].id
				}
				var that = this
				this.$http({
					url: '/question/judge2',
					data: {
						id: this.sub_id,
						course_id: getApp().globalData.courseId,
						user_answer: this.user_answer,
					},
					method: 'POST',
					success: (res) => {
						that.status = res.data.data.status
						for (var i = 0; i < that.questions2.length; i++){
							if (that.status[i] == -1) {
								that.error++
							} else if(that.status[i] == 1) {
								that.pass++ //单选正确得一分，多选正确得两分
								if (that.questions.is_multi == 1) {
									that.score = that.score + 2
								} else {
									that.score = that.score + 1
								}
							}
							if ((that.a_answer_mode[i] == "checked" && that.a_mode[i] ==
									"default")) {
								that.a_answer_mode[i] = "wrong"
							} else if (that.a_mode[i] == "right") {
								that.a_answer_mode[i] = "right"
							} else {
								that.a_answer_mode[i] = "default"
							}
							if ((that.b_answer_mode[i] == "checked" && that.b_mode[i] ==
									"default")) {
								that.b_answer_mode[i] = "wrong"
							} else if (that.b_mode[i] == "right") {
								that.b_answer_mode[i] = "right"
							} else {
								that.b_answer_mode[i] = "default"
							}
							if ((that.c_answer_mode[i] == "checked" && that.c_mode[i] ==
									"default")) {
								that.c_answer_mode[i] = "wrong"
							} else if (that.c_mode[i] == "right") {
								that.c_answer_mode[i] = "right"
							} else {
								that.c_answer_mode[i] = "default"
							}
							if ((that.d_answer_mode[i] == "checked" && that.d_mode[i] ==
									"default")) {
								that.d_answer_mode[i] = "wrong"
							} else if (that.d_mode[i] == "right") {
								that.d_answer_mode[i] = "right"
							} else {
								that.d_answer_mode[i] = "default"
							}
							that.index = i
							that.updateMode()
						}
						var score = this.score
						var time = this.time
						var err = this.error
						var pass = this.pass
						uni.setStorage({
							key: 'a_answer_mode_now',
							data: this.a_answer_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'b_answer_mode_now',
							data: this.b_answer_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'c_answer_mode_now',
							data: this.c_answer_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'd_answer_mode_now',
							data: this.d_answer_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'a_answer_choice_mode_now',
							data: this.a_answer_choice_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'b_answer_choice_mode_now',
							data: this.b_answer_choice_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'c_answer_choice_mode_now',
							data: this.c_answer_choice_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'd_answer_choice_mode_now',
							data: this.d_answer_choice_mode_now,
							success: function() {}
						})
						uni.setStorage({
							key: 'a_answer_choice_mode',
							data: this.a_answer_choice_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'b_answer_choice_mode',
							data: this.b_answer_choice_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'c_answer_choice_mode',
							data: this.c_answer_choice_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'd_answer_choice_mode',
							data: this.d_answer_choice_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'a_answer_mode',
							data: this.a_answer_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'b_answer_mode',
							data: this.b_answer_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'c_answer_mode',
							data: this.c_answer_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'd_answer_mode',
							data: this.d_answer_mode,
							success: function() {}
						})
						uni.setStorage({
							key: 'questions',
							data: this.questions2,
							success: function() {}
						})
						uni.setStorage({
							key: 'status',
							data: this.status,
							success: function() {
								uni.redirectTo({
									url: '/pages/dati/finish?score=' + score + '&time=' + time +
										'&error=' + err + '&pass=' + pass
								})
							}
						})
					}
				})
				
			},
			countDownEnd() {
				this.isSub = true
			},
			changemode(who) {
				if (!this.isSub) {
					if (who == 'A') {
						if (this.mode[this.index] == "check") {
							if (this.a_answer_mode[this.index] == "default") {
								this.a_answer_mode[this.index] = "checked";
								this.a_answer_choice_mode[this.index] = "checked"
							} else {
								this.a_answer_mode[this.index] = "default"
								this.a_answer_choice_mode[this.index] = "default"
							}
						}
					} else if (who == 'B') {
						if (this.mode[this.index] == "check") {
							if (this.b_answer_mode[this.index] == "default") {
								this.b_answer_mode[this.index] = "checked";
								this.b_answer_choice_mode[this.index] = "checked"
							} else {
								this.b_answer_mode[this.index] = "default"
								this.b_answer_choice_mode[this.index] = "default"
							}
						}
					} else if (who == 'C') {
						if (this.mode[this.index] == "check") {
							if (this.c_answer_mode[this.index] == "default") {
								this.c_answer_mode[this.index] = "checked"
								this.c_answer_choice_mode[this.index] = "checked"
							} else {
								this.c_answer_mode[this.index] = "default"
								this.c_answer_choice_mode[this.index] = "default"
							}
						}
					} else if (who == 'D') {
						if (this.mode[this.index] == "check") {
							if (this.d_answer_mode[this.index] == "default") {
								this.d_answer_mode[this.index] = "checked"
								this.d_answer_choice_mode[this.index] = "checked"
							} else {
								this.d_answer_mode[this.index] = "default"
								this.d_answer_choice_mode[this.index] = "default"
							}
						}
					}
					this.updateMode()
				}
			},
			submitAnswer() {
				for (var i = 0; i < this.questions2.length; i++){
					this.mode[i] = 'submit'
					var answer_commit = '';
					if (this.a_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'A'
						} else {
							answer_commit = answer_commit + '-A'
						}
					}
					if (this.b_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'B'
						} else {
							answer_commit = answer_commit + '-B'
						}
					}
					if (this.c_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'C'
						} else {
							answer_commit = answer_commit + '-C'
						}
					}
					if (this.d_answer_mode[i] == "checked") {
						if (answer_commit == '') {
							answer_commit = answer_commit + 'D'
						} else {
							answer_commit = answer_commit + '-D'
						}
					}
					this.user_answer[i] = answer_commit
					this.sub_id[i] = this.questions2[i].id
				}
				var that = this;
				this.$http({
					url: '/question/judge2',
					data: {
						id: this.sub_id,
						course_id: getApp().globalData.courseId,
						user_answer: this.user_answer,
					},
					method: 'POST',
					success: (res) => {
						this.status = res.data.data.status
						for (var i = 0; i < this.questions2.length; i++){
							if (this.status[i] == -1) {
								that.error++
							} else if(this.status[i] == 1) {
								this.pass++ //单选正确得一分，多选正确得两分
								if (this.questions.is_multi == 1) {
									this.score = this.score + 2
								} else {
									this.score = this.score + 1
								}
							}
							if ((this.a_answer_mode[i] == "checked" && this.a_mode[i] ==
									"default")) {
								this.a_answer_mode[i] = "wrong"
							} else if (this.a_mode[i] == "right") {
								this.a_answer_mode[i] = "right"
							} else {
								this.a_answer_mode[i] = "default"
							}
							if ((this.b_answer_mode[i] == "checked" && this.b_mode[i] ==
									"default")) {
								this.b_answer_mode[i] = "wrong"
							} else if (this.b_mode[i] == "right") {
								this.b_answer_mode[i] = "right"
							} else {
								this.b_answer_mode[i] = "default"
							}
							if ((this.c_answer_mode[i] == "checked" && this.c_mode[i] ==
									"default")) {
								this.c_answer_mode[i] = "wrong"
							} else if (this.c_mode[i] == "right") {
								this.c_answer_mode[i] = "right"
							} else {
								this.c_answer_mode[i] = "default"
							}
							if ((this.d_answer_mode[i] == "checked" && this.d_mode[i] ==
									"default")) {
								this.d_answer_mode[i] = "wrong"
							} else if (this.d_mode[i] == "right") {
								this.d_answer_mode[i] = "right"
							} else {
								this.d_answer_mode[i] = "default"
							}
							this.index = i
							this.updateMode()
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
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

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
						margin-right: 1rpx;
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
			padding: 0 20rpx;
			border-top: 3rpx solid $shadow-gray-color;
			display: flex;
			width: 750rpx;
			height: 10%;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
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

		.q-button1 {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #aaaaff;
			border: 1px solid $u-type-success;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.q-button0 {
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

		.q-button-1 {
			width: 80rpx;
			height: 80rpx;
			border: 1px solid red;
			border-radius: 50%;
			background-color: #f4acac;
			border: 1px solid red;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.slot-content {
			margin-top: 50rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

	}
</style>
