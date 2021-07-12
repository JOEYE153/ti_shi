import axios from 'axios'

export default {
  state: {
    reports: [],
  },

  getters: {},

  mutations: {
    SET_REPORTS (state, reports) {
      state.reports = reports
    },
  },

  actions: {
    GET_ALL_REPORTS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios.get('manage/queryReport')
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_REPORTS', data.data.reports)
              resolve('success')
            } else {
              resolve('查询失败')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    HANDLE_REPORT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/handleReport', payload)
          .then(({ data }) => {
            if (data.code === 1) {
              resolve('success')
            } else {
              resolve('fail')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    BROADCAST: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/broadcast', payload)
          .then(({ data }) => {
            if (data.code === 1) {
              resolve('success')
            } else {
              resolve('fail')
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
}
