/**
 * 用户登录会话
 * 
 * @created: 2019-11-11
 * @Author: yyx (yyyyxx163@163.com)
 */
import $dataStore, { keys as $dataStoreKeys } from "@/common/utils/datastore-utils.js";

const state = {
    sid: 0,
    uid: 0,
    token: ''
 }

const getters = {
    info: (state) => ({
        sid: state.sid,
        uid: state.uid,
        token: state.token
    })
}

const mutations = {
    // 设置用户对话信息
    setInfo (state, { sid = 0, uid = 0, token = 0 }) {
        if(sid !== 0){
            state.sid = sid
        }
        if(uid !== 0){
            state.uid = uid
        }
        if(token !== 0){
            state.token = token
        }

        //缓存token的用户信息
        $dataStore.setItem($dataStoreKeys.USER_SESSION, state)
    },
}

const actions = {
    // 初始化用户信息
    initInfo: ({ commit }) => {
        // 从缓存中读取用户token等用户信息
        const sInfo = $dataStore.getItem($dataStoreKeys.USER_SESSION, false);
        if(sInfo){
            commit('setInfo', sInfo)
        }
    }
}

export default {
    state, 
    getters,
    mutations,
    actions,
    namespaced: true
}