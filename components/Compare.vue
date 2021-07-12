<template>
  <section class="pb-90" id='compare'>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-12 col-lg-8">
                  <!-- section title -->
                  <div class="section-title text-center">
                      <h2>优中选优，进无止境</h2>
                  </div>
                  <!-- End of section title -->
              </div>
          </div>
          <div class="row">
              <div class="col-12">
                  <!-- nav tab content -->
                  <div class="tab-content price-content">
                      <div :class="`tab-pane fade ${month ? 'active show' : ''}`" role="tabpanel">
                          <div class="row">
                              <div class="col-md-6 col-lg-4">
                                  <!--Single price plan -->
                                  <div class="single-price-plan text-center">
                                      <div class="single-price-top">
                                          <h4>航概练习题库</h4>
                                      </div>
                                      <div class="single-price-body">
                                          <div class="price-list">
                                              <ul>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      顺序刷题|随机刷题
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      收藏题目|错题整理
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-times" aria-hidden="true"></i></span>
                                                      易错刷题|模拟考试
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-times" aria-hidden="true"></i></span>
                                                      做题统计|考期提醒
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-times" aria-hidden="true"></i></span>
                                                      问答社区|资源社区
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <!--end of Single price plan -->
                              </div>
                              <div class="col-md-6 col-lg-4">
                                  <!--Single price plan -->
                                  <div class="single-price-plan active text-center">
                                      <div class="single-price-top">
                                          <h4>题士</h4>
                                      </div>
                                      <div class="single-price-body">
                                          <div class="price-list">
                                              <ul>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      顺序刷题|随机刷题
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      收藏题目|错题整理
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      易错刷题|模拟考试
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      做题统计|考期提醒
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      问答社区|资源社区
                                                  </li>
                                              </ul>
                                          </div>
                                          <a href="#qrcode" class="btn">开始体验</a>
                                      </div>
                                  </div>
                                  <!--end of Single price plan -->
                              </div>
                              <div class="col-md-6 col-lg-4">
                                  <!--Single price plan -->
                                  <div class="single-price-plan text-center">
                                      <div class="single-price-top">
                                          <h4>考前自救题库</h4>
                                      </div>
                                      <div class="single-price-body">
                                          <div class="price-list">
                                              <ul>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      顺序刷题|随机刷题
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      收藏题目|错题整理
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-check" aria-hidden="true"></i></span>
                                                      易错刷题|模拟考试
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-times" aria-hidden="true"></i></span>
                                                      做题统计|考期提醒
                                                  </li>
                                                  <li>
                                                      <span><i class="fa fa-times" aria-hidden="true"></i></span>
                                                      问答社区|资源社区
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                                  <!--end of Single price plan -->
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- End of nav tab content -->
              </div>
          </div>
      </div>
  </section>
</template>

<script>
    export default {
      name: "Compare",
      data(){
        return {
          month: true
        }
      },
      methods: {
      }
    }
</script>

<style scoped>

</style>
