<template>
	<view class="wrap">
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo">
						<image :src="comment.img_url" mode=""></image>
					</view>
					<view class="user-info">
						<view class="name">{{ comment.user_name }}</view>
						<view class="date">06-25 13:58</view>
					</view>
				</view>
				<view class="right" :class="{ highlight: comment.is_like }">
					{{ comment.like_count }}
					<u-icon v-if="!comment.is_like" name="thumb-up" class="like" color="#9a9a9a" :size="30"
						@click="getLike"></u-icon>
					<u-icon v-if="comment.is_like" name="thumb-up-fill" class="like" :size="30" @click="getLike">
					</u-icon>
				</view>
			</view>
			<view class="content">{{ comment.content }}</view>

		</view>
		<view class="all-reply">
			<view class="all-reply-top">全部回复（{{ comment.all_reply_count }}）</view>
			<view class="item" v-for="(item, index) in replyList" :key="index">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo">
								<image :src="item.img_url" mode=""></image>
							</view>
							<view class="user-info">
								<view class="user-infor-top">
									<view class="name">{{ item.user_name }}</view>
									<u-icon name="play-right-fill" v-if="item.reply_to_user_name" :size="10"
										color="#c8c9cc"></u-icon>
									<view class="reply-name" v-if="item.reply_to_user_name">
										{{ item.reply_to_user_name }}
									</view>
								</view>

								<view class="date">{{ item.create_time }}</view>
							</view>
						</view>
						<view class="right" :class="{ highlight: item.is_like }">
							<view class="num">{{ item.like_count }}</view>
							<u-icon v-if="!item.is_like" name="thumb-up" class="like" :size="30" color="#9a9a9a"
								@click="getLike(index)"></u-icon>
							<u-icon v-if="item.is_like" name="thumb-up-fill" class="like" :size="30"
								@click="getLike(index)"></u-icon>

							<u-icon class="setting" name="more-dot-fill" :size="30"
								@click="openCommentSettingPopUp(item.reply_id)"></u-icon>
						</view>
					</view>

					<view class="content" @click="showAddCommentPopUp(item)">{{ item.content }}</view>

				</view>
			</view>
		</view>
		<view class="comment-add-box" @click="showAddCommentPopUp()">
			<view class="comment-add-input">{{commentInputPlaceHolder}}</view>
			<view class="comment-add-post">发布</view>
		</view>
		<u-popup v-model="addCommentPopUpShow" mode="bottom" border-radius="14" @close="closeCommentPopUp">
			<view class="popup-input-box">
				<view style="width: 80%;">
					<!-- <u-input v-model="replyForm.content" type="textarea" border focus maxlength="20" trim
						:placeholder="commentInputPlaceHolder" /> -->
					<editor id="editor" :placeholder="commentInputPlaceHolder" @ready="onEditorReady "
						@input="getEditorContent"></editor>

				</view>
				<view class="comment-add-post" @click="submitComment">发布</view>
			</view>
		</u-popup>

		<u-action-sheet :list="commentSettingList" v-model="commentSettingPopUpShow" @click="commentSettingClick">
		</u-action-sheet>


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
	export default {
		data() {
			return {
				replyList: [],
				comment: '',
				addCommentPopUpShow: false,
				commentId: 0,
				username: "",
				commentInputPlaceHolder: "",
				replyForm: {
					comment_id: "",
					reply_to_user_id: "",
					content: "",
				},
				commentSettingPopUpShow: false,
				deleteForm: {
					reply_id: "",
				},
				commentSettingPopUpShow: false,
				commentSettingList: [{
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
		onLoad(options) {
			var loginRes = this.checkLogin("/pages/commentReply/commentReply", 1);
			if (!loginRes) {
				return;
			}
			this.commentId = options.commentId;

			this.getReply();
		},
		methods: {

			onEditorReady() {
				console.log("------ready")
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

				this.replyForm.content = e.detail.text;
			},
			// 点赞
			async getLike(index) {
				if (index === 0 || index > 0) {
					this.replyList[index].is_like = !this.replyList[index].is_like;
					if (this.replyList[index].is_like == true) {
						this.replyList[index].like_count++;
					} else {
						this.replyList[index].like_count--;
					}
					var res = await this.$http({
						url: "/question_comment/reply_like",
						method: "POST",
						data: {
							reply_id: this.replyList[index].reply_id,
							is_like: this.replyList[index].is_like
						}
					})

				} else {
					if (this.comment.is_like == true) {
						this.comment.is_like = !this.comment.is_like;
						this.comment.like_count--;
					} else {
						this.comment.is_like = !this.comment.is_like;
						this.comment.like_count++;
					}
					var res = await this.$http({
						url: "/question_comment/comment_like",
						method: "POST",
						data: {
							comment_id: this.comment.comment_id,
							is_like: this.comment.is_like
						}
					})
				}
			},
			// 回复列表
			async getReply() {
				var res = await this.$http({
					url: "/question_comment/reply?comment_id=" + this.commentId,
				})
				res = res.data
				if (res.code != 1) {
					uni.showToast({
						title: "请求失败",
						icon: "none"
					})
				}
				this.comment = res.data.comment
				this.replyList = res.data.reply_list
				this.commentInputPlaceHolder = "回复:" + this.comment.user_name
			},
			showAddCommentPopUp(person) {
				if (person != undefined) {
					this.commentInputPlaceHolder = "回复:" + person.user_name;
					this.replyForm.reply_to_user_id = person.user_id;
				} else {
					this.replyForm.reply_to_user_id = "";
				}
				this.addCommentPopUpShow = true;
				this.replyForm.comment_id = this.commentId
				return;
			},
			async closeCommentPopUp() {
				this.commentInputPlaceHolder = "回复:" + this.comment.user_name;
				this.replyForm.content = "";
				await this.editorCtx.clear();
			},

			closeJuBaoPopUp() {
				this.juBaoForm.itemId = "";
				this.juBaoForm.reason = "";
				this.juBaoForm.table_number = "";
				this.$refs["juBaoForm"].resetFields()
			},
			async submitComment() {
				if (this.replyForm.content.trim() == "") {
					uni.showToast({
						title: "内容不为空",
						icon: "none"
					})
					return;
				}
				var res = await this.$http({
					url: "/question_comment/reply_add",
					method: "POST",
					data: this.replyForm
				})


				res = res.data
				await this.getReply()
				this.addCommentPopUpShow = false;
			},
			openCommentSettingPopUp(reply_id) {
				this.deleteForm.reply_id = reply_id
				this.juBaoForm.itemId = reply_id;
				this.juBaoForm.table_number = 2;
				this.commentSettingPopUpShow = true;

			},

			closeCommentSettingPopUp() {
				this.deleteForm.reply_id = 0
			},
			async deleteComment() {
				var res = await this.$http({
					url: "/question_comment/reply_delete",
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

				await this.getReply()
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
		async onShow() {
			await this.getReply();
		}
	};
</script>


<style lang="scss">
	page {
		background-color: $u-type-info-light;
		width: 100%;
		height: 100%;
	}

	#editor {
		width: 100%;
		height: 200rpx;
		padding: 30rpx;
		font-size: 35rpx;
	}

	.editPostPopUp {
		margin: 20rpx;
	}

	.wrap {
		width: 100%;
		padding-bottom: 100rpx;

		background-color: $u-type-info-light;

		.comment-add-box {
			position: fixed;
			background-color: #FFFFFF;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
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

	.comment {
		padding: 30rpx;
		font-size: 32rpx;
		background-color: #ffffff;

		.top {
			display: flex;
			justify-content: space-between;
		}

		.content {
			margin-bottom: 10rpx;
			width: 700rpx;
			word-break: break-all;
		}

		.left {
			display: flex;

			.heart-photo {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.user-info {
				margin-left: 10rpx;

				.user-infor-top {
					display: flex;

					.name {
						color: #5677fc;
						font-size: 28rpx;
						margin-bottom: 4rpx;
						margin-right: 10rpx;
					}

					.reply-name {
						color: #5677fc;
						font-size: 28rpx;
						margin-bottom: 4rpx;
						margin-left: 10rpx;
					}
				}

				.date {
					font-size: 20rpx;
					color: $u-light-color;
				}
			}
		}

		.right {
			display: flex;
			font-size: 20rpx;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 6rpx;
			}

			.setting {
				margin-left: 30rpx;
			}

			.num {
				font-size: 26rpx;
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

	.all-reply {
		margin-top: 10rpx;
		padding-top: 20rpx;
		background-color: #ffffff;

		.all-reply-top {
			margin-left: 20rpx;
			padding-left: 20rpx;
			border-left: solid 4rpx #5677fc;
			font-size: 30rpx;
			font-weight: bold;
		}

		.item {
			border-bottom: solid 2rpx $u-border-color;
		}

		.reply {
			padding: 20rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			margin: 10rpx 0;

			.username {
				font-size: 24rpx;
				color: #7a7a7a;
			}
		}
	}
</style>
