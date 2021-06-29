<template>
	<view class="rili-box">


		<scroll-view scroll-y="true">
			<rili-item :item="helpItem" @click="tepan" @edit="tepan2"></rili-item>
			<rili-item v-for="(item,i) in riliList" :item="item" :key="item.id" :isLast="i == riliList.length-1 "
				@click="showSettingActionSheet(item.id)" @edit="showEditRiliPopUp(item)"></rili-item>

		</scroll-view>

		<view class="rili-add-box">
			<view class="rili-add-button" @click="showAddRiliItemPopUp">
				<uni-icons type="plusempty" size="35" color="#fff"></uni-icons>
			</view>
		</view>
		<u-action-sheet :list="settingActionSheetList" v-model="settingActionSheetShow" @click="clickSettings"
			@close="closeSettingActionSheet"></u-action-sheet>

		<u-popup v-model="addRiliItemPopUpShow" mode="bottom" width="500rpx" height="800rpx" border-radius="14"
			@close="closeAddRiliItemPopUp">
			<view class="addRiliItemFormClass">
				<u-form :model="addRiliItemForm" ref="addRiliItemForm">

					<u-form-item label="课程" prop="title">
						<u-input v-model="addRiliItemForm.title" />
					</u-form-item>

					<u-form-item label="日期" prop="date">
						<u-input v-model="addRiliItemForm.date" type="select" @click="calendarShow = true" />
					</u-form-item>

					<u-form-item label="内容" prop="content">
						<u-input v-model="addRiliItemForm.content" type="textarea" auto-height :height="300"
							:custom-style="textarea_style" :focus="false" />
					</u-form-item>
				</u-form>
				<u-button @click="submitAddRiliItemForm">提交</u-button>
			</view>
		</u-popup>

		<u-popup v-model="editRiliItemPopUpShow" mode="bottom" width="500rpx" height="800rpx" border-radius="14">
			<view class="addRiliItemFormClass">
				<u-form :model="editRiliItemForm" ref="editRiliItemForm">

					<u-form-item label="课程" prop="title">
						<u-input v-model="editRiliItemForm.title" />
					</u-form-item>

					<u-form-item label="日期" prop="date">
						<u-input v-model="editRiliItemForm.date" type="select" @click="calendarShow = true" />
					</u-form-item>

					<u-form-item label="内容" prop="content">
						<u-input v-model="editRiliItemForm.content" type="textarea" auto-height :height="300"
							:custom-style="textarea_style" :focus="false" />
					</u-form-item>
				</u-form>
				<u-button @click="submiteditRiliItemForm">提交</u-button>
			</view>
		</u-popup>

		<u-select v-model="courseListShow" :list="courseList" @confirm="confirmCourse"></u-select>
		<u-picker mode="time" v-model="calendarShow" @confirm="confirmDate"></u-picker>

	</view>
</template>

