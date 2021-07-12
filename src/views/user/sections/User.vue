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
              日活跃度
            </span>
            <v-spacer />
            <v-menu
              ref="menuStart"
              v-model="menuStart"
              :close-on-content-click="false"
              :return-value.sync="pickerStart"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickerStart"
                  label="开始时间"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  class="mr-6 ml-6"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="pickerStart"
                no-title
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="menuStart = false"
                >
                  取消
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuStart.save(pickerStart)"
                >
                  确认
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu
              ref="menuEnd"
              v-model="menuEnd"
              :close-on-content-click="false"
              :return-value.sync="pickerEnd"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="pickerEnd"
                  label="结束时间"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  class="mr-6 ml-6"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="pickerEnd"
                no-title
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="menuEnd = false"
                >
                  取消
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menuEnd.save(pickerEnd)"
                >
                  确认
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-btn
              class="primary ml-2"
              small
              @click="query"
            >
              查询
            </v-btn>
          </v-card-title>
          <div>
            <apexchart
              :key="inc"
              type="line"
              height="350"
              :options="options"
              :series="activities"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
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
              用户统计
            </span>
            <v-spacer />
            <v-text-field
              v-model="search"
              label="搜索用户名"
              style="width: 0.2rem"
            />
          </v-card-title>
          <v-data-table
            dense
            :items="users"
            :headers="headers"
            :search="search"
            :items-per-page="5"
            :footer-props="{
              'items-per-page-options':[5]
            }"
          >
            <template v-slot:item.avatar="{ item }">
              <img
                :src="item.avatar"
                style="width: 100px;height: 100px"
              >
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
    inject: ['reload'],
    name: 'User',
    data () {
      return {
        search: '',
        start: '',
        end: '',
        inc: 1,
        pickerStart: new Date().toISOString().substr(0, 10),
        menuStart: false,
        pickerEnd: new Date().toISOString().substr(0, 10),
        menuEnd: false,
        // options: {
        //   chart: {
        //     height: 350,
        //     type: 'line',
        //     zoom: {
        //       enabled: false,
        //     },
        //   },
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   stroke: {
        //     curve: 'straight',
        //   },
        //   grid: {
        //     row: {
        //       colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        //       opacity: 0.5,
        //     },
        //   },
        //   xaxis: {
        //     categories: [],
        //   },
        // },
        // activities: [{
        //   name: '日活跃度',
        //   data: [1, 2, 3],
        // }],
        // users: [
        //   {
        //     username: 'joeye',
        //     avatar: 'https://pic.cnblogs.com/avatar/1961617/20200305193140.png',
        //     time: '2021-05-07 11:57:30',
        //   },
        //   {
        //     username: 'hhh',
        //     avatar: 'https://pic.cnblogs.com/avatar/1961617/20200305193140.png',
        //     time: '2021-05-07 11:57:30',
        //   },
        // ],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: '用户名',
            value: 'username',
            width: '20%',
          },
          {
            text: '头像',
            value: 'avatar',
          },
          {
            text: '注册时间',
            value: 'time',
          },
        ]
      },
      ...mapState(
        {
          users: state => state.user.users,
          options: state => state.user.options,
          activities: state => state.user.activities,
        },
      ),
    },
    // created () {
    //   this.reload()
    // },
    mounted () {
      this.$store.dispatch('GET_ALL_USERS',
      ).then((response) => {
        if (response !== 'success') {
          alert(response)
        }
      }).catch((err) => {
        console.log(err)
      })
      // this.$store.commit('RESET_ACTIVITY')
    },
    methods: {
      query () {
        if (this.pickerStart > this.pickerEnd) {
          alert('开始时间需要早于结束时间')
          return
        }
        const url = 'manage/activity?startTime=' + this.pickerStart + '&endTime=' + this.pickerEnd
        this.$store.dispatch('GET_ACTIVITY', url)
          .then((response) => {
            this.reload()
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
