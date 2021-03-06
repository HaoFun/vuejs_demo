import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './actions'

Vue.use(Vuex)

const state = {
    user: ls.getItem('user'),

    auth: ls.getItem('auth'),

    articles: ls.getItem('articles')
}

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user
        ls.setItem('user', user)
    },

    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem('auth', auth)
    },

    UPDATE_ARTICLES(state, articles) {
        state.articles = articles
        ls.setItem('articles', articles)
    }
}

const actions = {
    login({ commit }, user) {
        if (user) commit('UPDATE_USER', user)

        commit('UPDATE_AUTH', true)
        router.push('/')
    },
    logout({ commit }) {
        commit('UPDATE_AUTH', false)
        router.push({ name: 'Home', params: { Logout:true }})
    },
    updateUser({ commit }, user) {
        const stateUser = state.user
        if (stateUser && typeof stateUser === 'object') {
            user = { ...stateUser, ...user }
        }
        commit('UPDATE_USER', user)
    },
    ...moreActions
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store