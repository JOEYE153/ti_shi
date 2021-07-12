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
          处理举报
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="id"
              label="举报序号"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="user_id"
              label="举报者序号"
              class="mr-2"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="pass"
              :items="passes"
              label="举报是否成立"
              class="ml-5"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            @click="submit"
          >
            handle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ModifyReport',
    data () {
      return {
        id: undefined,
        user_id: undefined,
        pass: '',
        passes: ['成立', '不成立'],
      }
    },
    computed: {
      get_pass () {
        if (this.pass === '成立') {
          return 1
        } else {
          return 0
        }
      },
    },
    methods: {
      submit () {
        this.$store.dispatch('HANDLE_REPORT', {
          id: this.id,
          user_id: this.user_id,
          pass: this.get_pass,
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
