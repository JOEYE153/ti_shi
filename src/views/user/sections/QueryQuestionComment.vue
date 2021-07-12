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
            查询题目评论
          </span>
          <v-spacer />
          <v-text-field
            v-model="search"
            label="搜索题目关键字/题号"
            style="width: 0.2rem"
          />
          <v-select
            v-model="course"
            :items="courses"
            label="选择科目"
            class="ml-2"
            style="width: 0.1rem"
          />
          <v-text-field
            v-model="question"
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
          :items="comments"
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
    name: 'QueryQuestionComment',
    data () {
      return {
        course: '',
        courses: ['航概（理）', '航概（文）', '计算机导论'],
        question: undefined,
        search: '',
      }
    },
    computed: {
      headers () {
        return [
          { text: '题目评论id', value: 'comment_id' },
          { text: '评论者id', value: 'user_id' },
          { text: '评论者', value: 'user_name' },
          { text: '评论时间', value: 'create_time' },
          { text: '评论内容', value: 'content' },
        ]
      },
      ...mapState(
        {
          comments: state => state.comment.questionComment,
        },
      ),
    },
    methods: {
      query () {
        let courseId = 0
        if (this.course === '航概（理）') {
          courseId = 1
        } else if (this.course === '航概（文）') {
          courseId = 2
        } else if (this.course === '计算机导论') {
          courseId = 3
        } else {
          alert('请选择科目')
          return
        }
        if (this.question === undefined) {
          return
        }
        const url = 'manage/queryQuestionComment/?course_id=' + courseId + '&question_id=' + this.question
        this.$store.dispatch('GET_QUESTION_COMMENT', url,
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
