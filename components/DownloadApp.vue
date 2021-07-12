<template>
  <section class="border-top pt-110 pb-150" id="qrcode">
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-lg-10 col-md-12">
                      <div class="download-app-inner text-center">
                          <h2 class="h1">
                            遇见您，是我们的幸运
                          </h2>
                          <h3>扫码即可体验题士</h3>
                          <div class="h1">
                            <img v-if="screenWidth < 600" src="/assets/img/qrcode.png" alt="" style="width: 350px;height: 250px">
                            <img v-else src="/assets/img/qrcode.png" alt="" style="width: 600px;height: 450px">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
</template>

<script>
    export default {
        name: "DownloadApp",
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
