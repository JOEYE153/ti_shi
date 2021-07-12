import axios from 'axios'

export default {
  state: {
    questionComment: [],
    questionCommentReply: [],
    posts: [],
    postComments: [],
  },

  getters: {},

  mutations: {
    SET_QUESTION_COMMENT (state, questionComment) {
      state.questionComment = questionComment
    },
    SET_QUESTION_COMMENT_REPLY (state, questionCommentReply) {
      state.questionCommentReply = questionCommentReply
    },
    SET_POST (state, posts) {
      state.posts = posts
    },
    SET_POST_COMMENT (state, comments) {
      state.postComments = comments
    },
  },

  actions: {
    GET_QUESTION_COMMENT: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_QUESTION_COMMENT', data.data.comments)
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
    GET_QUESTION_COMMENT_REPLY: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_QUESTION_COMMENT_REPLY', data.data.replys)
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
    GET_ALL_POSTS: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_POST', data.data.posts)
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
    GET_POST_COMMENT: ({ commit }, url) => {
      return new Promise((resolve, reject) => {
        axios.get(url)
          .then(({ data }) => {
            if (data.code === 1) {
              commit('SET_POST_COMMENT', data.data.comments)
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
    DELETE_QUESTION_COMMENT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/deleteQuestionComment', payload)
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
    DELETE_QUESTION_COMMENT_REPLY: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/deleteQuestionCommentReply', payload)
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
    DELETE_POST: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/deletePost', payload)
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
    DELETE_POST_COMMENT: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('manage/deletePostComment', payload)
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
