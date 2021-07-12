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
          添加|修改|删除题目
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="modify_type"
              :items="modify_types"
              label="选择修改类型"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-file-input
              v-if="modify_type==='添加题目'"
              v-model="file"
              label="添加题目文件"
              class="mr-2 ml-2"
              @change="process_file"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="course"
              :items="courses"
              label="科目"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="chapter_id"
              label="章节号"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="question_id"
              label="题号"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-row v-if="modify_type!=='删除题目'">
          <v-col
            cols="12"
            md="8"
          >
            <v-textarea
              v-model="q_description"
              solo
              label="问题"
              class="mr-2 ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-file-input
              v-model="image"
              label="添加题目图片"
              @change="process_image"
            />
          </v-col>
          <v-col
            cols="12"
            md="2"
          >
            <v-select
              v-model="answer"
              :items="answers"
              multiple
              label="答案"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-row v-if="modify_type!=='删除题目'">
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="option_a"
              label="选项A"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="option_b"
              label="选项B"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="option_c"
              label="选项C"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="option_d"
              label="选项D"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            @click="submit"
          >
            modify
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ModifyQuestion',
    data () {
      return {
        modify_type: '添加题目',
        modify_types: ['添加题目', '修改题目', '删除题目'],
        file: undefined,
        image: undefined,
        course: '',
        chapter_id: '',
        courses: ['航概（理）', '航概（文）', '计算机导论'],
        question_id: '',
        questions: [],
        q_description: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        answer: [],
        answers: ['A', 'B', 'C', 'D'],
      }
    },
    computed: {
      get_courseId () {
        let courseId = 0
        if (this.course === '航概（理）') {
          courseId = 1
        } else if (this.course === '航概（文）') {
          courseId = 2
        } else if (this.course === '计算机导论') {
          courseId = 3
        }
        return courseId
      },
    },
    methods: {
      process_file () {
        const reader = new FileReader()
        reader.readAsText(this.file, 'UTF-8')
        reader.onload = (event) => {
          const file = JSON.parse(event.target.result)
          this.questions = file.questions
          console.log(this.questions)
        }
      },
      submit () {
        // todo get image url
        if (this.modify_type === '添加题目') {
          this.add()
        } else if (this.modify_type === '修改题目') {
          this.modify()
        } else {
          this.delete()
        }
      },
      process_image () {
        // todo
      },
      add () {
        if (this.questions.length === 0) {
          this.questions.push({
            course_id: this.get_courseId,
            chapter_id: this.chapter_id,
            id: this.question_id,
            q_description: this.q_description,
            option_a: this.option_a,
            option_b: this.option_b,
            option_c: this.option_c,
            option_d: this.option_d,
            answer: this.answer,
            image_url: this.image_url,
            is_multi: this.answer.length > 1,
          })
        }
        this.$store.dispatch('ADD_QUESTION', {
          questions: this.questions,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
        this.questions = []
      },
      modify () {
        this.$store.dispatch('MODIFY_QUESTION', {
          course_id: this.get_courseId,
          chapter_id: this.chapter_id,
          id: this.question_id,
          q_description: this.q_description,
          option_a: this.option_a,
          option_b: this.option_b,
          option_c: this.option_c,
          option_d: this.option_d,
          answer: this.answer,
          image_url: this.image_url,
          is_multi: this.answer.length === 0 ? undefined : this.answer.length > 1,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      delete () {
        this.$store.dispatch('DELETE_QUESTION', {
          course_id: this.get_courseId,
          chapter_id: this.chapter_id,
          id: this.question_id,
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
