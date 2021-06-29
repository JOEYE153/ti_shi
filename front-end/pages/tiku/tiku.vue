<template>
	<view class="content">

		<view class="search-box">
			<u-search placeholder="输入关键词" v-model="keyword" @search="search" @custom="search"></u-search>


		</view>
		<view class="question-house" v-if="courseId == 4">
			<uni-collapse accordion="true" @change="changeSubdata" style="width: 100%;">
				<uni-collapse-item class="chapter-coll" v-for="(item,i) in navItem" :key="item.chapter_id"
					:title="item.chapter_title">
					<view class="q-box">
						<view class="q-area" v-for="(item2,i) in subdata" :key="item2.id">
							<view :class="'q-button'+item2.status" @click="gotoDatiPage(datiURL,item2.id)">
								{{i+1}}
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="question-house" v-else>
			<uni-collapse accordion="true" @change="changeSubdata" style="width: 100%;">
				<uni-collapse-item class="chapter-coll" v-for="(item,i) in navItem" :key="item.chapter_id"
					:title="num[item.chapter_id-1]+' '+' '+item.chapter_title">
					<view class="q-box">
						<view class="q-area" v-for="(item2,i) in subdata" :key="item2.id">
							<view :class="'q-button'+item2.status" @click="gotoDatiPage(datiURL,item2.id)">
								{{i+1}}
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import uniCollapse from "@/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "@/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {

				subdata: [],
				nowChapterId: 1,
				courseId: 0,
				keyword: '',
				datiURL: "/pages/dati/dati",
				num: ['第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '第七章', '第八章', '第九章', '第十章'],
				navItem: []
			}

		},
		onLoad() {

			var loginRes = this.checkLogin("/pages/tiku/tiku", 1);
			if (!loginRes) {
				return;
			}

			this.courseId = getApp().globalData.courseId;

			var _self = this;
			this.$http({
				url: '/question_pool/display/' + this.courseId,
				success: (res) => {
					this.navItem = res.data.data.chapters
					console.log(this.navItem)
				}
			})
		},
		async onShow() {
			var res = await this.$http({
				url: '/question_pool/display_chapter',
				data: {
					chapter_id: this.nowChapterId,
					course_id: getApp().globalData.courseId
				},
			})
			this.subdata = res.data.data.subdata
		},
		methods: {
			// async changeSubdata(e){
			// 	// console.log(this.navItem,nowId)

			// 	this.nowChapterId = e.index
			// 	var res = await this.$http({
			// 		url:'/question_pool/display_chapter',
			// 		data:{
			// 			chapter_id: this.nowChapterId,
			// 			course_id: getApp().globalData.courseId
			// 		},
			// 	})
			// 	this.subdata = res.data.data.subdata
			// },
			async changeSubdata(nowId) {
				this.subdata = null
				this.nowChapterId = parseInt(nowId) + 1
				var res = await this.$http({
					url: '/question_pool/display_chapter',
					data: {
						chapter_id: this.nowChapterId,
						course_id: getApp().globalData.courseId
					},
				})
				this.subdata = res.data.data.subdata
			},
			gotoDatiPage(url, id) {

				uni.navigateTo({
					url: url + '?id=' + id
				});
			},
			search() {
				var _self = this;
				this.$http({
					url: '/question_pool/search/',
					data: {
						keyword: this.keyword,
						course_id: getApp().globalData.courseId
					},
					success: (res) => {

						if (res.data.code == 0) {
							_self.$refs.popup.open('top')
						} else {
							uni.setStorage({
								key: 'questions',
								data: res.data.data.questions,
								success: function() {

								}
							});
							uni.navigateTo({
								url: '/pages/timuList/timuList'
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
	}

	.search-box {
		margin-top: 40rpx;
		width: 90%;
		height: 10%;
		margin-bottom: 80rpx;

	}

	.input-box {
		width: 70%;
		height: 80rpx;
		border-radius: 30rpx;
		margin-left: 20rpx;
		display: flex;

		justify-content: center;
		align-items: center;
	}

	.button-box {
		border-radius: 20rpx;
		width: 20%;
		height: 80rpx;

		display: flex;

		justify-content: center;
		align-items: center;
	}

	.question-house {
		width: 90%;


	}

	.chapter-coll {
		margin-left: 20rpx;
		margin-right: 20rpx;
		font-size: 30rpx;
	}

	.q-box {
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;

		.q-area {
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

	.q-button1 {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: $u-type-success-light;
		border: 1px solid $u-type-success;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.q-button0 {
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

	.q-button-1 {
		width: 80rpx;
		height: 80rpx;
		border: 1px solid red;
		border-radius: 50%;
		background-color: #f4acac;
		border: 1px solid red;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.uni-collapse-cell__title:active {
		background-color: #FFFFFF;
	}

	.uni-collapse-cell--open {
		background-color: #FFFFFF;
	}
</style>
