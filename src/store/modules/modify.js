import axios from 'axios'

export default {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    IMAGE: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('', payload)
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
    ADD_QUESTION: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/add', payload)
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
    MODIFY_QUESTION: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/modify', payload)
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
    DELETE_QUESTION: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/delete', payload)
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
