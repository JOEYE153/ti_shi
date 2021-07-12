<template>
  <div>
  <section class="pb-110" id='features'>
      <div class="container">
          <div class="row justify-content-center">
              <div class="col-md-12 col-lg-8">
                  <!-- section title -->
                  <div class="section-title text-center">
                      <h2>题士，不只是题库</h2>
                      <p>一款具备题目讨论、社区分享、错题整理等功能的优质刷题软件</p>
                  </div>
                  <!-- End of section title -->
              </div>
          </div>
          <div class="row justify-content-center">
              <div class="col-xl-10 col-lg-12">
                  <div class="feature-carousel owl-carousel">

                    <swiper :options="swiperOptions">

                      <swiper-slide>
                      <!-- single feature inner -->
                      <div class="single-feature-inner text-center">
                          <div class="feature-icon"><img src="/assets/img/icons/homework.svg" class="svg" alt=""></div>
                          <h5>支持多种模式下的题目练习</h5>
                          <p>直接浏览题目答案、快速过题的快速做题模式；顺序，乱序，分章节，智能推荐，模拟考试等多种方式的刷题模式。</p>
                      </div>
                      <!-- End of single feature inner -->
                      </swiper-slide>

                      <swiper-slide>
                      <!-- single feature inner -->
                      <div class="single-feature-inner text-center">
                          <div class="feature-icon"><img src="/assets/img/icons/notebook.svg" class="svg" alt=""></div>
                          <h5>支持丰富的题目管理功能</h5>
                          <p>题目收藏功能，错题整理功能，关键字搜索功能，题目笔记功能。用户通过该软件，对题目进行更个性化的管理。</p>
                      </div>
                      <!-- End of single feature inner -->
                      </swiper-slide>

                      <swiper-slide>
                      <!-- single feature inner -->
                      <div class="single-feature-inner text-center">
                          <div class="feature-icon"><img src="/assets/img/icons/solution.svg" class="svg" alt=""></div>
                          <h5>拥有活跃的用户社区</h5>
                          <p>资源共享社区、问答社区，并支持题目评论功能、笔记分享功能。用户可以在社区中探索或分享学习资源。</p>
                      </div>
                      <!-- End of single feature inner -->
                      </swiper-slide>

                      <swiper-slide>
                        <!-- single feature inner -->
                        <div class="single-feature-inner text-center">
                          <div class="feature-icon"><img src="/assets/img/icons/solution1.svg" class="svg" alt=""></div>
                          <h5>拥有完善的社区管理机制</h5>
                          <p>支持用户举报违规的评论，同时对用户上传的资源进行严格的审核，维护社区积极健康发展。</p>
                        </div>
                        <!-- End of single feature inner -->
                      </swiper-slide>

                      <swiper-slide>
                      <!-- single feature inner -->
                      <div class="single-feature-inner text-center">
                          <div class="feature-icon"><img src="/assets/img/icons/notification.svg" class="svg" alt=""></div>
                          <h5>具有贴心小功能</h5>
                          <p>设置相关科目的考试信息，如考试时间和注意事项等。避免用户遗漏关键信息。</p>
                      </div><!-- End of single feature inner -->
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                  </div><!--/.feature-carousel-->
              </div><!--/.col-->
          </div><!--/.row-->
      </div><!--/.container-->
  </section>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: "Features",
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    data() {
      return {
        swiperOptions: {
          slidesPerView : 3,
          loop: true,
          speed: 1000,
          spaceBetween : 30,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },

          // Responsive breakpoints
          breakpoints: {
            1024:{
                slidesPerView : 3
            },
            768:{
                slidesPerView : 2
            },
            640:{
                slidesPerView : 2
            },
            320:{
                slidesPerView : 1
            }
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>
