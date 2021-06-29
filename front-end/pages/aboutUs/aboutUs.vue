<template>
	<view class="wrap">
		<uni-card full margin="30rpx 20rpx">
			<view class="app-info-box">
				<image src="../../static/logo.png" mode=""></image>
				<view class="app-info-descripition">
					<view class="app-info-appname">题士</view>
					<view class="app-info-slogan">以我为剑,助你披荆斩棘</view>
				</view>
			</view>
		</uni-card>
		<u-section title="联系方式" :right="false"></u-section>
		<uni-card full margin="30rpx 20rpx">
			tishi@126.com
		</uni-card>
		<u-section title="项目官网" :right="false"></u-section>
		<uni-card full margin="30rpx 20rpx">
			https://buaatishi.com
		</uni-card>
		<u-section title="app说明" :right="false"></u-section>
		<uni-card full margin="30rpx 20rpx">
			一款集刷题、题目讨论、错题整理、社区资料分享等功能为一体的优质软件
		</uni-card>
		<u-section title="版本信息" :right="false"></u-section>
		<uni-card full margin="30rpx 20rpx">
			beta
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: $u-bg-color;
	}

	.wrap {

		background-color: $u-bg-color;

		.app-info-box {
			width: 100%;
			height: 200rpx;
			display: flex;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
			background-color: #FFFFFF;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.app-info-descripition {
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;

				.app-info-appname {
					color: $u-main-color;
					font-size: 60rpx;
					height: 140rpx;
					display: flex;
					align-items: center;
				}

				.app-info-slogan {
					color: $u-tips-color;
					font-size: 30rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
				}
			}
		}

	}
</style>
