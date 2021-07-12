<template>
  <div>
    <NavOne />
    <BannerOne />
    <Features />
    <Video />
    <Screenshots />
    <Compare />
    <DownloadApp />
    <Footer />
  </div>

</template>
<script>
  import NavOne from "../components/NavOne";
  import BannerOne from "../components/BannerOne";
  import Footer from "../components/Footer";
  import Features from "../components/Features";
  import Screenshots from "../components/Screenshots";
  import Compare from "../components/Compare";
  import DownloadApp from "../components/DownloadApp";
  import Video from "../components/Video"
  export default {
    components: {
      DownloadApp,
      Compare,
      Screenshots,
      Features,
      Footer,
      BannerOne,
      NavOne,
      Video
    }
  }
</script>
