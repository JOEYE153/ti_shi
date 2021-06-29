<template>
	<view class="ziyuan-box">
		<view class="search-box">
			<u-search placeholder="输入关键词" v-model="keyword" @search="search" @custom="search"></u-search>
		</view>
		<scroll-view scroll-y="true">
			<ziyuan-item v-for="(item,i) in ziyuanList" :key="item.id" :item="item" @click="showSettingActionSheet(item.id)">
			</ziyuan-item>

		</scroll-view>
		<view class="ziyuan-add-box">
			<view class="ziyuan-add-button" @click="showAddZiyuanItemPopUp">
				<uni-icons type="plusempty" size="35" color="#fff"></uni-icons>
			</view>
		</view>
		<u-action-sheet :list="settingActionSheetList" v-model="settingActionSheetShow" @click="clickSettings"
			@close="closeSettingActionSheet"></u-action-sheet>
		<u-popup v-model="addZiyuanPopUpShow" mode="bottom">
			<view class="popup-content">
				<u-form :model="addZiyuanForm" ref="addZiyuanForm">
					<u-form-item label="标题" prop="topic">
						<u-input v-model="addZiyuanForm.topic" :focus="false" />
					</u-form-item>
					<u-form-item label="描述" prop="description" label-position="top" label-width="150">
						<u-input v-model="addZiyuanForm.description" :focus="false" />
					</u-form-item>
					<u-form-item label="链接" prop="link">
						<u-input v-model="addZiyuanForm.link" :focus="false" />
					</u-form-item>

				</u-form>
				
				<u-button @click="submitAddZiyuanForm">提交</u-button>
			</view>

		</u-popup>
		<u-picker mode="time" v-model="calendarShow" @confirm="confirmDate" @cancel="cancelDate"></u-picker>

	</view>
</template>

<script>
	import ziyuanItem from "@/components/ziyuanItem.vue"
	export default {
		components: {
			ziyuanItem
		},
		data() {
			return {
				keyword: '',
				addZiyuanPopUpShow: false,

				ziyuanList: [],
				addZiyuanForm: {
					topic: "",
					description: "",
					link: ""
				},
				calendarShow: false,
				settingActionSheetList: [{
					text: '删除'
				}],
				settingActionSheetShow: false,
				deleteZiyuanItemForm: {
					id: ""
				},
				rules: {
					topic: [{
						required: true,
						message: '请输入标题',
						trigger: ['change', 'blur'],
					},
					{
						max: 14,
						message: '标题在15个字以内',
						trigger: ['change', 'blur']
					}],
					description: [{
						required: true,
						message: '请输入描述',
						trigger: ['change', 'blur'],
					},
					{
						max: 99,
						message: '标题在100个字以内',
						trigger: ['change', 'blur']
					}],
					link: [{
						required: true,
						message: '请输入链接',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		methods: {
			update() {
				this.$http({
					url: "/resource/getResource?course_id=" + getApp().globalData.courseId,
					success: (res) => {
						this.ziyuanList = res.data.data.sourceList
					}
				})
			},
			search() {
				var keyword = this.keyword;
				uni.navigateTo({
					url: "/pages/ziyuan/ziyuan2?keyword=" + keyword
				})
			},
			showAddZiyuanItemPopUp() {
				this.addZiyuanPopUpShow = true
				this.addZiyuanForm.topic = null
				this.addZiyuanForm.description = null
				this.addZiyuanForm.link = null
				this.$nextTick(function(){
					this.$refs.addZiyuanForm.setRules(this.rules);
				})
			
			
			},

			confirmDate(e) {
			
				this.addZiyuanForm.time = e.year + "-" + e.month + "-" + e.day
			},
			async submitAddZiyuanForm() {
				await this.$refs.addZiyuanForm.validate(valid => {
					if(!valid){
						uni.showToast({
							title: '请按要求填写表单',
							icon: "none"
						})
					}else{
						var res = this.$http({
							url:"/resource/postResource",
							method:"post",
							data:{
								course_id :getApp().globalData.courseId,
								topic: this.addZiyuanForm.topic,
								description: this.addZiyuanForm.description,
								link: this.addZiyuanForm.link
							}
						})
						uni.showToast({
							title: '请求添加成功，等待管理员审核',
							icon: "none"
						})
						this.addZiyuanPopUpShow = false
					}
				});
			},
			showSettingActionSheet(id) {
				this.deleteZiyuanItemForm.id = id;
				this.settingActionSheetShow = true
			},
			async clickSettings(index) {
				if (this.settingActionSheetList[index].text == "删除") {
					var res = await this.$http({
						url:"/resource/deleteResource",
						method:"post",
						data:{
							course_id :getApp().globalData.courseId,
							id: this.deleteZiyuanItemForm.id
						}
					})
					uni.showToast({
						title: '删除成功',
						icon: "none"
					})
					this.update();
				}
			},
			closeSettingActionSheet() {
				this.deleteZiyuanItemForm.id = 0;
			},

		},
		onLoad() {
			var loginRes = this.checkLogin("/pages/ziyuan/ziyuan", 1);
			if (!loginRes) {
				return;
			}
			this.update();
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.ziyuan-box {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	scroll-view {
		padding-top: 50rpx;
		height: 80%;
		width: 90%;
	}

	.search-box {
		padding-top: 30rpx;
		width: 90%;
		height: 5%;

		
	}

	.ziyuan-add-box {
		width: 90%;
		height: 15%;
		display: flex;
		justify-content: center;
		align-items: center;

		.ziyuan-add-button {
			width: 100rpx;
			height: 100rpx;
			background-color: $theme-purple-color;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

		}

	}



	.popup-content {
		margin: 30rpx;
	}
</style>
