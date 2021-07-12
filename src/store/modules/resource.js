import axios from 'axios'

export default {
  state: {
    resources: [],
  },

  getters: {},

  mutations: {
    SET_RESOURCES (state, resources) {
      state.resources = resources
    },
  },

  actions: {
    GET_ALL_RESOURCES: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_RESOURCES', data.data.resources)
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
    ADD_RESOURCE: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/addResource', payload)
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
    MODIFY_RESOURCE: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/modifyResource', payload)
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
    DELETE_RESOURCE: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/deleteResource', payload)
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
    CHECK_RESOURCE: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/updateResource', payload)
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
