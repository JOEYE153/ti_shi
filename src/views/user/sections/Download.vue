<template>
  <base-section>
    <base-section-heading title="题士">
    </base-section-heading>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <viewer title="题士">
          <img
            :src="require('@/assets/qrcode.png')"
            style="width: 200px;height: 200px;margin: 0 auto;justify-content: center;align-items: center;display: flex"
          />
        </viewer>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <viewer title="题士">
          <img
            :src="require('@/assets/wechat.jpg')"
            style="width: 200px;height: 200px;margin: 0 auto;justify-content: center;align-items: center;display: flex"
          />
        </viewer>
      </v-col>
    </v-row>
  </base-section>
</template>

<script>
  export default {
    name: 'Download',
  }
</script>

<style scoped>
</style>
