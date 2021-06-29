<template>
	<view class="ziyuan-box">
		<scroll-view scroll-y="true">
			<ziyuan-item v-for="(item,i) in ziyuanList" :key="item.id" :item="item" @click="showSettingActionSheet(item.id)">
			</ziyuan-item>
		</scroll-view>
		<u-action-sheet :list="settingActionSheetList" v-model="settingActionSheetShow" @click="clickSettings"
			@close="closeSettingActionSheet"></u-action-sheet>
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
				ziyuanList: [],
				settingActionSheetList: [{
					text: '删除'
				}],
				settingActionSheetShow: false,
				deleteZiyuanItemForm: {
					id: ""
				}
			}
		},
		methods: {
			async update() {
				var res = await this.$http({
					url:"/resource/searchResource",
					method:"get",
					data:{
						course_id :getApp().globalData.courseId,
						word: this.keyword
					}
				})
				this.ziyuanList = res.data.data.sourceList
			},
			search() {
				var keyword = this.keyword;
				uni.navigateTo({
					url: "/pages/comment/comment?keyword=" + keyword
				})
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
					update();
				}
			},
			closeSettingActionSheet() {
				this.deleteZiyuanItemForm.id = 0;
			},

		},
		onLoad(options) {
			var loginRes = this.checkLogin("/pages/ziyuan/ziyuan", 1);
			if (!loginRes) {
				return;
			}
			this.keyword = options.keyword
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
		height: 99%;
		width: 90%;
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
