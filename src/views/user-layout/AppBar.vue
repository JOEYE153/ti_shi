<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      height="80"
    >
      <v-spacer />

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
        >
          <v-tab
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            :ripple="false"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    name: 'HomeAppBar',
    data: () => ({
      drawer: null,
      items: [
        {
          name: 'User', link: '/user/count',
        },
        {
          name: 'Question', link: '/user/question',
        },
        {
          name: 'Comment', link: '/user/comment',
        },
        {
          name: 'Resource', link: '/user/resource',
        },
        {
          name: 'Report', link: '/user/report',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
