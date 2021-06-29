<template>
	

		<view class='wrapper'>
			<view class='toolbar' @tap="format">
				<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
				<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic">
				</view>
				<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
					data-name="underline"></view>
				<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
					data-name="strike"></view>
				<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
					data-name="align" data-value="left"></view>
				<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
					data-name="align" data-value="center"></view>
				<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
					data-name="align" data-value="right"></view>
				<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
					data-name="align" data-value="justify"></view>
				<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
				<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
					data-name="list" data-value="ordered"></view>
				<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
					data-name="list" data-value="bullet"></view>
				<view class="iconfont icon-undo" @tap="undo"></view>
				<view class="iconfont icon-redo" @tap="redo"></view>


				<view class="iconfont icon-fengexian" @tap="insertDivider"></view>

				<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
					data-name="header" :data-value="1"></view>
				<view class="iconfont icon-shanchu" @tap="clear"></view>
			</view>

			<view class="editor-wrapper">
				<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
					@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
					@input = "onInput">
				</editor>

			</view>

		</view>

	
</template>

<script>
	export default {
		props: {
			value: {
				type: String
			},
		},
		data() {
			return {
				readOnly: false,
				formats: {},
				html: "",
				editorCtx:null
			}
		},
		created() {
			
			this.html = this.value;
		},
		watch: {
			value: function(newvar) {
				this.html = newvar;
			},
			
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
			
				uni.createSelectorQuery()
				    .in(this)
				    .select('#editor')
				    .context(res => {
				        this.editorCtx = res.context;
				        if (this.html) {
				            this.editorCtx.setContents({
				                html: this.html
				            });
				        }
				    })
				    .exec();
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				
				 console.log('format', name, value)
				this.editorCtx.format(name, value)

			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},

			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			}
			,
			async onInput(e){
				
				this.$emit('input', e.detail.html);
				
			},
			setContents(html){
				
				this.editorCtx.setContents({
				    html: html
				});
			}
		},
		onLoad() {
			
		},
	}
</script>

<style lang="scss">
	@import "./editor-icon.css";

	

	.wrapper {
		width:100%;
		height: 100%;
	}

	.editor-wrapper {
		height: 400rpx;
		width: 700rpx;
		background: #fff;
	}

	.iconfont {
		display: inline-block;

		width: 85rpx;
		height: 85rpx;
		cursor: pointer;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		height: 200rpx;
		overflow-y: auto;
		border-bottom: 1px solid $u-border-color;
	}


	.ql-container {
		box-sizing: border-box;
		
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
