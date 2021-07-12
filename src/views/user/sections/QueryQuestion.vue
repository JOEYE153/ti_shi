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
              查询题目
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
            :items="questions"
            :headers="headers"
            :search="search"
            :items-per-page="10"
            :footer-props="{
              'items-per-page-options':[10]
            }"
          >
            <template v-slot:item.image_url="{ item }">
              <img
                v-if="item.image_url !== ''"
                :src="item.image_url"
                style="width: 100px;height: 100px"
              />
            </template>
            <template v-slot:body.append>
              <tr>
                <td>
                  <v-text-field
                    v-model="filterChapter"
                    type="number"
                    label="Chap"
                    style="width: 40px"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="filterQuestionId"
                    type="number"
                    label="ID"
                    style="width: 30px"
                  />
                </td>
              </tr>
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
    name: 'Query',

    data () {
      return {
        search: '',
        course: '',
        filterChapter: '',
        filterQuestionId: '',
        // questions: [
        //   {
        //     chapter_id: 1,
        //     id: 1,
        //     q_description: 'this is question',
        //     option_a: 'option a',
        //     option_b: 'option b',
        //     option_c: 'option c',
        //     option_d: 'option d',
        //     answer: 'A',
        //     image_url: 'buaatishi.com/1234',
        //     is_multi: 'y',
        //     error_rate: 23.23,
        //     complete_number: 34,
        //   },
        // ],
        courses: ['航概（理）', '航概（文）', '计算机导论'],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: '章节号',
            value: 'chapter_id',
            filter: value => {
              if (!this.filterChapter) return true
              return value === parseInt(this.filterChapter)
            },
            width: '1%',
          },
          {
            text: '题号',
            value: 'id',
            filter: value => {
              if (!this.filterQuestionId) return true
              return value === parseInt(this.filterQuestionId)
            },
          },
          {
            text: '问题',
            value: 'q_description',
          },
          { text: '选项A', value: 'option_a' },
          { text: '选项B', value: 'option_b' },
          { text: '选项C', value: 'option_c' },
          { text: '选项D', value: 'option_d' },
          { text: '正确答案', value: 'answer' },
          { text: '相关图片', value: 'image_url' },
          { text: '是否为多选题', value: 'is_multi' },
          { text: '错误率', value: 'error_rate' },
        ]
      },
      ...mapState(
        {
          questions: state => state.query.questions,
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
        const url = 'manage/query/?course_id=' + courseId
        this.$store.dispatch('GET_ALL_QUESTIONS', url,
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

<style lang="scss">
body {
  font-family:”Microsoft YaHei”,Arial,Helvetica,sans-serif,”宋体”;
}
</style>
