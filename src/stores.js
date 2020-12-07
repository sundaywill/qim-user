/**
 * THE VUEX STORE
 */

const LOGOUT = 'LOGOUT'
const FETCH_TOKEN = 'FETCH_TOKEN'
const FETCH_AUTH_USER = 'FETCH_AUTH_USER'
const FETCH_CHAT = 'FETCH_CHAT'
const FETCH_MESSAGES = 'FETCH_MESSAGES'
const FETCH_MESSAGE = 'FETCH_MESSAGE'

export default {
    state: {
        token: null,
        auth_user: null,
        chat: null,
        messages: []
    },
    mutations: {
        [LOGOUT](state) {
            state.token = null
            state.user = null
            localStorage.removeItem('qim.user.token')
        },
        [FETCH_TOKEN](state, token) {
            state.token = token
            localStorage.setItem('qim.user.token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        [FETCH_AUTH_USER](state, auth_user) {
            state.auth_user = auth_user
        },
        [FETCH_CHAT](state, chat) {
            state.chat = chat
        },
        [FETCH_MESSAGES](state, messages) {
            state.messages = lodash.union(messages, state.messages, (a, b) => {
                return a.id === b.id
            })
        },
        [FETCH_MESSAGE](state, message) {
            state.messages.push(message)
        },
    },
    actions: {
        logout({commit}) {
            return new Promise((resolve, reject) => {
                axios.post('logout').then(({data}) => {
                    resolve(data)
                }).catch(res => {
                    reject(res)
                }).finally(() => {
                    commit(LOGOUT)
                })
            })
        },
        login({commit}, form) {
            return new Promise((resolve, reject) => {
                axios.post("login", form).then(({data}) => {
                    commit(FETCH_TOKEN, data)
                    resolve(data)
                }).catch(res => {
                    reject(res)
                })
            });
        },
        fetchAuthUser({commit}) {
            return new Promise((resolve, reject) => {
                axios.get('auth_user').then(({data}) => {
                    commit(FETCH_AUTH_USER, data)
                    resolve(data);
                }).catch(res => {
                    reject(res)
                })
            })
        },
        fetchChat({commit}) {
            return new Promise((resolve, reject) => {
                axios.get(`chat`).then(({data}) => {
                    commit(FETCH_CHAT, data)
                    resolve(data)
                }).catch(res => {
                    reject(res)
                })
            })
        },
        fetchMessages({state, commit}, page) {
            return new Promise((resolve, reject) => {
                axios.get(`chat/${state.chat.id}/messages`, {
                    params: { page: page }
                }).then(({data}) => {
                    commit(FETCH_MESSAGES, data.items)
                    resolve(data)
                }).catch(res => {
                    reject(res)
                })
            })
        },
    },
    getters: {}
}
