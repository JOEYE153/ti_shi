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
          添加|修改|删除|审核资源
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            md="3"
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
            md="3"
          >
            <v-select
              v-model="course"
              :items="courses"
              label="科目"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-text-field
              v-model="resource_id"
              label="资源序号"
            />
          </v-col>
          <v-col
            cols="12"
            md="3"
          >
            <v-file-input
              v-if="modify_type==='添加资源'"
              v-model="file"
              label="添加资源文件"
              class="mr-2"
              @change="process_file"
            />
          </v-col>
        </v-row>
        <v-row v-if="modify_type === '添加资源' || modify_type === '修改资源'">
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="topic"
              label="资源主题"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-textarea
              v-model="description"
              solo
              label="资源描述"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-row v-if="modify_type === '审核资源'">
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="pass"
              :items="passes"
              label="审核是否通过"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-textarea
              v-model="remark"
              solo
              label="审核说明"
              class="mr-2"
            />
          </v-col>
        </v-row>
        <v-row v-if="modify_type !== '删除资源'">
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="link"
              label="资源链接"
              class="ml-5"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="password"
              label="资源提取密码"
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
    name: 'ModifyResource',
    data () {
      return {
        modify_type: '添加资源',
        modify_types: ['添加资源', '修改资源', '删除资源', '审核资源'],
        file: undefined,
        course: '',
        resource_id: '',
        courses: ['航概（理）', '航概（文）', '计算机导论'],
        topic: '',
        description: '',
        link: '',
        password: '',
        resources: [],
        remark: '',
        pass: 0,
        passes: ['不予通过', '通过'],
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
      get_pass () {
        if (this.pass === '通过') {
          return 1
        } else {
          return 0
        }
      },
    },
    methods: {
      process_file () {
        const reader = new FileReader()
        reader.readAsText(this.file, 'UTF-8')
        reader.onload = (event) => {
          const file = JSON.parse(event.target.result)
          this.resources = file.resources
          console.log(this.resources)
        }
      },
      submit () {
        if (this.modify_type === '添加资源') {
          this.add()
        } else if (this.modify_type === '修改资源') {
          this.modify()
        } else if (this.modify_type === '删除资源') {
          this.delete()
        } else {
          this.check()
        }
      },
      add () {
        if (this.resources.length === 0) {
          this.resources.push({
            course_id: this.get_courseId,
            resource_id: this.resource_id,
            topic: this.topic,
            description: this.description,
            link: this.link,
            password: this.password,
          })
        }
        this.$store.dispatch('ADD_RESOURCE', {
          resources: this.resources,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
        this.resources = []
      },
      modify () {
        this.$store.dispatch('MODIFY_RESOURCE', {
          course_id: this.get_courseId,
          resource_id: this.resource_id,
          topic: this.topic,
          description: this.description,
          link: this.link,
          password: this.password,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      delete () {
        this.$store.dispatch('DELETE_RESOURCE', {
          course_id: this.get_courseId,
          resource_id: this.resource_id,
        }).then((response) => {
          if (response !== 'success') {
            alert(response)
          }
        }).catch(() => {
          console.log(this.error)
        })
      },
      check () {
        this.$store.dispatch('CHECK_RESOURCE', {
          course_id: this.get_courseId,
          resource_id: this.resource_id,
          check: this.get_pass,
          remark: this.remark,
          link: this.link,
          password: this.password,
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
