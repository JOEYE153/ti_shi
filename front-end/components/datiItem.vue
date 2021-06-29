<template>
	<view class="dati-item-box"  @click="changemode()">
		<view v-if="is_multi == 0" class="dati-item-choice-icon" :class="'dati-item-back-'+choice_mode">
			{{choice}}
		</view>
		<view v-else class="dati-item-choice-icon2" :class="'dati-item-back-'+choice_mode">
			{{choice}}
		</view>
		<view class="dati-item-choice-text" :class="'dati-item-back-'+mode">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"datiItem",
		props:{
			mode:{
				type:String,
				default:"default"
			},
			choice:{
				type:String
			},
			text:{
				type:String,
				default:"hhhhhhhhhhhhh"
			},
			choice_mode:{
				type:String,
				default:"default"
			},
			is_multi:{
				type: Number,
				default: "0"
			}
		},
		data() {
			return {
			
			};
		},
		methods:{
			changemode(){
				this.$emit("click")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dati-item-box{
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		min-height: 100rpx;
		.dati-item-choice-icon{
			width:60rpx;
			height: 60rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			font-size: 40rpx;
			color: #FFFFFF;
		}
		.dati-item-choice-icon2{
			width:60rpx;
			height: 60rpx;
			border-radius: 0%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			font-size: 40rpx;
			color: #FFFFFF;
		}
		.dati-item-choice-text{
			width: 80%;
			font-size: 30rpx;
			overflow: hidden;
			white-space: normal;
			word-break: break-all;
			
			color: #FFFFFF;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 30rpx;
		}
		
		.dati-item-back-default{
			background-color:$u-type-info-disabled;
		}
		.dati-item-back-wrong{
			background-color:$u-type-error;
		}
		.dati-item-back-right{
			background-color: $u-type-success;
		}
		.dati-item-back-checked{
			background-color: $u-type-primary;
		}
	}
</style>
