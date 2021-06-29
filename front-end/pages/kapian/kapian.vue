<template>
	<view class="kapian-box">
		<view class="search-box">
			<u-search placeholder="输入关键词" v-model="keyword" @clear="update" @search="search" @custom="search">
			</u-search>
		</view>
		<swiper :indicator-dots="false" :autoplay="false" previous-margin="50rpx" next-margin="50rpx">
			<!-- 			<swiper-item>
				<view class="swiper-item">
					<kapian-item :item="shuomingItem" @click="tepan1" @deleteKapian="tepan2" @edit="tepan3" :bgColor="shuomingItem.colorId"></kapian-item>
				</view>
			</swiper-item> -->
			<swiper-item v-for="(item,i) in kapianList" :key="item.id">
				<view class="swiper-item">
					<kapian-item :item="item" @click="showSettingPopUp(item.id)" :bgColor="item.colorId"
						@deleteKapian="deleteKapian(item.id)" @edit="showEditKapianPopUp(item)"></kapian-item>
				</view>
			</swiper-item>
		</swiper>

		<view class="kapian-add-button-box">
			<view class="kapian-add-button">
				<uni-icons type="plusempty" size="30" color="#fff" @click="showAddKapianPopUp"></uni-icons>
			</view>
		</view>

		<u-popup v-model="settingPopUpShow" mode="bottom" width="500rpx" height="500rpx">
			<view class="color-list-box">

				<view class="color-item-box" v-for="(item,i) in colorList" :key="item.id" @click="checked(i)"
					:class="colorIndex == i?'color-item-box-checked':''">
					<view class="color-item" :style="{backgroundColor:item}">
					</view>
				</view>
			</view>
			<u-button @click="switchColor">切换</u-button>
		</u-popup>

		<u-popup v-model="addKapianPopUpShow" mode="bottom" width="500rpx" height="700rpx" @close="closeAddKapianPopUp">
			<view class="addKapianFormClass">
				<u-form :model="addKapianForm" ref="addKapianForm">

					<u-form-item label="标题" prop="title">
						<u-input v-model="addKapianForm.title" type="input" :focus="false" />
					</u-form-item>

					<u-form-item label="内容" prop="content">
						<u-input v-model="addKapianForm.content" type="textarea" :auto-height="true" :height="300"
							:custom-style="textarea_style" :focus="false" />
					</u-form-item>
				</u-form>
				<u-button @click="submitAddKapianForm">提交</u-button>
			</view>
		</u-popup>


		<u-popup v-model="editKapianPopUpShow" mode="bottom" width="500rpx" height="700rpx"
			@close="closeEditKapianPopUp">
			<view class="editKapianFormClass">
				<u-form :model="editKapianForm" ref="editKapianForm">

					<u-form-item label="标题" prop="title">
						<u-input v-model="editKapianForm.title" type="input" :focus="false" />
					</u-form-item>

					<u-form-item label="内容" prop="content">
						<u-input v-model="editKapianForm.content" type="textarea" :auto-height="true" :height="300"
							:custom-style="textarea_style" :focus="false" />
					</u-form-item>
				</u-form>
				<u-button @click="submitEditKapianForm">提交</u-button>
			</view>
		</u-popup>
		<u-modal v-model="isSureShow" @confirm="confirmSub(deleteId)" :show-cancel-button="true" :mask-close-able="true"
			confirm-text="没爱了" cancel-text="留着吧">
			<view class="slot-content">
				<text>您真的要删除我？</text>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import kapianItem from "../../components/kapianItem.vue"
	export default {
		components: {
			kapianItem
		},
		data() {
			return {
				shuomingItem: {
					id: 0,
					title: '知识卡片帮助',
					content: 'wuhhhh',
					colorId: 1
				},
				kapianList: [],

				settingPopUpShow: false,
				deleteId: 0,
				colorList: [
					"#2979ff", "#2b85e4", "#68CEF3",
					"#fa3534", "#dd6161", "#fab6b6",
					"#ff9900", "#f29100", "#fcbd71",
					"#19be6b", "#18b566", "#71d5a1",
					"#909399", "#82848a", "#c8c9cc",
					"#9932CC", "	#9400D3", "#BA55D3"
				],
				colorIndex: -1,
				addKapianPopUpShow: false,
				isSureShow: false,
				addKapianForm: {
					title: "",
					content: ""
				},
				keyword: '',
				textarea_style: {
					height: '300rpx',
					backgroundColor: '#f7f7f7',
					lineHeight: ' 60rpx',
					margin: '20rpx',
					padding: '20rpx',
				},
				editKapianPopUpShow: false,
				editKapianId: 0,
				editKapianForm: {
					title: "",
					content: ""
				},
				rules: {
					title: [{
							required: true,
							message: '请输入标题',
							trigger: ['change', 'blur'],
						},
						{
							max: 20,
							message: '标题描述不能超过15个字符',
							trigger: ['change', 'blur'],
						}
					],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		methods: {
			showSettingPopUp(id) {
				this.settingPopUpShow = true
				this.editKapianId = id
			},
			checked(index) {
				this.colorIndex = index;
			},
			async switchColor() {
				var res = await this.$http({
					url: "/card/change_color",
					method: "put",
					data: {
						id: this.editKapianId,
						color_value: this.colorList[this.colorIndex]
					}
				})
				if (res.data.code == 0) {
					uni.showToast({
						title: '默认知识卡片不支持修改颜色，请您新建一个尝试',
						icon: "none"
					})
				} else {
					uni.showToast({
						title: '更换颜色成功',
						icon: "none"
					})
				}
				
				this.update()
			},
			deleteKapian(id) {
				this.isSureShow = true
				this.deleteId = id
			},
			async confirmSub(id) {
				var res = await this.$http({
					url: "/card",
					method: "delete",
					data: {
						id: id,
					}
				})
				if (res.data.code == 0) {
					uni.showToast({
						title: '默认知识卡片不支持删除，请您新建一个尝试',
						icon: "none"
					})
				} else {
					uni.showToast({
						title: '删除成功',
						icon: "none"
					})
				}
				this.update()
			},
			showAddKapianPopUp() {
				this.addKapianPopUpShow = true;
				this.$nextTick(function() {
					this.$refs.addKapianForm.setRules(this.rules);
				})
			},
			closeAddKapianPopUp() {
				this.addKapianForm.title = "";
				this.addKapianForm.content = "";
				this.$refs["addKapianForm"].resetFields()
			},
			showEditKapianPopUp(e) {

				this.editKapianPopUpShow = true;
				this.editKapianForm.title = e.title;
				this.editKapianForm.content = e.content;
				this.editKapianId = e.id
				this.$nextTick(function() {
					this.$refs.editKapianForm.setRules(this.rules);
				})
			},
			closeEditKapianPopUp() {
				this.$refs["editKapianForm"].resetFields()
			},

			submitEditKapianForm() {
				this.$refs.editKapianForm.validate(async valid => {

					if (!valid) {
						uni.showToast({
							title: '请按要求填写表单',
							icon: "none"
						})
					} else {
						var res = await this.$http({
							url: "/card",
							method: "put",
							data: {
								id: this.editKapianId,
								title: this.editKapianForm.title,
								content: this.editKapianForm.content
							}
						})
						if (res.data.code == 0) {
							uni.showToast({
								title: '默认知识卡片不支持修改，请您新建一个尝试',
								icon: "none"
							})
						} else {
							uni.showToast({
								title: '修改成功',
								icon: "none"
							})
						}
						this.$refs["editKapianForm"].resetFields()
						this.editKapianPopUpShow = false
						await this.update();
					}

				});

			},
			submitAddKapianForm() {
				this.$refs.addKapianForm.validate(async valid => {
					if (!valid) {
						uni.showToast({
							title: '请按要求填写表单',
							icon: "none"
						})
					} else {
						var res = await  this.$http({
							url: "/card",
							method: "post",
							data: {
								course_id: getApp().globalData.courseId,
								title: this.addKapianForm.title,
								content: this.addKapianForm.content
							}
						})
						uni.showToast({
							title: '添加成功',
							icon: "none"
						})
						this.$refs["addKapianForm"].resetFields()
						this.addKapianPopUpShow = false;
						await this.update();
					}

				});

			},
			async update() {
				var res = await this.$http({
					url: "/card",
					method: "get",
					data: {
						course_id: getApp().globalData.courseId,
					}
				})
				this.kapianList = res.data.data.kapianList
			},
			async search() {
				var keyword = this.keyword;
				var res = await this.$http({
					url: "/card/search",
					method: "get",
					data: {
						course_id: getApp().globalData.courseId,
						keyword: keyword
					}
				})
				this.kapianList = res.data.data.kapianList
			}
		},

		async onLoad() {
			var loginRes = this.checkLogin("/pages/kapian/kapian", 1);
			if (!loginRes) {
				return;
			}

			this.update()

		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;

	}

	.addKapianFormClass {
		margin: 30rpx;
	}

	.editKapianFormClass {
		margin: 30rpx;
	}

	.kapian-box {
		width: 100%;
		height: 100%;

		.search-box {
			padding-top: 30rpx;
			margin: 0 auto;
			width: 90%;
			height: 5%;

			
		}

		swiper {
			width: 100%;
			height: 85%;

			swiper-item {
				display: flex;
				justify-content: center;
				align-items: center;


				.swiper-item {
					width: 90%;
					height: 90%;
					background-color: #68CEF3;
					box-shadow: 10rpx 10rpx 10rpx 10rpx #C0C0C0;
					border-radius: 30rpx;


				}
			}


		}


		.kapian-add-button-box {
			width: 100%;
			height: 10%;
			display: flex;
			justify-content: center;
			align-items: center;

			.kapian-add-button {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: $theme-purple-color;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

	}

	.color-list-box {
		width: 750rpx;
		height: 400rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		padding: 10rpx;

		.color-item-box {
			width: 120rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.color-item {
				width: 90%;
				height: 90%;
			}
		}

		.color-item-box-checked {
			border: 1px solid #909399;
		}
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
</style>
