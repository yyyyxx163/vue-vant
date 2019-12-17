/**
 * 测试vuex
 */

const state = {
    sid: 0,
    uid: 0,
    token: ''
}

const getters = {
    Info: (state) => ({
        sid: state.sid,
        uid: state.uid,
        token: state.token
    })
}

const mutations = {
    setInfo: (state, {sid = 0, uid = 0, token = ''}) => {
        if(sid !== 0){
            state.sid = sid
        }
        if(uid !== 0){
            state.uid = uid
        }
        if(token !== ''){
            state.token = token
        }
    }
}

const actions = {
    initInfo: ({ commit }) => {
        let sInfo = {sid: 10, uid: 20, token: 'yyx'}
        commit('setInfo', sInfo)
    }
}

export default {
    state, 
    getters,
    mutations,
    actions,
    namespaced: true
}
