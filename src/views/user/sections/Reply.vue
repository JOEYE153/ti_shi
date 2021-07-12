<template>
  <base-section>
    <base-section-heading title="用户反馈">
    </base-section-heading>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <viewer title="QQ">
          <img
            :src="require('@/assets/timreply.jpg')"
            style="width: 250px;height: 300px;margin: 0 auto;justify-content: center;align-items: center;display: flex"
          />
        </viewer>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <viewer title="Wechat">
          <img
            :src="require('@/assets/wechatreply.jpg')"
            style="width: 250px;height: 300px;margin: 0 auto;justify-content: center;align-items: center;display: flex"
          />
        </viewer>
      </v-col>
    </v-row>
  </base-section>
</template>

<script>
  export default {
    name: 'Reply',
  }
</script>

<style scoped>

</style>
