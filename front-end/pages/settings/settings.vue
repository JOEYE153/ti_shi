<template>
	<view class="wrap">
		<view class="u-avatar-wrap">
			<image class="u-avatar-demo" :src="userinfo.avatar" mode="aspectFill"></image>
		</view>
		<u-form :model="userinfo" ref="userInfoForm">
				<u-form-item label="姓名" label-width="150"><u-input v-model="userinfo.username" /></u-form-item>
				<!-- #ifdef H5 || APP-PLUS -->
				<u-form-item label="密码" label-width="150"><u-input v-model="userinfo.password" type = "password" /></u-form-item>
				<u-form-item label="确认密码" label-width="150"><u-input v-model="password" type = "password" /></u-form-item>
				
				<!-- #endif -->
				<u-form-item label="性别" label-width="150"><u-input v-model="userinfo.sex" type="select"  @click="sexSelectShow = true"/></u-form-item>
				<u-form-item label="生日" label-width="150"><u-input v-model="userinfo.birthday" type="select"  @click="calendarShow = true"/></u-form-item>
				<u-form-item label="年级" label-width="150"><u-input v-model="userinfo.grade" /></u-form-item>
				<u-form-item label="专业" label-width="150"><u-input v-model="userinfo.profession" /></u-form-item>
				<u-form-item label="学校" label-width="150"><u-input v-model="userinfo.school" /></u-form-item>
				<u-button @click="submit">提交</u-button>
		</u-form>		
		<u-action-sheet :list="actionSheetList" v-model="sexSelectShow" @click="actionSheetCallback"></u-action-sheet>
		<u-calendar v-model="calendarShow" mode="date" @change="getBirthday"></u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:"",
				userinfo:{
					avatar:"",
					username:"",
					sex:"",
					birthday:"",
					grade:"",
					profession:"",
					school:"",
					password:""
				},
				sexSelectShow: false,
				calendarShow:false,
				actionSheetList: [
					{
						text: '男'
					},
					{
						text: '女'
					}
				]
			}
		},
		async onLoad(){
			var res = await this.$http({
				url:"/user/profile"
			})
			this.userinfo= res.data.data
			this.userinfo.username = this.userinfo.username == null || this.userinfo.username == "null" ? "" : this.userinfo.username;
			this.userinfo.birthday = this.userinfo.birthday == null || this.userinfo.birthday == "null"? "" : this.userinfo.birthday;
			
			this.userinfo.sex = this.userinfo.sex == null || this.userinfo.sex == "null"? "" : this.userinfo.sex;
		
			if(this.userinfo.sex == 1){
				this.userinfo.sex = "男"
			}else if(this.userinfo.sex ===0 ){
				this.userinfo.sex = "女"
			}
			
			this.userinfo.grade = this.userinfo.grade == null || this.userinfo.grade == "null" ? "" : this.userinfo.grade;
			this.userinfo.profession = this.userinfo.profession == null || this.userinfo.profession == "null"? "" : this.userinfo.profession
			this.userinfo.avatar = this.userinfo.birthday == null || this.userinfo.birthday == "null"? "" : this.userinfo.avatar
			this.userinfo.school = this.userinfo.school == null ||this.userinfo.school == "null"? "" : this.userinfo.school;
			this.userinfo.password = "";
			this.password = "";
		
		},
		methods: {
			
			actionSheetCallback(index) {
				this.userinfo.sex = this.actionSheetList[index].text;
			},
			getBirthday(e){
				this.userinfo.birthday = e.result
			},
			async submit(){
				if(this.userinfo.password != ""){
					if(this.userinfo.password != this.password){
						uni.showToast({
							title:"两次输入的密码不同",
							icon:"none"
						})
					}
				}
				console.log(this.userinfo)
				var res = await this.$http({
					url:"/user/modify",
					method:"put",
					data:this.userinfo
				})
				uni.switchTab({
					url:"/pages/user/user"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}

	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}

	.u-avatar-demo {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
</style>