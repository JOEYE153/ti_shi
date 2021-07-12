<template>
  <v-theme-provider dark>
    <base-section
      class="primary"
      space="36"
    >
      <v-row
        align="center"
        class="ma-0"
        justify="center"
      >
        <base-title
          space="0"
          title="获取题士的最新资讯"
        />

        <v-responsive
          class="px-4 mx-6"
          max-width="600"
          width="100%"
        >
          <base-text-field
            hide-details
            label="Your Email Address"
          >
            <template v-slot:append-outer>
              <v-btn
                class="ml-n1"
                height="40"
                outlined
                style="margin-top: -7px;"
              >
                订阅
              </v-btn>
            </template>
          </base-text-field>
        </v-responsive>
      </v-row>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'News',
  }
</script>

<style scoped>

</style>
