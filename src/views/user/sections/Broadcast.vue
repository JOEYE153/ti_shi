<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <v-card class="elevation-6 ml-4 mr-4">
        <v-card-title
          class="primary--text"
          style="font-size: 15px;letter-spacing: 1px"
        >
          广播
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-textarea
              v-model="report"
              solo
              label="广播内容"
              class="mr-2 ml-5"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            @click="submit"
          >
            broadcast
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Report',
    data () {
      return {
        report: '',
      }
    },
    methods: {
      submit () {
        this.$store.dispatch('BROADCAST', {
          content: this.report,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
    },
  }
</script>

<style scoped>

</style>
