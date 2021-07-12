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
            查询题目评论回复
          </span>
          <v-spacer />
          <v-text-field
            v-model="search"
            label="搜索题目关键字/题号"
            style="width: 0.2rem"
          />
          <v-text-field
            v-model="comment"
            label="题目id"
            class="ml-2"
            style="width: 0.1rem"
          />
          <v-btn
            class="primary ml-2"
            small
            @click="query"
          >
            获取
          </v-btn>
        </v-card-title>
        <v-data-table
          :items="replies"
          :headers="headers"
          :search="search"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options':[10]
          }"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'QueryQuestionCommentReply',
    data () {
      return {
        comment: undefined,
        search: '',
      }
    },
    computed: {
      headers () {
        return [
          { text: '题目评论回复id', value: 'reply_id' },
          { text: '评论回复者id', value: 'user_id' },
          { text: '评论回复者', value: 'user_name' },
          { text: '评论回复创建时间', value: 'create_time' },
          { text: '评论回复内容', value: 'content' },
        ]
      },
      ...mapState(
        {
          replies: state => state.comment.questionCommentReply,
        },
      ),
    },
    methods: {
      query () {
        if (this.comment === undefined) {
          return
        }
        const url = 'manage/queryQuestionCommentReply/?comment_id=' + this.comment
        this.$store.dispatch('GET_QUESTION_COMMENT_REPLY', url,
        ).then((response) => {
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
