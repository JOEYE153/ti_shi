import axios from 'axios'

export default {
  state: {
    questions: [],
  },

  getters: {},

  mutations: {
    SET_QUESTIONS (state, questions) {
      state.questions = questions
    },
  },

  actions: {
    GET_ALL_QUESTIONS: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_QUESTIONS', data.data.questions)
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
  },
}
