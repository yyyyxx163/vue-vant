import Vue from 'vue'
import Vuex from 'vuex'
import userSession from '@/store/modules/user/user-session';
import test from '@/store/modules/test/test';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userSession,
    test
  }
})
