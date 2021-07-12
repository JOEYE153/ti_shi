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
            查询帖子
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
          ></v-select>
          <v-btn
            class="primary ml-2"
            small
            @click="query"
          >
            查询
          </v-btn>
        </v-card-title>
        <v-data-table
          :items="posts"
          :headers="headers"
          :search="search"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options':[10]
          }"
        >
          <template v-slot:item.is_top="{ item }">
            <span v-if="item.is_top === 1">置顶</span>
            <span v-else>不置顶</span>
          </template>
          <template v-slot:item.post_type="{ item }">
            <span v-if="item.post_type === 1">讨论</span>
            <span v-else>提问</span>
          </template>
          <template v-slot:item.cur_status="{ item }">
            <span v-if="item.cur_status === 1">Open</span>
            <span v-else>Closed</span>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'QueryPost',
    data () {
      return {
        search: '',
        course: '',
        // posts: [
        //   {
        //     post_id: 1,
        //     user_id: 1,
        //     user_name: 'test',
        //     create_time: '2021-03-23',
        //     last_modified_time: '2021-04-23',
        //     post_title: 'test',
        //     people_in_discussion: 2,
        //     is_top: 1,
        //     post_type: 0,
        //     content: 'test',
        //     cur_status: 1,
        //   },
        // ],
        courses: ['航概（理）', '航概（文）', '计算机导论'],
      }
    },
    computed: {
      headers () {
        return [
          { text: '帖子id', value: 'post_id' },
          { text: '发贴人id', value: 'user_id' },
          { text: '发贴人用户名', value: 'user_name' },
          { text: '帖子创建时间', value: 'create_time' },
          { text: '帖子最后修改时间', value: 'last_modified_time' },
          { text: '帖子标题', value: 'post_title' },
          { text: '讨论次数', value: 'people_in_discussion' },
          { text: '是否置顶', value: 'is_top' },
          { text: '帖子类型', value: 'post_type' },
          { text: '帖子内容', value: 'content' },
          { text: '帖子当前状态', value: 'cur_status' },
        ]
      },
      ...mapState(
        {
          posts: state => state.comment.posts,
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
        const url = 'manage/queryPost/?course_id=' + courseId
        this.$store.dispatch('GET_ALL_POSTS', url,
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
