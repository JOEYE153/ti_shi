<script>
	
	export default {
		globalData:{
			courseId:1,
			courseName:"航概(理)"
		},
		onLaunch: async () =>{
		
		},
		onShow: function() {
		 
		},
		onHide: function() {
		
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
		::-webkit-scrollbar {
		    display: none;
		    width: 0 !important;
		    height: 0 !important;
		    -webkit-appearance: none;
		    background: transparent;
		    color: transparent;
		  }
	/* #endif */
	
	/* 解决H5 的问题 */
	/* #ifdef H5 */
	    uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
	    	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: none;
		    width: 0 !important;
		    height: 0 !important;
		    -webkit-appearance: none;
		    background: transparent;
		    color: transparent;
	    }
	/* #endif */
</style>
