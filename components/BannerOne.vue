<template>
  <div class="banner-area-inner">
    <div class="banner-inner-area banner-area1">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <!-- banner text -->
                    <div class="banner-text-inner">
                        <div class="banner-shape-wrap">
                            <div class="banner-shape-inner">
                                <img src="/assets/img/banner/shaps1.png" alt="" class='shape shape1 rotate3d'>
                                <img src="/assets/img/banner/shaps2.png" alt="" class='shape shape2 rotate2d'>
                                <img src="/assets/img/banner/shaps3.png" alt="" class='shape shape3 rotate-2d'>
                                <img src="/assets/img/banner/shaps4.png" alt="" class='shape shape4 rotate3d'>
                                <img src="/assets/img/banner/shaps6.png" alt="" class='shape shape6 rotate-2d'>
                                <img src="/assets/img/banner/shaps7.png" alt="" class='shape shape7 rotate3d'>
                            </div>
                        </div>

                        <h1>题士</h1>
                        <p>每个人都是在题库中披荆斩棘的骑士</p>
                        <div>
                          <a href="#qrcode" class="btn">开始体验</a>
                          <a v-if="screenWidth > 600" href="#features" class="btn">了解更多</a>
                        </div>
                    </div>
                    <!-- banner text -->
                </div>
                <div class="col-lg-5 offset-lg-1 col-md-4 offse-xl-2">
                    <!-- banner image-->
                    <div class="banner-image">
                        <img src="/assets/img/banner/mock.png" alt="">
                    </div>
                    <!--End of banner image-->
                </div>
            </div>
        </div>
    </div>
      </div>
</template>

<script>
    export default {
        name: "BannerOne",
        data () {
          return {
            //screenWidth: document.body.clientWidth
            screenWidth: 0
          }
        },
        mounted() {
          const that = this
          this.screenWidth = document.body.clientWidth
          window.onresize = () => {
            return (() => {
              window.screenWidth = document.body.clientWidth
              that.screenWidth = window.screenWidth
            })()
          }
        }
    }
</script>

<style scoped>

</style>
