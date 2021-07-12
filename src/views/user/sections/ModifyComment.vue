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
          删除评论|评论回复
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="delete_type"
              :items="delete_types"
              label="选择删除内容"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="id"
              :label="get_label"
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
            delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ModifyComment',
    data () {
      return {
        delete_type: '删除题目评论',
        delete_types: ['删除题目评论', '删除题目评论回复', '删除帖子', '删除帖子评论'],
        id: '',
      }
    },
    computed: {
      get_label () {
        if (this.delete_type === '删除题目评论') {
          return '题目评论id'
        } else if (this.delete_type === '删除题目评论回复') {
          return '题目评论回复id'
        } else if (this.delete_type === '删除帖子') {
          return '帖子id'
        } else if (this.delete_type === '删除帖子评论') {
          return '帖子评论id'
        } else {
          return ''
        }
      },
    },
    methods: {
      submit () {
        if (this.delete_type === '删除题目评论') {
          this.deleteQuestionComment()
        } else if (this.delete_type === '删除题目评论回复') {
          this.deleteQuestionCommentReply()
        } else if (this.delete_type === '删除帖子') {
          this.deletePost()
        } else if (this.delete_type === '删除帖子评论') {
          this.deletePostComment()
        } else {
          //
        }
      },
      deleteQuestionComment () {
        console.log(this.id)
        this.$store.dispatch('DELETE_QUESTION_COMMENT', {
          comment_id: this.id,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      deleteQuestionCommentReply () {
        this.$store.dispatch('DELETE_QUESTION_COMMENT_REPLY', {
          reply_id: this.id,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      deletePost () {
        this.$store.dispatch('DELETE_POST', {
          post_id: this.id,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      deletePostComment () {
        this.$store.dispatch('DELETE_POST_COMMENT', {
          post_comment_id: this.id,
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
