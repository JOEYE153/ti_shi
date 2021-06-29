<template>
	<view class="wenda-detail-box">
		<view class="wenda-detail-topic">
			<wenda-detail-topic @settingClick="showTopicActionSheet" :item="postDetail"></wenda-detail-topic>
		</view>

		<view class="close-button-box">
			<u-button shape="square" v-if="postDetail.have_permission_edit_post == 1"
				:custom-style="{color:'white',backgroundColor:'#7468BE',margin:'10rpx 0'}" @click="changePostStatus">
				{{postDetail.cur_status == 0?'CLOSE':'OPEN'}}
			</u-button>
			<u-button shape="square" :custom-style="{color:'white',backgroundColor:'#7468BE',margin:'10rpx 0'}"
				@click="showAddCommentPopUp">回答</u-button>
		</view>

		<u-section :title="sectionText" :right="false" line-color="#7468BE"></u-section>

		<view class="wenda-detail-comment">
			<wenda-detail-comment v-for="(item,i) in post_comment_list" :key="item.post_comment_id" :item="item"
				@settingClick="showCommentActionSheet" @likeClick="likeClick"></wenda-detail-comment>
		</view>
		<u-divider bg-color="#f3f4f6">没有更多了</u-divider>
		<u-popup v-model="addCommentPopUpShow" mode="bottom" length="800" @close="closeAddCommentPopUp">
			<view class="popUpBox">
				<u-form :model="addCommentForm" ref="addCommentForm">
					<u-form-item  prop="content" label-position="top">
						<ls-editor v-model="addCommentForm.content" ref="addCommentPopUpEditor"></ls-editor>
					</u-form-item>

				</u-form>

				<u-button shape="square" @click="submitAddCommentForm">提交</u-button>
			</view>
		</u-popup>


		<u-popup v-model="editCommentPopUpShow" mode="bottom" length="800" @close="closeEditCommentPopUp">
			<view class="popUpBox">
				<u-form :model="editCommentForm" ref="editCommentForm">
					<u-form-item  prop="content" label-position="top">
						<ls-editor v-model="editCommentForm.content" ref="editCommentPopUpEditor"></ls-editor>
					</u-form-item>

				</u-form>

				<u-button shape="square" @click="submitEditCommentForm">提交</u-button>
			</view>
		</u-popup>


		<u-popup v-model="editPostPopUpShow" mode="bottom" length="1100" @close="closeEditPostPopUp">
			<view class="popUpBox">
				<u-form :model="editPostForm" ref="editPostForm">
					<u-form-item label="标题" prop="title">
						<u-input v-model="editPostForm.title" :focus="false" />
					</u-form-item>
					<u-form-item label="类型" prop="type">
						<u-input v-model="editPostForm.type" type="select" :focus="false" @click="showWendaTypeSelect" />
					</u-form-item>
					<u-form-item label="内容" prop="content" label-position="top">
						<ls-editor v-model="editPostForm.content" ref="editPostEditor"></ls-editor>
					</u-form-item>

				</u-form>

				<u-button shape="square" @click="submitEditPostForm">提交</u-button>
			</view>
		</u-popup>
		<u-action-sheet :list="topicActionSheetList" v-model="topicActionSheetShow" @click="topicActionSheetClick">
		</u-action-sheet>

		<u-action-sheet :list="comentActionSheetList" v-model="commentActionSheetShow" @click="commentActionSheetClick">
		</u-action-sheet>
		<u-select v-model="wendaTypeSelectShow" :list="wendaTypeList" @confirm="confirmSelect"></u-select>
		
		<u-popup v-model="editJuBaoPopUpShow" mode="bottom" length="900" @close="closeJuBaoPopUp">
			<view class="popUpBox">
				<u-form :model="juBaoForm" ref="juBaoForm">
					
					<u-form-item label="举报内容" prop="reason" label-position="top">
						<u-input v-model="juBaoForm.reason"
						type="textarea" auto-height :height="600" :custom-style="textarea_style"
						:focus="false"/>
					</u-form-item>
		
				</u-form>
		
				<u-button shape="square" @click="submitJuBaoForm">提交</u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import wendaDetailTopic from "@/components/wendaDetailTopic.vue"
	import wendaDetailComment from "@/components/wendaDetailComment.vue"
	import lsEditor from "@/components/editor/editor.vue"
	export default {

		components: {
			wendaDetailTopic,
			wendaDetailComment,
			lsEditor
		},
		data() {
			return {
				textarea_style:{
					height: '300rpx',
					backgroundColor: '#f7f7f7',
					lineHeight:' 60rpx',
					margin: '20rpx',
					padding: '20rpx',
				},
				postDetail: {
					post_id:"",
					img_url:"",
					user_name:"",
					create_time:"",
					content:"",
					cur_status:0,
					post_type:0,
					post_title:""
				},
				post_id: 0,
				post_comment_list: [],
				addCommentPopUpShow: false,
				addCommentForm: {
					content: ""
				},
				editCommentPopUpShow: false,
				editCommentForm: {
					content: ""
				},
				editPostPopUpShow: false,
				editPostForm: {
					title: "",
					html: "",
					type: "",
					typeValue: 0,
				},
				topicActionSheetList: [{
					text: '删除',

				}, {
					text: '编辑'
				},{
					text: '举报'
				}
				],
				topicActionSheetShow: false,
				commentActionSheetShow: false,
				comentActionSheetList: [{
					text: '删除',

				}, {
					text: '编辑'
				}, {
					text: "标记为正确答案"
				},{
					text: '举报'
				}
				],
				comment: {

				},
				wendaTypeSelectShow: false,
				wendaTypeList: [{
						value: '0',
						label: '讨论'
					},
					{
						value: '1',
						label: '问题'
					}
				],
				juBaoForm:{
					itemId:"",
					reason:"",
					table_number:""
				},
				editJuBaoPopUpShow:false
			}
		},
		methods: {
			showWendaTypeSelect(){
				this.wendaTypeSelectShow=true
			},
			async getPost() {
					var res = await this.$http({
						url: "/posts/get_post_info?post_id=" + this.post_id,
						method: "GET"
					})
					res =res.data
					
					if(res.code != 1){
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						return
					}
					this.postDetail = res.data;
					this.post_comment_list = this.postDetail.post_comment_list;
					
				}

				,
			showAddCommentPopUp() {
				this.addCommentPopUpShow = true
			},
			closeAddCommentPopUp() {
				
				this.$refs["addCommentForm"].resetFields()
				this.$refs["addCommentPopUpEditor"].clear()
			},
			closeJuBaoPopUp(){
				this.juBaoForm.itemId = "";
				this.juBaoForm.reason = "";
				this.juBaoForm.table_number = "";
				this.$refs["juBaoForm"].resetFields()
				
			},
			async submitAddCommentForm() {
				if (this.addCommentForm.content === "") {
					uni.showToast({
						title: "内容不能为空",
						icon: "none"
					})
					return
				}
				var res = await this.$http({
					url: "/posts/post_comment_add",
					method: "POST",
					data: {
						post_id: this.post_id,
						content: this.addCommentForm.content
					}
				})

				if (res.data.code == 1) {
					uni.showToast({
						title: "提交成功",
						icon: "none"
					})
					this.addCommentPopUpShow = false;
				}
				await this.getPost()
			},
			showTopicActionSheet(e) {
				
				this.juBaoForm.itemId = e.post_id;
				this.juBaoForm.table_number = 3;
				this.topicActionSheetShow = true
			},
			async topicActionSheetClick(index) {

				if (index == 0) {
					
					//删除
					var res = await this.$http({
						url: "/posts/post_delete",
						method: "DELETE",
						data: {
							post_id: this.post_id

						}
					})
					res = res.data
					if (res.code != 1) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						this.topicActionSheetShow = false;
						return;
					}
					this.topicActionSheetShow = false;
					uni.navigateTo({
						url: "/pages/wenda/wenda"
					})

					return;
				} else if (index == 1) {
					// 编辑
					this.showEditPostPopUp()
				} else if(index == 2){
					// 举报
					var flag = await this.isJuBaoEd()
					if(flag){
						uni.showToast({
							icon:"none",
							title:"已被举报过,请勿重复举报"
						})
						return;
					}
					
					this.editJuBaoPopUpShow =  true;
				}
			},
			showCommentActionSheet(e) {
			
				this.juBaoForm.itemId = e.post_comment_id;
				this.juBaoForm.table_number = 4;
				this.comment = e;
				if (this.comment.is_right_answer == 1) {
					this.comentActionSheetList[2].text = "取消标记为正确答案"
				} else {
					this.comentActionSheetList[2].text = "标记为正确答案"
				}
				this.commentActionSheetShow = true

			},
			async commentActionSheetClick(index) {

				if (index == 0) {
					// 删除
					var res = await this.$http({
						url: "/posts/post_comment_delete",
						method: "DELETE",
						data: {
							post_comment_id: this.comment.post_comment_id

						}
					})
					res = res.data
					if (res.code != 1) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						this.commentActionSheetShow = false;
						return;
					}
					this.commentActionSheetShow = false;
					await this.getPost()

					return;
				} else if (index == 1) {
					//编辑
					this.showEditCommentPopUp()
				} else if (index == 2) {
					
					// 标记为正确答案
					var irs = this.comment.is_right_answer == 0 ? 1 : 0
					var res = await this.$http({
						url: "/posts/post_comment_is_right",
						method: "POST",
						data: {
							post_comment_id: this.comment.post_comment_id,
							post_user_id: this.postDetail.user_id,
							is_right_answer: irs

						}
					})
					res = res.data
					if (res.code != 1) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						
						return;
					}
					this.commentActionSheetShow = false;
					this.comment.is_right_answer = irs


				}
				else if(index ==3){
					var flag = await this.isJuBaoEd()
					if(flag){
						uni.showToast({
							icon:"none",
							title:"已被您(其他用户)举报,无需重复举报"
						})
						return;
					}
					
					this.editJuBaoPopUpShow =  true;
				}
			},
			async changePostStatus() {
				var ps = this.postDetail.cur_status == 0 ? 1 : 0

				var res = await this.$http({
					url: "/posts/post_status",
					method: "POST",
					data: {
						post_id: this.postDetail.post_id,
						post_user_id: this.postDetail.user_id,
						post_status: ps
					}
				})
				res = res.data

				if (res.code != 1) {
					uni.showToast({
						title: res.msg,
						icon: "none"
					})
					return
				}
				this.postDetail.cur_status = ps;
				return;
			},
			async likeClick(e) {
					var il = e.is_like == 0 ? 1 : 0
					var res = await this.$http({
						url: "/posts/post_comment_like",
						method: "post",
						data: {
							post_comment_id: e.post_comment_id,
							is_like: il
						},
					})
					res = res.data
					await this.getPost()
				}

				,
			closeEditCommentPopUp() {
				this.$refs["editCommentForm"].resetFields()
				this.$refs["editCommentPopUpEditor"].clear()
			},
			showEditCommentPopUp() {

				this.editCommentPopUpShow = true
				this.editCommentForm.content = this.comment.content;
				this.$refs["editCommentPopUpEditor"].setContents(this.editCommentForm.content)
			},
			async submitEditCommentForm() {
				var res = await this.$http({
					url: "/posts/post_comment_edit",
					method: "POST",
					data: {
						post_comment_id: this.comment.post_comment_id,
						post_id: this.postDetail.post_id,
						content: this.editCommentForm.content
					}
				})

				res = res.data
				if (res.code != 1) {
					uni.showToast({
						title: res.msg,
						icon: "none",

					})
					this.editCommentPopUpShow = false
					return;
				}
				this.editCommentPopUpShow = false
				await this.getPost()
				return;
			},
			closeEditPostPopUp() {
				this.$refs["editPostForm"].resetFields()
				this.$refs["editPostEditor"].clear()
			},
			showEditPostPopUp() {
				this.editPostPopUpShow = true
				this.editPostForm.title = this.postDetail.post_title;
				this.editPostForm.content = this.postDetail.content;
				this.editPostForm.typeValue = this.postDetail.post_type;
				this.editPostForm.type = this.wendaTypeList[this.editPostForm.typeValue].label
				this.$refs["editPostEditor"].setContents(this.editPostForm.content)
			},
			async submitEditPostForm() {
				var res = await this.$http({
					url:"/posts/post_edit",
					method:"POST",
					data:{
						
						post_id: this.postDetail.post_id,
						post_title:this.editPostForm.title,
						content: this.editPostForm.content,
						post_type:this.editPostForm.typeValue
					}
				})

				res = res.data
				if(res.code != 1){
					uni.showToast({
						title:res.msg,
						icon:"none",

					})
					this.editPostPopUpShow = false
					return;
				}
				this.editPostPopUpShow = false
				await this.getPost()
				return;
			}
			,
			async submitJuBaoForm(){
				if(this.juBaoForm.reason.length <=40){
					uni.showToast({
						title:"举报内容不能少于40个字",
						icon:"none"
					})
					return;
				}
				var res = await this.$http({
					url:"/report/add",
					method:"POST",
					data:{
						
					item_id:this.juBaoForm.itemId,
					reason:this.juBaoForm.reason,
					table_number:this.juBaoForm.table_number
					}
				})
				
				res = res.data
				if(res.code != 1){
					uni.showToast({
						title:res.msg,
						icon:"none",
				
					})
				
				}else{
					uni.showToast({
						title:"已收到您的举报信息",
						icon:"none",
									
					})
				}
				this.editJuBaoPopUpShow = false
				
				return;
			},
			confirmSelect(e){
				this.editPostForm.type = e[0].label
				this.editPostForm.typeValue = e[0].value
			},
			
			async isJuBaoEd(){
			
				var res= await this.$http({
					url:"/report/get",
					data:{
						item_id:this.juBaoForm.itemId,
						table_number:this.juBaoForm.table_number,
					}
				})
				
				res =res.data
				
				if(res.code !=1){
					uni.showToast({
						icon:"none",
						title:res.msg
					})
					return;
				}
				return res.data.isReported
				
			
				
			}
		
		},
		computed: {
			sectionText() {
				return "所有回答" + "(" + this.post_comment_list.length + ")"
			}
		},
		async onLoad(options) {
			var loginRes = this.checkLogin("/pages/wenda/wenda", 1);
			if (!loginRes) {
				return;
			}

			this.post_id = options.post_id
			await this.getPost()
			

		}
	}
</script>

<style lang="scss">
	page {
		background-color: $u-bg-color;
	}
	
	.popUpBox {
		margin: 20rpx;
	}

	.wenda-detail-box {
		

	}

	.wenda-detail-topic {
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
		padding-top: 50rpx;
		border-radius: 10rpx;
	}

	.close-button-box {
		margin-top: 30rpx;
		width: 100%;
		margin-bottom: 30rpx;
		background-color: #FFFFFF;
	}

	.wenda-detail-comment {
		width: 100%;
	
		margin-top: 30rpx;
		border-radius: 10rpx;
	
		
	}
</style>
