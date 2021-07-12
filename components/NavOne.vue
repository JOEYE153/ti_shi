<template>
  <header class="header">
          <!-- Start Header Navbar-->
      <div :class="`main-header ${sticky ? 'sticky fadeInDown' : ''}`">
          <div class="main-menu-wrap">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                          <!-- Logo -->
                          <div style="width: 60px">
                              <nuxt-link to="/">
                                  <img src="/assets/img/tishi.png" alt="tishi">
                              </nuxt-link>
                          </div>
                          <!-- End of Logo -->
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
                          <div class="menu--inner-area clearfix">
                              <div class="menu-wraper">
                                  <nav>
                                      <!-- Header-menu -->
                                      <div class="header-menu dosis">

                                        <div id="menu-button" class="">
                                          <i class="fa fa-bars"></i>
                                        </div>

                                          <ul class="main-nav">
                                              <li><nuxt-link to="/">题士概览</nuxt-link></li>
                                              <li><a href="#features">特色功能</a></li>
                                              <li><a href="#app">产品介绍</a></li>
                                              <li><a href="#compare">竞品对比</a></li>
                                          </ul>
                                      </div>
                                      <!-- End of Header-menu -->
                                  </nav>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
                          <div class="urgent-call text-right">
                             <a href="#qrcode" class="btn">开始体验</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- End Header Navbar-->
  </header>
</template>

<script>
    export default {
      name: "NavOne",
      data(){
        return {
          sticky: false
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);

        this.mobileMenu();
      },

      methods: {

        handleScroll () {

          if (window.scrollY > 70) {
            this.sticky = true
          }
          else if (window.scrollY < 70) {
            this.sticky = false
          }
        },

        mobileMenu() {
            //Mobile Menu Toggle
            let mainNavToggler = document.querySelector("#menu-button");
            let mainNav = document.querySelector(".main-nav");

            mainNavToggler.addEventListener("click", function () {
                //mainNavToggler.classList.add('menu-opened');
                mainNav.style.display = ( (mainNav.style.display != "block" ? "block" : "none" ) );
            });
        }

      }
    }
</script>

<style scoped>

</style>
