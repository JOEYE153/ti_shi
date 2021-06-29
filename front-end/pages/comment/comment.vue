<template>
	<view class="comment-box">
		<view class="comment" v-for="(res, index) in commentList" :key="res.comment_id">
			<view class="left">
				<image :src="res.img_url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.user_name }}</view>
					<view class="like" :class="{ highlight: res.is_like }">
						<view class="num">{{ res.like_count }}</view>
						<u-icon v-if="!res.is_like" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)">
						</u-icon>
						<u-icon v-if="res.is_like" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
					</view>
				</view>
				<view class="content" @tap="showAddCommentPopUp(res)">{{ res.content }}</view>
				<view class="reply-box" @tap="toAllReply(res.comment_id)">
					<view class="item" v-for="(item, index) in res.reply_list" :key="item.reply_id">
						<view class="username">{{ item.user_name }}</view>
						<view class="text">{{ item.content }}</view>
					</view>
					<view class="all-reply" v-if="res.reply_list.length !=0">
						共{{ res.all_reply_count }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ res.create_time }}
					<view class="reply" @click="showAddCommentPopUp(res)">回复</view>
					<view class="setting-box">
						<u-icon class="setting" name="more-dot-fill" :size="26"
							@click="openCommentSettingPopUp(res.comment_id)"></u-icon>
					</view>
				</view>
			</view>
		</view>



		<view class="comment-add-box" @click="showAddCommentPopUp()">
			<view class="comment-add-input">写下你的评论</view>
			<view class="comment-add-post">发布</view>
		</view>
		<u-popup v-model="addCommentPopUpShow" mode="bottom" border-radius="14" @close="closeCommentPopUp"
			@open="openComentPopUp">
			<view class="popup-input-box">
				<view style="width: 80%;">
					<!-- <u-input v-model="commentForm.content" type="textarea" maxlength="20" height="300"
						:placeholder="commentInputPlaceHolder" :show-confirm-bar="false" :focus="focus" 
						:cursor-spacing="20"
						 trim  border :clearable="false"/> -->
					<editor id="editor" :placeholder="commentInputPlaceHolder" @ready="onEditorReady "
						@input="getEditorContent"></editor>

				</view>
				<view class="comment-add-post" @click="submitComment">发布</view>
			</view>

		</u-popup>

	
		<u-action-sheet :list="commentSettingList" v-model="commentSettingPopUpShow" @click="commentSettingClick"></u-action-sheet>
		
		
		<u-popup v-model="editJuBaoPopUpShow" mode="bottom" length="900" @close="closeJuBaoPopUp">
			<view class="editPostPopUp">
				<u-form :model="juBaoForm" ref="juBaoForm">

					<u-form-item label="举报内容" prop="reason" label-position="top">
						<u-input v-model="juBaoForm.reason" type="textarea" auto-height :height="600"
							:custom-style="textarea_style" :focus="false" />
					</u-form-item>

				</u-form>

				<u-button shape="square" @click="submitJuBaoForm">提交</u-button>
			</view>
		</u-popup>
	</view>

</template>

