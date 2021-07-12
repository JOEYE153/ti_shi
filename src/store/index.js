import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Query from './modules/query'
import Modify from './modules/modify'
import Resource from './modules/resource'
import Report from './modules/report'
import Comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: User,
    query: Query,
    modify: Modify,
    resource: Resource,
    report: Report,
    comment: Comment,
  },
})
