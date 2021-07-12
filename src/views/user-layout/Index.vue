<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/views/user-layout/AppBar'),
      HomeFooter: () => import('@/views/user-layout/Footer'),
      HomeView: () => import('@/views/user-layout/View'),
    },
  }
</script>
