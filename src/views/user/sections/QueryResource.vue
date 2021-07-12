<template>
  <base-section>
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
              查询资源
            </span>
            <v-spacer />
            <v-text-field
              v-model="search"
              label="搜索资源关键字/资源序号"
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
            :items="resources"
            :headers="headers"
            :search="search"
            :items-per-page="10"
            :footer-props="{
              'items-per-page-options':[10]
            }"
          >
            <template v-slot:item.check="{ item }">
              <span v-if="item.check === 1">已通过</span>
              <span v-else>未通过</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </base-section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'QueryResource',
    data () {
      return {
        search: '',
        course: '',
        // resources: [
        //   {
        //     resource_id: 1,
        //     user_id: 1,
        //     username: 'joeye',
        //     topic: '航概考题',
        //     description: '优质资源',
        //     link: 'https://bhpan.buaa.edu.cn/123123',
        //     time: '2021-05-23',
        //     password: 'abcd',
        //     isCheck: 0,
        //   },
        // ],
        courses: ['航概（理）', '航概（文）', '计算机导论'],
      }
    },
    computed: {
      headers () {
        return [
          { text: '资源序号', value: 'resource_id' },
          { text: '上传者序号', value: 'user_id' },
          { text: '上传者', value: 'username' },
          { text: '资源主题', value: 'topic' },
          { text: '资源描述', value: 'description' },
          { text: '资源链接', value: 'link' },
          { text: '资源上传时间', value: 'time' },
          { text: '资源提取密码', value: 'password' },
          { text: '资源是否通过审核', value: 'isCheck' },
        ]
      },
      ...mapState(
        {
          resources: state => state.resource.resources,
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
        const url = 'manage/queryResource/?course_id=' + courseId
        this.$store.dispatch('GET_ALL_RESOURCES', url,
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
