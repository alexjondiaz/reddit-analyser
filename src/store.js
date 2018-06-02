import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import reddit from './reddit.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: '',
    user: {
      name: '',
      created: '',
      comments: 0,
      comment: {
        new: {
          title: 'NEWEST COMMENT',
          body: '',
          karma: 0,
          created: 0,
        },
        top: {
          title: 'TOP COMMENT',
          body: '',
          karma: 0,
          created: 0,
        },
      },
      submissions: 0,
      submission: {
        top: {
          title: '',
          comments: 0,
          karma: 0,
          created: 0,
        },
      },
      karma: {
        link: 0,
        karma: 0,
      },
    },
  },
  mutations: {
    setUserByAPICall: (state, { metadata }) => (state.user = metadata),
    setUserByCookie: (state, { metadata }) => (state.user = metadata),
  },

  actions: {
    setUserByAPICall: async ({ commit }, user) => {
      const metadata = await reddit.metadata(user)
      const expirationTime = new Date(new Date().getTime() + 30 * 1000)
      Cookies.set(user, metadata, { expires: expirationTime })
      commit('setUserByAPICall', { metadata })
    },

    setUserByCookie: ({ commit }, payload) => {
      const metadata = Cookies.getJSON(payload)
      commit('setUserByCookie', { metadata })
    },
  },
})
