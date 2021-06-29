<template>
	<view class="notice-box">
		<view class="segment-control-box">
			<uni-segmente-control :values="menuList" styleType="text" activeColor="#7468BE" activeTextColor="#000"
				@clickItem="changeMode">
			</uni-segmente-control>
		</view>
		<view class="notice-switch">
			{{kaoQiTiXing}}
			
			<u-switch v-model="canNoticeKaoqi" @change="changeCanNoticeKaoqi"></u-switch>
			<view class="line-v"></view>
			{{qiTaTixing}}
			
			<u-switch v-model="canNoticeQita" @change= "changeCanNoticeQita"></u-switch>
		</view>
		
		<u-section title="未读" :right="false"></u-section>
		
		<view class="swipe-action-box" v-for="(item, index) in weiduList" :key="item.message_id">
			<u-swipe-action :show ="item.show" :index="item.index" @click="click" @open="open" :options="options1" btn-width="150">
				<view class="notice-item"  @click="gotoDetail(item)">
					<view class="notice-item-left">
						<u-icon name="email-fill" color="#fff" size="70"></u-icon>
					</view>
					<view class="notice-item-right">
						<view class="notice-item-sender">
							{{item.sender_name}} 发送了一条消息给你
						</view>
						<view class="notice-item-content">
							
								{{item.description}}
							
						</view>
						<view class="notice-item-date">
							{{item.time}}
						</view>
					</view>

				</view>
			</u-swipe-action>
		</view>
		<u-divider v-if="weiduList.length ==0">没有更多了</u-divider>
		<u-section title="已读" :right="false"></u-section>
		<view class="swipe-action-box" v-for="(item, index) in yiduList" :key="item.message_id">
			<u-swipe-action  :show ="item.show"  :index="item.index" @click="click" @open="open" :options="options0"  btn-width="150">
				<view class="notice-item"  @click="gotoDetail(item)">
					<view class="notice-item-left-yidu">
						<u-icon name="email-fill" color="#fff" size="70"></u-icon>
					</view>
					<view class="notice-item-right">
						<view class="notice-item-sender">
							{{item.sender_name}} 发送了一条消息给你
						</view>
						<view class="notice-item-content">
					
							{{item.description}}
						
						</view>
						<view class="notice-item-date">
							{{item.time}}
						</view>
					</view>
		
				</view>
			</u-swipe-action>
		</view>
		<u-divider v-if="yiduList.length ==0">没有更多了</u-divider>
	</view>
</template>

