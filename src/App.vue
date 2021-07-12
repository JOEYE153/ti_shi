<template>
  <router-view v-if="is_router_alive" />
</template>

<script>
  export default {
    name: 'App',
    metaInfo: {
      title: 'App',
      titleTemplate: 'Tipass',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    data () {
      return {
        is_router_alive: true,
      }
    },
    provide () {
      return {
        reload: this.reload,
      }
    },
    methods: {
      reload () {
        this.is_router_alive = false
        this.$nextTick(function () {
          this.is_router_alive = true
        })
      },
    },
  }
</script>

<style lang="sass">
  .extra-padding
    padding-bottom: 96px !important
    padding-top: 96px !important

    @media screen and (max-width: 959px)
      padding-top: 48px !important
      padding-bottom: 48px !important
</style>
