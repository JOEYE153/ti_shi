import axios from 'axios'

export default {
  state: {
    users: [],
    activities: [],
    options: {},
  },

  getters: {},

  mutations: {
    SET_INFORMATION (state, token) {
      sessionStorage.setItem('loginStatus', 'success')
      sessionStorage.setItem('role', 'admin')
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = token
    },
    DELETE_INFORMATION () {
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loginStatus')
      delete axios.defaults.headers.common.Authorization
    },
    SET_ALL_USERS (state, users) {
      state.users = users
    },
    RESET_ACTIVITY (state) {
      state.options = {}
      state.activities = []
      console.log('reset')
    },
    SET_ACTIVITY (state, data) {
      // state.options.xaxis.categories = data.dates
      // data = JSON.parse(JSON.stringify(data))
      state.options = {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: data.dates,
        },
      }
      // console.log(state.options)
      state.activities = []
      state.activities.push({
        name: '日活跃度',
        data: data.result,
      })
      // console.log(state.activities)
    },
  },

  actions: {
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('login/email', payload)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_INFORMATION', data.data.token)
              resolve('success')
            } else {
              resolve('用户不存在')
            }
          })
          .catch(err => {
            commit('DELETE_INFORMATION')
            reject(err)
          })
      })
    },
    GET_ALL_USERS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios.get('manage/registration')
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_ALL_USERS', data.data.result)
              resolve('success')
            } else {
              resolve('获取用户数据失败')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ACTIVITY: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_ACTIVITY', data.data)
              resolve('success')
            } else {
              resolve('日活跃度查询失败')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
