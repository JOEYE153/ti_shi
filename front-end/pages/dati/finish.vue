<template>
	<view class="finish-box">
		<view class="score-box">
			<view class="score-data">
				<view>
					<view class="text">{{textContext}}</view>
					<view class="score-text">{{score}}</view>
				</view>
			</view>
		</view>
		<view class="error-info">
			<view>
				<u-icon name="checkmark" size="35" color="#0055ff"></u-icon>
				{{pass}}
				<u-icon name="close" color="#ff0000" size="35" style="margin-left: 20rpx;"></u-icon>
				{{err}}
				<u-icon name="info-circle" size="35" color="#55557f" style="margin-left: 20rpx;"></u-icon>
				{{unfinish}}
				<u-icon name="clock" size="40" color="#ff5500" style="margin-left: 20rpx;"></u-icon>
				本次用时:{{hour}}时:{{minute}}分:{{sec}}秒
			</view>
		</view>
		<scroll-view scroll-y="true"  class="timu">
			<view class="timu-info">
			<view class="q-area" v-for="(item2,i) in status" :key = "item2.id" >
				<view :class="'q-button'+item2" @click="gotoIndex(i)">
					{{i+1}}
				</view>		
			</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				status:[],
				questions2:[],
				score: 0,
				textContext:'分数',
				minute: 0,
				hour: 0,
				sec: 0,
				err:0,
				pass:0,
				unfinish:0,
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
				d_answer_choice_mode_now: 'default'
			}
		},
		onLoad(options) {
			this.questions2 = uni.getStorageSync('questions')
			uni.removeStorageSync('questions');
			this.status = uni.getStorageSync('status')
			uni.removeStorageSync('status');
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
			this.score = options.score;
			var time = options.time
			this.hour = parseInt(time/3600)
			this.sec = time % 60
			this.minute = parseInt((time % 3600) / 60)
			this.err = options.error
			this.pass = options.pass
			this.unfinish = this.questions2.length - this.err - this.pass
			// if(this.score <60){
			// 	this.textContext = '不及格'
			// }else if(this.score<70){
			// 	this.textContext = '及格'
			// }else if(this.score < 85){
			// 	this.textContext = '良好'
			// }else{
			// 	this.textContext = '优秀'
			// }
		},
		methods:{
			gotoIndex(index){
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
				var score = this.score
				var err = this.err
				var pass = this.pass
				
				uni.setStorage({
					key: 'questions',
					data: this.questions2,
					success: function() {
					}
				})
				uni.setStorage({
					key: 'status',
					data: this.status,
					success: function() {
						uni.navigateTo({
							url: '/pages/dati/dati2?score='+ score +'&error=' + err + '&pass='+pass + '&index='+index
						})
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
	
	.finish-box {
		width: 750rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $u-bg-color;
	}
	
	.score-box {
		width: 100%;
		height: 40%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $theme-purple-color;
		border-bottom-left-radius: 150rpx;
		border-bottom-right-radius: 150rpx;
		display: flex;
		justify-content: center;
		
		.score-data{
			margin-bottom: 50rpx ;
			width: 250rpx;
			height: 250rpx;
			border-radius: 50%;
			background-color: #FFFFFF;
			justify-content: center;
			display: flex;
			align-items: center;
			font-size: 70rpx;
			color: #000000;
			
			.text{
				font-size: 25rpx;
				color: #000000;
				justify-content: center;
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
			}
			.score-text{
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 70rpx;
				color: #000000;
			}
		}
	}
	.error-info{
		margin-top: 20rpx;
		width: 700rpx;
		height: 8%;
		justify-content: center;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		font-size: 35rpx;
	}
	
	.timu{
		width: 700rpx;
		height: 45%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}
	
	.timu-info{
		margin-top: 30rpx;
		margin-left: 10rpx;
		width: 680rpx;
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		// position: fixed;
		// bottom: 0;
		.q-area{
			margin-top: 5rpx;
			width: 90rpx;
			height: 90rpx;
			margin-left: 5rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	.q-area{
		margin-top: 5rpx;
		width: 90rpx;
		height: 90rpx;
		margin-left: 5rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
	
</style>
