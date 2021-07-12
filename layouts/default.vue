<template>
    <nuxt />
</template>


<script>

  export default {
    components: {
    },
    head(){
      return {
        title: "题士"
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
    }
  }
</script>

<style>
</style>
