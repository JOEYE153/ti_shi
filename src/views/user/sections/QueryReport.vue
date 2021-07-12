<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <v-card class="mr-4 ml-4 elevation-6">
        <v-card-title>
          <span
            class="blue--text font-weight-bold"
            style="letter-spacing: 1px"
          >
            获取举报
          </span>
          <v-spacer />
          <v-text-field
            v-model="search"
            label="搜索题目关键字/题号"
            style="width: 0.2rem"
          />
          <v-btn
            class="primary ml-2"
            small
            @click="query"
          >
            重新获取
          </v-btn>
        </v-card-title>
        <v-data-table
          :items="reports"
          :headers="headers"
          :search="search"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options':[10]
          }"
        >
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Report',
    data () {
      return {
        search: '',
        // reports: [
        //   {
        //     id: 1,
        //     user_id: 1,
        //     reason: '举报理由',
        //     item: 1,
        //     table: '题目评论',
        //     time: '2021-05-28',
        //   },
        // ],
      }
    },
    computed: {
      headers () {
        return [
          { text: '举报序号', value: 'id' },
          { text: '举报者序号', value: 'user_id' },
          { text: '举报理由', value: 'reason' },
          { text: '举报表项序号', value: 'item' },
          { text: '所属表名', value: 'table_name' },
          { text: '举报时间', value: 'time' },
          { text: '举报内容', value: 'content' },
        ]
      },
      ...mapState(
        {
          reports: state => state.report.reports,
        },
      ),
    },
    mounted () {
      this.$store.dispatch('GET_ALL_REPORTS')
        .then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    methods: {
      query () {
        this.$store.dispatch('GET_ALL_REPORTS')
          .then((response) => {
            if (response !== 'success') {
              alert(response)
            }
          }).catch((err) => {
            console.log(err)
          })
      },
    },
  }
</script>

<style scoped>

</style>