<script>
	import riliItem from '@/components/riliItem.vue';
	import uniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"

	export default {
		components: {
			riliItem,
			uniIcons
		},
		data() {
			return {
				helpItem: {
					id: "0",
					date: "1970年1月1日",
					title: "日历使用说明",
					content: "欢迎使用考期日历~\n您可以按照自己的考期安排，自由设置考期日历。\n例如点击页面下方加号按钮，添加新的考期日历；点击卡片左下方修改日历内容；点击卡片右下方删除考期日历。\n祝您考试顺利~\n小知识：1970年1月1日为UNIX TIME的纪元时间。",
					finish: true
				},
				riliList: [],
				settingActionSheetShow: false,
				settingActionSheetList: [{
					text: '删除'
				}],
				deleteRiliItemForm: {
					id: ""
				},
				addRiliItemForm: {
					date: "",
					title: "",
					courseId: "",
					content: ""
				},
				editRiliItemForm: {
					date: "",
					title: "",
					courseId: "",
					content: ""
				},
				addRiliItemPopUpShow: false,
				editRiliItemPopUpShow: false,
				courseList: [],
				courseListShow: false,
				calendarShow: false,
				editRiliId:0,
				textarea_style: {
					height: '300rpx',
					backgroundColor: '#f7f7f7',
					lineHeight: ' 60rpx',
					margin: '20rpx',
					padding: '20rpx',
				},
				rules: {
					title: [{
						required: true,
						message: '请选择科目',
						trigger: ['change', 'blur'],
					},
					{
						max: 15,
						message: '课程描述不能超过15个字符',
						trigger: ['change', 'blur'],
					}
					],
					content: [{
						required: true,
						message: '请输入内容',
						trigger: ['change', 'blur'],
					},
					{
						max: 150,
						message: '日历描述不能超过150个字符',
						trigger: ['change', 'blur'],
					}
					],
					date: [{
						required: true,
						message: '请选择日期',
						trigger: ['change', 'blur'],
					}]
				}
			}
		},
		methods: {
			tepan(){
				uni.showToast({
					title:'示例考期日历不支持删除，请您新建一个尝试',
					icon:"none"
				})
			},
			tepan2(){
				uni.showToast({
					title:'示例考期日历不支持编辑，请您新建一个尝试',
					icon:"none"
				})
			},
			submitAddRiliItemForm() {
				this.$refs.addRiliItemForm.validate(async valid => {
					if (!valid) {
						uni.showToast({
							title: '请按要求填写表单',
							icon: "none"
						})
					} else {
						var res = await this.$http({
							url: "/calendar",
							method: "post",
							data: {
								title: this.addRiliItemForm.title,
								date: this.addRiliItemForm.date,
								content: this.addRiliItemForm.content
							}
						})
						this.update();
						uni.showToast({
							title: '添加成功',
							icon: "none"
						})
						this.addRiliItemPopUpShow = false
						this.$refs["addRiliItemForm"].resetFields()
					}
				});
			},
			submiteditRiliItemForm() {
				this.$refs.editRiliItemForm.validate(async valid => {
					if (!valid) {
						uni.showToast({
							title: '请按要求填写表单',
							icon: "none"
						})
					} else {
						var res =await  this.$http({
							url: "/calendar",
							method: "put",
							data: {
								calendar_id: this.editRiliId,
								date: this.editRiliItemForm.date,
								title: this.editRiliItemForm.title,
								content: this.editRiliItemForm.content
							}
						})
						this.update();
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
						this.editRiliItemPopUpShow = false
					}
				});
				this.$refs["editRiliItemForm"].resetFields()
			},
			closeAddRiliItemPopUp() {
				this.addRiliItemForm.courseId = ""
				this.addRiliItemForm.date = ""
				this.addRiliItemForm.title = ""
				this.addRiliItemForm.content = ""
				this.$refs["addRiliItemForm"].resetFields()
			},
			confirmDate(e) {
				this.addRiliItemForm.date = e.year + "-" + e.month + "-" + e.day
				this.editRiliItemForm.date = e.year + "-" + e.month + "-" + e.day
			},
			confirmCourse(e) {
				this.addRiliItemForm.title = e[0].label;
				this.addRiliItemForm.courseId = e[0].value;
				this.editRiliItemForm.title = e[0].label;
				this.editRiliItemForm.courseId = e[0].value;
			},
			showAddRiliItemPopUp() {
				this.addRiliItemPopUpShow = true;
				this.$nextTick(function() {
					this.$refs.addRiliItemForm.setRules(this.rules);
				})
				this.$refs["addRiliItemForm"].resetFields()
			},
			showEditRiliPopUp(e) {
				this.editRiliItemPopUpShow = true
				this.editRiliId = e.id
				this.editRiliItemForm.title = e.title
				this.editRiliItemForm.date = e.date
				this.editRiliItemForm.courseId = e.courseId
				this.editRiliItemForm.content = e.content
				this.$nextTick(function() {
					this.$refs.editRiliItemForm.setRules(this.rules);
				})
				this.$refs["editRiliItemForm"].resetFields()
			},
			showSettingActionSheet(id) {
				this.deleteRiliItemForm.id = id;
				this.settingActionSheetShow = true
			},
			closeSettingActionSheet() {
				this.deleteRiliItemForm.id = 0;
			},
			async clickSettings(index) {
				if (this.settingActionSheetList[index].text == "删除") {
					var res = await this.$http({
						url:"/calendar",
						method:"delete",
						data:{
							id: this.deleteRiliItemForm.id
						}
					})
					uni.showToast({
						title: '删除成功',
						icon: "none"
					})
					this.update();
					this.editRiliItemPopUpShow = false
				}
			},
			getDate(e) {
				this.userinfo.birthday = e.result
			},
			async update() {
				var res = await this.$http({
					url: "/calendar",
					method: "get",
				})
				this.riliList = res.data.data.riliList
			}
		},
		async onLoad() {
			var loginRes = this.checkLogin("/pages/rili/rili", 1);
			if (!loginRes) {
				return;
			}
			var res = await this.$http({
				url: "/course/info",
				method: "get",
			})
			this.courseList = res.data.data.courseList
			this.update()
		},
		async onShow(){
			this.update()
		},
		onBackPress(event) {
			if (this.addRiliItemPopUpShow) {
				this.addRiliItemPopUpShow = false;
				return;
			}
			if (this.settingActionSheetShow) {
				this.settingActionSheetShow = false;
				return;
			}
		},
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.addRiliItemFormClass {
		margin: 30rpx;
	}

	.rili-box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.rili-text {
			width: 90%;
			height: 10%;

			margin-top: 50rpx;
			color: $theme-purple-color;
			font-size: 80rpx;
			font-weight: bold;
		}

		scroll-view {
			padding-top: 50rpx;
			height: 85%;
			width: 90%;
		}

		.rili-add-box {
			width: 90%;
			height: 15%;
			display: flex;
			justify-content: center;
			align-items: center;

			.rili-add-button {
				width: 100rpx;
				height: 100rpx;
				background-color: $theme-purple-color;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

			}
		}


	}
</style>
