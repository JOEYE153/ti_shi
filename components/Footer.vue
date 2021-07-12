<template>
    <div>
      <footer class="footer">
          <div class="footerbg">
          <img src="/assets/img/footer-bg.png" alt="">
          </div>
          <div class="footer-top pt-120 pb-110">
              <div class="container">
                  <div class="row">
                      <div class="col-lg-3 col-sm-6">
                          <!-- footer widget -->
                          <div class="footer-widget">
                              <div class="widget-header">
                                <h5>关于我们</h5>
                              </div>
                              <p>题士为北京航空航天大学计算机学院软件工程课程团队项目，由身手不凡的六位共同赋予软件的价值。</p>
                          </div>
                          <!--End of footer widget -->
                      </div>

                      <div class="col-lg-3 col-sm-6">
                          <div class="footer-widget">
                              <!-- widget header -->
                              <div class="widget-header">
                                  <h5>反馈方式</h5>
                              </div>
                              <!-- widget header -->
                              <div class="widget-body">
                                  <ul class="address-list">
                                      <li>
                                          <span><i class="fa  fa-qq"></i></span>
                                          956189920
                                      </li>
                                      <li>
                                          <span><i class="fa  fa-envelope"></i></span>
                                          tishi@126.com
                                      </li>
                                      <li>
                                          <span><i class="fa  fa-map"></i></span>
                                          学院路37号北京航空航天大学
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-3 col-sm-6">
                          <div class="footer-widget">
                              <!-- widget header -->
                              <div class="widget-header">
                                  <h5>博客日志</h5>
                              </div>
                              <!-- widget header -->
                          </div>

                          <div class="widget-body">
                              <div class="extra-link">
                                  <div class="link-left">
                                      <ul>
                                          <li><a href="https://www.cnblogs.com/sudorm-rf/p/14649761.html">团队介绍</a></li>
                                          <li><a href="https://www.cnblogs.com/sudorm-rf/p/14652612.html">需求分析</a></li>
                                          <li><a href="https://g.eqxiu.com/s/UAPWhw8z">题士宣传册</a></li>
                                      </ul>
                                  </div>
                                  <div class="link-right">
                                      <ul>
                                          <li><a href="https://www.cnblogs.com/sudorm-rf/p/14756626.html">Alpha发布声明</a></li>
                                          <li><a href="https://www.cnblogs.com/sudorm-rf/p/14770834.html">Alpha项目展示</a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="col-lg-3 col-sm-6">
                          <div class="footer-widget">
                              <div class="widget-body">
                                  <div class="twetter-post-inner">
                                      <div class="footer-post-details">
                                          感谢各位老师、助教和评审团对题士项目的指导。 <br><a href="https://www.cnblogs.com/HansBug/p/14849014.html">Alpha题士深度评测</a>
                                      </div>
                                      <div class="twetter-post">
                                          <span><i class="fa fa-heart"></i></span>
                                          PM - 6 6, 2021
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="footer-bottom">
              <div class="footer-text text-center">
                  <p>© copyright 2021 删库跑路对不队</p>
              </div>
          </div>

      </footer>

      <!-- back to top -->
      <div @click="scrollTop" :class="`back-to-top ${scrollBtn ? 'show' : ''}`">
          <a href="#"><i class="fa fa-chevron-up"></i></a>
      </div>

    </div>
</template>

<script>
    export default {
      name: "Footer",
      data(){
        return {
          scrollBtn: false
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },

      methods: {

        handleScroll () {

          if (window.scrollY > 70) {
            this.scrollBtn = true
          }
          else if (window.scrollY < 70) {
            this.scrollBtn = false
          }
        },

        scrollTop () {
            window.scrollTo(0, 0);
        }


      }
    }
</script>

<style scoped>

</style>