<script>
	import uniSegmenteControl from "@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"

	export default {
		components: {
			uniSegmenteControl,

		},
		data() {
			return {
				menuList: ["用户消息", "系统消息"],
				noticeList: [],
				options0: [
					
					
					{
						text: '标记未读',
						style: {
							backgroundColor: '#ff9900',
						
							
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d',
							
						}
					}
				],
				options1: [
				
					{
						text: '标记已读',
						style: {
							backgroundColor: '#ff9900',
						
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d',
						
						}
					}
				],
				mode: 0,
				canNoticeKaoqi:false,
				canNoticeQita:false
			};
		},
		methods: {
			async click(index, index1) {
				var item = this.noticeList[index]
				if (index1 == 0) {
						
					await this.changeStatus(item)
				} else if(index1 == 1) {
					await this.delteNotice(item)
						
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
			
				this.noticeList[index].show = true;
				
				this.noticeList.map((val, idx) => {
					if (index != idx) this.noticeList[idx].show = false;
				})
			
				this.$forceUpdate();
			},
			//跳转
			gotoDetail(item){
				
				if(item.status == 1){
					this.changeStatus(item)
				}
				uni.navigateTo({
					url:item.url
				})
				
			},
			//改变模式
			async changeMode(e) {
				this.mode = e.currentIndex

				await this.getNoticeList()
			},
			//修改已读未读
			async changeStatus(item){
			
				var status = item.status ;
				var res ;
				var url ;
				var sendstatus =status ==1?0:1;
				
				if(this.mode == 0){
					url = "/message/setPersonal"
				}else{
					url = "/message/setOfficial"
				}
				
					
				res = await this.$http({
					url: url,
					method:"post",
					data:{
						message_id:item.message_id,
						status:sendstatus
					}
				})
				
				res =res.data
				if(res.code != 1){
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
					return;
				}
				
				item.status = item.status == 0?1:0
				item.show =false;
				
			},
			//获取通知列表
			async getNoticeList(){
				if(this.mode == 0){
					var res = await this.$http({
						url: '/message/getPersonal'
					})
					res = res.data
					this.noticeList = res.data.message;
					this.noticeList.map((item,i) =>{
						item.show = false;
						item.index = i
					})
				}else if(this.mode == 1){
					var res = await this.$http({
						url: '/message/getOfficial'
					})
					res = res.data
					this.noticeList = res.data.message;
					this.noticeList.map((item,i) =>{
						item.show = false;
						item.index = i;
					})
				}
			},
			// 删除某一项
			async delteNotice(item){
				var url;
				if(this.mode == 0){
					url = "/message/deletePersonal"
				}else {
					url = "/message/deleteOfficial"
				}
				var res = await this.$http({
					url:url,
					method:"post",
					data:{
						message_id:item.message_id
					}
				})
				res =res.data;
				if(res.code != 1){
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
					return
				}
				
				this.noticeList.splice(item.index, 1);
				this.$forceUpdate()
			}
			,
			// 获取通知状态
			async getCanNoticeKaoqi(){
				var res = await this.$http({
					url:"/message/getCalendar",
				})
				res =res.data;
				this.canNoticeKaoqi = res.data.status == 1;
			},
			async getCanNoticeQita(){
				var res = await this.$http({
					url:"/message/getOther",
				})
				res =res.data;
				this.canNoticeQita = res.data.status == 1;
			},
			//修改通知状态
			async changeCanNoticeKaoqi(value){
				var res = await this.$http({
					url:"/message/setCalendar",
					method:"post",
					data:{
						status:this.canNoticeKaoqi?1:0
					}
				})
				res =res.data;
				if(res.code !== 1){
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
					this.canNoticeKaoqi = !this.canNoticeKaoqi;
					return;
				}
			},
			async changeCanNoticeQita(value){
				var res = await this.$http({
					url:"/message/setOther",
					method:"post",
					data:{
						status:this.canNoticeQita?1:0
					}
				})
				res =res.data;
				if(res.code !== 1){
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
					this.canNoticeQita = !this.canNoticeQita;
					return;
				}
			}
		},
		async onLoad() {
			var loginRes = this.checkLogin("/pages/shoucang/shoucang", 1);
			if (!loginRes) {
				return;
			}
			
		}
		,
		async onShow(){
			this.getNoticeList()
			this.getCanNoticeKaoqi();
			this.getCanNoticeQita();
		},
		computed:{
			yiduList(){
				return this.noticeList.filter((item,i)=>{
					
					
					return item.status == 0
				})
			},
			weiduList(){
				return this.noticeList.filter((item,i)=>{
				
					return item.status == 1
				})
			},
			kaoQiTiXing(){
				return this.canNoticeKaoqi ? "考期提醒已开启":"考期提醒已关闭"
			},
			qiTaTixing(){
				return this.canNoticeQita ? "其他提醒已开启":"其他提醒已关闭"
			}
		}

	};
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.swipe-action-box {
		margin: 10rpx 0;
	}
	.notice-switch{
		width: 100%;
		height:80rpx;
		display: flex;
		justify-content: space-evenly;
		align-items:  center;
		font-size: 20rpx;
		color: $u-content-color;
	}
	.segment-control-box {
		width: 100%;
		height: 100rpx;
		font-size: 50rpx;
		box-shadow: 10rpx 10rpx 10rpx 10rpx #efefef;
		margin-bottom: 30rpx;
	}
	.line-v{
		width: 4rpx;
		background-color: $u-bg-color;
		height: 100%;
	}
	.notice-box {
		width: 100%;

		.notice-item {

			width: 100%;
			border: 1px solid $u-border-color;
			padding: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.notice-item-left {
				background-color: #FF976A;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.notice-item-left-yidu{
				background-color:$u-type-info ;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.notice-item-right {

				width: 600rpx;

				.notice-item-sender {
					padding: 10rpx;
					width: 100%;
					color: $u-main-color;
					font-size: 30rpx;
					display: flex;
					justify-content: flex-start;
				}

				.notice-item-content {
					width: 100%;
					

					height: 35rpx;
					line-height: 35rpx;
					color: $u-tips-color;
					font-size: 28rpx;
					
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				
				}

				.notice-item-date {
					width: 100%;
					display: flex;
					justify-content: flex-end;
					font-size: 20rpx;
					color: $u-light-color;
				}
			}

		}

	}
</style>
