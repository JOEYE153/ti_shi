<template>
	<view>
		<view class="top-banner">
			<text>Hi ! 题士</text>
		</view>

		<view class="content-box">
			<view class="login-register-switch ">
				<view class="login-switch" :class="mode == 'register' ? 'login-register-active':''"
					@click="changemode('login')">登录</view>
				<view class="register-switch" :class="mode == 'login' ? 'login-register-active':''"
					@click="changemode('register')">注册</view>
			</view>
			<swiper :indicator-dots="false" :autoplay="false" class="swiper-login" :current="current"
				:disable-touch="true" v-if="mode == 'register'">
				<swiper-item>
					<view class="swiper-item username-password-register">
						<view class="username-input-box">
							<uni-easyinput prefixIcon="person" v-model="register.username" trim placeholder="请输入用户名" />
						</view>
						<view class="password-input-box">
							<uni-easyinput prefixIcon="locked" type="password" v-model="register.password" trim
								placeholder="请输入密码"></uni-easyinput>
						</view>
						<view class="password2-input-box">
							<uni-easyinput prefixIcon="locked" type="password" v-model="password2" trim
								placeholder="请确认密码"></uni-easyinput>
						</view>
						<view class="next-button-box" @click="gotoEmailInput()">
							<uni-icons type="arrowright" color="#fff"></uni-icons>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="phone-user">
						<view class="phone-user-title">请输入您的邮箱</view>
						<view class="phone-user-input">
							<input type="text" v-model:value="register.email" />
						</view>
						<view class="tips-user-box">
							<text>我们将发送一段验证码到您的邮箱,请您注意查收</text>
						</view>

						<view class="user-next-button" @click="sendEmail()" v-if="timeStamp == TIMESTAMP">
							<uni-icons type="arrowright" color="#fff"></uni-icons>
						</view>



						<view class="phone-user-alert" v-if="timeStamp != TIMESTAMP">
							{{TIMESTAMP-timeStamp}}秒后可重新发送
						</view>
					</view>

				</swiper-item>
				<swiper-item>
					<view class="swiper-item code-user">
						<text class="code-user-title">邮箱验证码</text>
						<view class="code-user-tips-box">
							<text class="code-user-tips">我们已经发送了一条验证码到您的邮箱，请输入您接收到的验证码</text>
						</view>
						<view class="phone-user-input phone-user-code">
							<input type="number" v-model:value="register.code" :maxlength="6" />
						</view>
						<button type="default" class="loginButton" @click="verifyCode()">注册</button>
						<view class="code-user-box">
							<view class="user-button" @click="gotoLast()" v-if="timeStamp == TIMESTAMP">
								<uni-icons type="arrowleft" color="#fff"></uni-icons>
							</view>

						</view>


						<view class="code-user-alert" v-if="timeStamp != TIMESTAMP">
							{{TIMESTAMP-timeStamp}}秒后可重新发送
						</view>

					</view>
				</swiper-item>

			</swiper>
			<swiper :indicator-dots="false" :autoplay="false" class="swiper-login" :current="current"
				:disable-touch="canScroll" v-if="mode == 'login'" @change="changeSwiper">
				<swiper-item>
					<view class="login-box">

						<view class="email-input-box">
							<uni-easyinput prefixIcon="person" v-model="loginForm.email" trim placeholder="请输入邮箱地址" />
						</view>
						<view class="password-input-box">
							<uni-easyinput prefixIcon="locked" type="password" v-model="loginForm.password" trim
								placeholder="请输入密码"></uni-easyinput>
						</view>
						<button type="default" class="loginButton" @click="loginEmail()">登录</button>
						<button type="default" class="loginButton" @click="gotoResetPassword">忘记密码</button>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="reset-password-box">
						<u-form :model="resetPasswordForm" ref="resetPasswordForm">
							<u-form-item label-position="left" label="邮箱" left-icon="email" label-width="150">
								<u-input v-model="resetPasswordForm.email" :focus="false"> </u-input>
							</u-form-item>
							<u-form-item label-position="left" label="验证码" label-width="150" left-icon="account">
								<u-input placeholder="请输入验证码" v-model="resetPasswordForm.code" type="text"
									:focus="false"></u-input>
								<u-button slot="right" type="primary" size="mini" @click="getCode">{{codeTips}}
								</u-button>
							</u-form-item>
							<u-form-item label-position="left" label="密码" prop="password" label-width="150"
								left-icon="lock">
								<u-input :password-icon="true" type="password" v-model="resetPasswordForm.password"
									:focus="false" placeholder="请输入密码"></u-input>
							</u-form-item>
							<u-form-item label-position="left" label="确认密码" label-width="180" prop="rePassword"
								left-icon="lock">
								<u-input type="password" v-model="resetPasswordForm.rePassword" placeholder="请确认密码"
									:focus="false">
								</u-input>
							</u-form-item>
						</u-form>
						<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
						<button type="default" class="loginButton" @click="resetPassword()">确认</button>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniEasyinput from "@/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"
	export default {
		components: {
			uniEasyinput
		},
		data() {
			return {
				register: {
					email: "",
					code: "",
					username: "",
					password: ""
				},
				password2: "",
				loginForm: {
					email: "",
					password: ""
				},
				current: 0,
				email: "",
				mode: "login",
				timeStamp: 60,
				timer: {},
				TIMESTAMP: 60,
				tmpCode: "",
				resetPasswordForm: {
					email: "",
					code: "",
					password: "",
					rePassword: ""
				},
				codeTips: '',
				canScroll: true
			};
		},
		methods: {
			checkEmail(email) {
				return RegExp(
						/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
					.test(email);
			},
			async sendEmail() {
				var _self = this;

				if (this.checkEmail(this.register.email)) {
					this.timeStamp = 0;
					this.timer = setInterval(() => {
						this.timeStamp++;

						if (this.timeStamp == this.TIMESTAMP) {
							clearInterval(this.timer);
						}
					}, 1000)
					var res = await uni.request({
						url: _self.apiserver + "/register/email/verify",
						method: "POST",
						data: {
							email: this.register.email
						}
					})
					res = res[1].data

					if (res.code != 1) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						return;
					}
					this.tmpCode = res.data.verifyCode;
					this.current++;

				} else {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}

			},
			gotoLast() {
				this.current--;
			},
			gotoNext() {
				this.current++;
			},
			gotoEmailInput() {

				if (this.register.username == "" || this.register.password == "" || this.password2 == "") {
					uni.showToast({
						title: "用户名或密码不为空",
						icon: "none"
					})
					return;
				}

				if (this.register.password != this.password2) {
					uni.showToast({
						title: "两次输入密码不一致",
						icon: "none"
					})
					return;
				}
				this.current++
			},
			async verifyCode() {
				var _self = this;

				var res = await uni.request({
					url: _self.apiserver + "/register/email/confirm",
					method: "POST",
					data: {
						email: this.register.email,
						verifycode: this.register.code,
						username: this.register.username,
						password: this.register.password
					}
				})
				res = res[1].data;
				if (res.code != 1) {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
				}

				uni.setStorageSync("token", res.data.token)
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			changemode(mode) {
				this.current = 0;
				this.mode = mode;
			},
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			async loginEmail() {
				var _self = this;

				var res = await uni.request({
					url: _self.apiserver + "/login/email",
					method: "POST",
					data: {
						email: this.loginForm.email,
						password: this.loginForm.password,
					}
				})
				res = res[1].data;

				if (res.code != 1) {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
					return;
				}
				uni.setStorageSync("token", res.data.token);
				uni.switchTab({
					url: "/pages/index/index"
				})

			},
			gotoResetPassword() {
				this.current = 1;
				this.canScroll = false;
			},

			codeChange(text) {
				this.codeTips = text;
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					if (!this.checkEmail(this.resetPasswordForm.email.trim())) {
						uni.showToast({
							title: "邮箱格式不正确",
							icon: "none"
						})
						return
					}
					uni.showLoading({
						title: '正在获取验证码'
					})

					var res = await uni.request({
						url: this.apiserver + "/reset/verify",
						method: "POST",
						data: {
							email: this.resetPasswordForm.email
						}
					})
					res = res[1].data
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						if (res.code == 1) {
							this.$u.toast('验证码已发送');
						} else {
							this.$u.toast("发送验证码失败")
						}
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			async resetPassword() {
				if (this.resetPasswordForm.password != this.resetPasswordForm.rePassword) {
					uni.showToast({
						title: "两次输入密码不一致",
						icon: "none"
					})
				}
				var res = await uni.request({
					url: this.apiserver + "/reset/verify",
					method: "POST",
					data: {
						email: this.resetPasswordForm.email,
						verifycode: this.resetPasswordForm.code,
						password: this.resetPasswordForm.password,
					}
				})

				res = res[1].data
				if (res.code == 1) {
					uni.showToast({
						title: "修改成功",
						icon: "none"
					})
					this.current = 0
					return
				} else {
					uni.showToast({
						title: "修改失败",
						icon: "none"
					})
					return;
				}
			}

		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F1F1F1;
	}

	view {
		box-sizing: border-box;
	}

	.login-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.loginButton {
			color: #fff;
			background-color: $theme-purple-color;
			width: 500rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			box-shadow: 2px 2px 5px #888888;
			margin-top: 50rpx;
		}

		// .login-title{
		// 	width: 95%;
		// 	color: #000;
		// 	font-weight: bold;
		// 	font-size: 40rpx;
		// 	padding: 10rpx;
		// 	border-bottom: 1px solid #c0c0c0;
		// }
		.email-input-box {
			margin-top: 100rpx;
			width: 80%;
			height: 10%;

		}

		.password-input-box {
			margin-top: 50rpx;
			width: 80%;
			height: 10%;

		}


	}

	.loginButton {
		color: #fff;
		background-color: $theme-purple-color;
		width: 500rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		box-shadow: 2px 2px 5px #888888;
		margin-top: 50rpx;
	}

	.reset-password-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50rpx;

		.loginButton {
			color: #fff;
			background-color: $theme-purple-color;
			width: 500rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			box-shadow: 2px 2px 5px #888888;
			margin-top: 50rpx;
		}
	}

	.login-register-switch {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;

		.login-switch {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.register-switch {
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

		.login-register-active {
			background-color: $theme-purple-color;
			color: #fff;
		}
	}

	.top-banner {
		width: 100%;
		height: 640rpx;
		background-color: $theme-purple-color;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 50rpx;
		font-weight: bold;
		text-decoration: dotted;
	}

	.content-box {
		width: 640rpx;
		height: 60%;
		background-color: #fff;
		position: absolute;

		top: 30%;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 24rpx;
		box-shadow: 0rpx 0rpx 20rpx 0rpx #C0C0C0;
	}

	.swiper-login {
		width: 100%;
		height: 100%;
	}

	.phone-user {
		padding: 50rpx;
		display: flex;
		flex-direction: column;

		.phone-user-alert {
			width: 100%;
			height: 20%;
			display: flex;
			flex-direction: center;
			align-items: center;
			justify-content: center;
			color: $theme-purple-color;
		}

		.phone-user-title {
			color: #000;
			font-weight: bold;
			font-size: 30rpx;
			line-height: 30rpx;
			height: 50rpx;
		}

		.tips-user-box {
			padding-top: 20rpx;

			text {
				color: #c8c8c8;

			}

		}


		.user-next-button {
			width: 88rpx;
			height: 88rpx;
			margin: 100rpx auto 0 auto;
			background-color: $theme-purple-color;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 2rpx 2rpx 32rpx 8rpx #aeaeb7;

		}


	}

	.code-user {
		width: 100%;
		height: 100%;
		padding: 50rpx;

		.code-user-alert {
			width: 100%;
			height: 20%;
			display: flex;
			flex-direction: center;
			align-items: center;
			justify-content: center;
			color: $theme-purple-color;
		}

		.code-user-title {
			font-size: 30rpx;
			font-weight: bold;
		}

		.code-user-tips {
			font-size: 24rpx;
		}

		.code-user-tips-box {
			// padding: 0 30rpx;
			color: #8c8c8c;
			margin-top: 30rpx;
		}

		.phone-user-code {
			width: 50%;
			margin-left: auto;
			margin-right: auto;
			letter-spacing: 20rpx;
			text-align: center;
		}


	}

	.code-user-box {
		display: flex;

		.user-button {
			width: 88rpx;
			height: 88rpx;
			margin: 30rpx auto 0 auto;
			background-color: $theme-purple-color;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 2rpx 2rpx 32rpx 8rpx #aeaeb7;
		}
	}

	.phone-user-input {
		width: 100%;
		height: 80rpx;
		/* background-color: red; */
		border-bottom: 1rpx solid #dedede;
		margin-top: 40rpx;
		position: relative;
	}

	.username-password-register {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.username-input-box {
			margin-top: 100rpx;
			width: 80%;
			height: 10%;
		}

		.password-input-box {
			width: 80%;
			height: 10%;
			margin-top: 50rpx;
		}

		.password2-input-box {
			width: 80%;
			height: 10%;
			margin-top: 50rpx;
		}

		.next-button-box {
			width: 88rpx;
			height: 88rpx;
			margin: 100rpx auto 0 auto;
			background-color: $theme-purple-color;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 2rpx 2rpx 32rpx 8rpx #aeaeb7;

		}
	}
</style>
