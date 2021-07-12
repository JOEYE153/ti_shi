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
            查询帖子评论
          </span>
          <v-spacer />
          <v-text-field
            v-model="search"
            label="搜索题目关键字/题号"
            style="width: 0.2rem"
          />
          <v-text-field
            v-model="post"
            label="帖子id"
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
          :items="comments"
          :headers="headers"
          :search="search"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options':[10]
          }"
        >
          <template v-slot:item.is_right_answer="{ item }">
            <span v-if="item.is_right_answer === 1">已标记</span>
            <span v-else>未标记</span>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'QueryPostComment',
    data () {
      return {
        post: undefined,
        search: '',
      }
    },
    computed: {
      headers () {
        return [
          { text: '帖子评论id', value: 'post_comment_id' },
          { text: '评论者id', value: 'user_id' },
          { text: '评论者', value: 'user_name' },
          { text: '帖子评论创建时间', value: 'create_time' },
          { text: '帖子评论内容', value: 'content' },
          { text: '帖子被点赞次数', value: 'like_count' },
          { text: '帖子评论是否被标记为答案', value: 'is_right_answer' },
        ]
      },
      ...mapState(
        {
          comments: state => state.comment.postComments,
        },
      ),
    },
    methods: {
      query () {
        if (this.post === undefined) {
          return
        }
        const url = 'manage/queryPostComment/?post_id=' + this.post
        this.$store.dispatch('GET_POST_COMMENT', url,
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