<script>
	const PLACERHOLDER = "写下你的评论"
	const REPLYMODE = 1
	const COMMENTMODE = 2
	export default {
		data() {
			return {
				commentList: [],
				addCommentPopUpShow: false,
				commentSettingPopUpShow: false,
				commentInputPlaceHolder: PLACERHOLDER,
				commentForm: {
					content: "",
					question_id: 1,
					course_id: getApp().globalData.courseId,
				},
				deleteForm: {
					comment_id: 0
				},
				replyForm: {
					comment_id: 0,
					reply_to_user_id: 0,
					content: ""
				},
				mode: COMMENTMODE,

				editorCtx: null,
				commentSettingList: [ {
					text: '删除'
				}, {
					text: '举报' 
				}],
				juBaoForm: {
					itemId: "",
					reason: "",
					table_number: ""
				},
				editJuBaoPopUpShow: false,
				textarea_style:{
					height: '300rpx',
					backgroundColor: '#f7f7f7',
					lineHeight:' 60rpx',
					margin: '20rpx',
					padding: '20rpx',
				}
			};
		},
		methods: {

			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editorId');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {

					this.editorCtx = res.context;

				}).exec()
				// #endif
			},
			undo() {
				this.editorCtx.undo()
			},
			getEditorContent(e) { /////////////////////////获取编辑器内容，当前页面都能获取到

				this.commentForm.content = e.detail.text;
			},
			// 跳转到全部回复	
			toAllReply(commentId) {
				uni.navigateTo({
					url: '/pages/commentReply/commentReply?commentId=' + commentId
				});
			},
			// 点赞
			async getLike(index) {

				var _self = this;
				var res = await this.$http({
					url: "/question_comment/comment_like",
					method: "POST",
					data: {
						comment_id: this.commentList[index].comment_id,
						is_like: !this.commentList[index].is_like
					}
				})
				res = res.data
				if (res.code != 1) {
					return
				}
				this.commentList[index].is_like = !this.commentList[index].is_like;
				if (this.commentList[index].is_like == true) {
					this.commentList[index].like_count++;
				} else {
					this.commentList[index].like_count--;
				}
			},
			// 评论列表
			async getComment() {

					var _self = this;
					var res = await this.$http({
						url: "/question_comment/comment?course_id=" + getApp().globalData.courseId +
							"&question_id=" + this.commentForm.question_id
					})

					res = res.data;

					if (res.code != 1) {
						return;
					}
					this.commentList = res.data.comment_list


				}

				,
			openCommentSettingPopUp(comment_id) {
				this.deleteForm.comment_id = comment_id
				this.juBaoForm.itemId = comment_id;
				this.juBaoForm.table_number = 1;
				this.commentSettingPopUpShow = true;

			},

			closeCommentSettingPopUp() {
				this.deleteForm.comment_id = 0

			},
			closeJuBaoPopUp(){
				this.juBaoForm.itemId = "";
				this.juBaoForm.reason = "";
				this.juBaoForm.table_number = "";
				this.$refs["juBaoForm"].resetFields()
			},
			async deleteComment() {
				var res = await this.$http({
					url: "/question_comment/comment_delete",
					method: "DELETE",
					data: this.deleteForm
				})
				res = res.data

				if (res.code != 1) {
					uni.showToast({
						title: "删除失败",
						icon: "none"
					})
					return;
				}

				await this.getComment()
				this.commentSettingPopUpShow = false;
			},
			
			async commentSettingClick(index) {
				if (index == 0) {
					await this.deleteComment()
				} else if (index == 1) {
					var flag = await this.isJuBaoEd()
					if (flag) {
						uni.showToast({
							icon: "none",
							title: "已被举报过,请勿重复举报"
						})
						return;
					}
			
					this.editJuBaoPopUpShow = true;
			
				}
			},
			async submitJuBaoForm() {
				if(this.juBaoForm.reason.length <=40){
					uni.showToast({
						title:"举报内容不能少于40个字",
						icon:"none"
					})
					return;
				}
				var res = await this.$http({
					url: "/report/add",
					method: "POST",
					data: {
			
						item_id: this.juBaoForm.itemId,
						reason: this.juBaoForm.reason,
						table_number: this.juBaoForm.table_number
					}
				})
			
				res = res.data
				if (res.code != 1) {
					uni.showToast({
						title: res.msg,
						icon: "none",
			
					})
			
				} else {
					uni.showToast({
						title: "已收到您的举报信息",
						icon: "none",
			
					})
				}
				this.editJuBaoPopUpShow = false
			
				return;
			},
			async isJuBaoEd() {
			
				var res = await this.$http({
					url: "/report/get",
					data: {
						item_id: this.juBaoForm.itemId,
						table_number: this.juBaoForm.table_number,
					}
				})
			
				res = res.data
			
				if (res.code != 1) {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					return;
				}
				return res.data.isReported
			
			
			
			},
			showAddCommentPopUp(person) {

				if (person != undefined) {
					this.commentInputPlaceHolder = "回复:" + person.user_name

					this.replyForm.comment_id = person.comment_id;
					this.mode = REPLYMODE
				} else {
					this.mode = COMMENTMODE
				}

				this.addCommentPopUpShow = true;

				return;
			},
			openComentPopUp() {

				this.focus = true;
			},
			async closeCommentPopUp() {

				this.commentInputPlaceHolder = PLACERHOLDER
				this.commentForm.content = ""
				await this.editorCtx.clear()
				this.focus = false;
			},
			async submitComment() {
				var _self = this
				var form;
				var url;

				if (this.commentForm.content.trim() == "") {
					uni.showToast({
						title: "内容不为空",
						icon: "none"
					})
					return;
				}
				if (this.mode == COMMENTMODE) {
					form = this.commentForm

					url = "/question_comment/comment_add"

				} else if (this.mode == REPLYMODE) {
					form = {
						comment_id: this.replyForm.comment_id,
						reply_to_user_id: "",
						content: this.commentForm.content
					}
					url = "/question_comment/reply_add"
				}
				var res = await this.$http({
					url: url,
					method: "POST",
					data: form
				})




				res = res.data
				if (res.code == 1) {
					await _self.getComment()
				}
				this.addCommentPopUpShow = false;


			}
		},
		onBackPress(event) {
			if (this.addCommentPopUpShow) {
				this.addCommentPopUpShow = false;
				return;
			}
			if (this.commentSettingPopUpShow) {
				this.addCommentPopUpShow = false;
				return;
			}
		},
		onLoad(options) {
			var loginRes = this.checkLogin("/pages/comment/comment", 1);
			if (!loginRes) {
				return;
			}
			this.commentForm.question_id = options.timuId
			this.getComment();
		},
		async onShow() {
			await this.getComment();
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		background-color: $u-type-info-light;
	}


	#editor {
		width: 100%;
		height: 200rpx;
		padding: 30rpx;
		font-size: 35rpx;
	}

	.comment-box {
		width: 100%;


		padding-bottom: 100rpx;

		.comment-add-box {
			position: fixed;
			background-color: #FFFFFF;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			border-top: 3rpx solid $u-type-info-disabled;
			padding: 0 30rpx;

			.comment-add-post {
				width: 10%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #a0cfff;
			}

			.comment-add-input {
				width: 90%;
				height: 100%;
				display: flex;

				align-items: center;
				color: #c8c9cc;
			}
		}
	}

	.comment {
		display: flex;
		padding: 30rpx;
		background-color: white;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: 26rpx;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
				width: 620rpx;
				word-break: break-all;

			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					flex: 1;
					color: #5677fc;
					margin-left: 10rpx;
				}

				.setting-box {
					margin-left: auto;

				}
			}
		}
	}

	.popup-input-box {
		display: flex;
		width: 100%;
		align-items: flex-end;

		.comment-add-post {
			width: 20%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $u-type-primary;
		}
	}
</style>
