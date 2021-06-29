<template>
	<view class="wenda-box">

		<view class="segment-control-box">
			<uni-segmente-control :values="menuList" styleType="text" activeColor="#7468BE" activeTextColor="#000" @clickItem="changeStatus">
			</uni-segmente-control>
		</view>
		<scroll-view scroll-y="true">
			<view class="scroll-view">
				<view class="search-bar-box">
					<uni-search-bar placeholder="搜索讨论" radius="10" cancelButton="none"
					 clearButton= "auto" bgColor="#fff"  @confirm="search" @clear="clear"></uni-search-bar>
				</view>
			
				<view class="wenda-list">
					<u-section title="置顶" :right="false"></u-section>
					<wenda-item :first = "i==0" v-for="(item,i) in topPostList" :key="item.post_id" :item ="item" @click="gotoWendaDetail"></wenda-item>
					<u-divider v-if="topPostList.length == 0">暂无置顶</u-divider>
					
					<u-section title="其他" :right="false"></u-section>
					<wenda-item :first = "i==0" v-for="(item,i) in otherPostList" :key="item.post_id" :item ="item" @click="gotoWendaDetail"></wenda-item>
					
				</view>
			</view>
		</scroll-view>
		<view class="wenda-add-box">
			<view class="wenda-add-button" @click="openEditor">
				<uni-icons type="plusempty" size="35" color="#fff" ></uni-icons>
			</view>
		</view>
		
		<u-popup v-model="addWenDaPopUpShow" mode="bottom" length="1100" @close="hideEditor">
			<view class="addWenDaPopUp">
				<u-form :model="addWenDaForm" ref="addWenDaForm">
						<u-form-item label="标题" prop="title"><u-input v-model="addWenDaForm.title" :focus="false"
						 /></u-form-item>
						<u-form-item label="类型" prop = "type"><u-input v-model="addWenDaForm.type" type="select"  :focus="false"
						 @click="wendaTypeSelectShow=true"/></u-form-item>
						<u-form-item label="内容" prop = "html" label-position="top">
							
							<ls-editor v-model="addWenDaForm.html" ref="addWenda"></ls-editor>
							
							
						</u-form-item>
						
				</u-form>
				
				<u-button shape="square" @click="submitAddWenDaForm">提交</u-button>
			</view>
			
		</u-popup>
		
		<u-select v-model="wendaTypeSelectShow" :list="wendaTypeList" @confirm = "confirmSelect"></u-select>
		
		
	</view>
</template>

<script>
	import uniSegmenteControl from "@/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"
	import uniSearchBar from "@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"
	import wendaItem from "@/components/wendaItem.vue"
	import lsEditor from "@/components/editor/editor.vue"
	
	export default {
		components: {
			uniSegmenteControl,
			uniSearchBar,
			wendaItem,
			lsEditor
		},
		data() {
			return {
				menuList: ["Open", "Closed", "All", "Mine"],
				postList:[],
				addWenDaPopUpShow:false,
				html: '<b style="color:#ff0000">HTML 片段1</b>',
				addWenDaForm:{
					title:"",
					html:"",
					type:"",
					typeValue:0,
				},
				wendaTypeSelectShow:false,
				wendaTypeList: [
					{
						value: '0',
						label: '讨论'
					},
					{
						value: '1',
						label: '问题'
					}
				],
				status:0
			}
		},
		computed:{
			topPostList(){
				return this.postList.filter(item =>{
					return item.is_top==1
				})
			},
			otherPostList(){
				return this.postList.filter(item =>{
					return item.is_top==0
				})
			}
		},
		methods: {
			openEditor: function() {
			    this.addWenDaPopUpShow = true
			},
			hideEditor: function() {
			   this.$refs["addWenDaForm"].resetFields()
			   this.$refs["addWenda"].clear()
			},
			async changeStatus(e){
				this.status = e.currentIndex
				
				await this.getPostList()
				
			},
			async clear(){
				await this.getPostList()
			},
			async search(e){
				
				var res = await this.$http({
					url:"/posts/post_search",
					data:{
						course_id:getApp().globalData.courseId,
						keyword:e.value,
						post_status:this.status
					}
				})
				this.postList = res.data.data.post_list
				
			},
			async submitAddWenDaForm(){
				if(this.addWenDaForm.title === "" ||this.addWenDaForm.typeValue === ""|| this.addWenDaForm.html==="" ){
					uni.showToast({
						title:"内容不能为空",
						icon:"none"
					})
					return
				}
				var res = await this.$http({
					url:"/posts/post_add",
					method:"POST",
					data:{
						course_id:getApp().globalData.courseId,
						post_title:this.addWenDaForm.title,
						post_type:this.addWenDaForm.typeValue,
						content:this.addWenDaForm.html	
					}
				})
				
				if(res.data.code ==1){
					uni.showToast({
						title:"提交成功",
						icon:"none"
					})
					this.addWenDaPopUpShow = false;
				}
				await this.getPostList()
			},
			confirmSelect(e){
				this.addWenDaForm.type = e[0].label
				this.addWenDaForm.typeValue = e[0].value
			},
			async getPostList(){
				var res = await this.$http({
					url:"/posts/get_all_post?course_id="+getApp().globalData.courseId+"&post_status="+this.status,
				
				})
				this.postList = res.data.data.post_list
				
			},
		
			gotoWendaDetail(e){
				
				uni.navigateTo({
					url:"/pages/wenda/wendadetail?post_id="+e
				})
			},
		},
		async onLoad() {
			var loginRes = this.checkLogin("/pages/wenda/wenda", 1);
			if (!loginRes) {
				return;
			}
		
			await this.getPostList()
		
			
		},
		async onShow() {
			var loginRes = this.checkLogin("/pages/wenda/wenda", 1);
			if (!loginRes) {
				return;
			}
		
			await this.getPostList()
		
			
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.wenda-box {
		width: 100%;
		height: 100%;

		scroll-view {
			height: 80%;
			.scroll-view{
				display: flex;
				flex-direction: column;
				align-items: center;
				.search-bar-box {
					width: 100%;
					height: 10%;
					margin-top: 10rpx;
					// display: flex;
					// justify-content: center;
					// align-items: center;
				}
				
				.wenda-list {
					width: 90%;
				
				}
			}
		}
		
		.segment-control-box {
			width: 100%;
			height: 8%;
			font-size: 50rpx;
			box-shadow: 10rpx 10rpx 10rpx 10rpx #efefef;
		}

		
		.wenda-add-box{
			width: 100%;
			height: 12%;
			display: flex;
			justify-content: center;
			align-items: center;
			.wenda-add-button{
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


	.addWenDaPopUp{
		
		margin: 20rpx;
	}
</style>
