// ログインユーザ関連の情報を管理するmodule

import api from '../../api/axios';

export default {
    namespaced: true,
    state: {
        user: {
            id: null,
            email: null,
        },
        message: {
            info: null,
            error: null,
        }
    },
    getters: {
        id: state => state.id
    },
    mutations: {
        registMutation(state, payload) {
            state.user = payload.user;
            state.message.info = payload.message;
        },
        quitMutation(state, payload) {
            state.user = {id: null, email: null};
            state.message.info = payload.message;
        },
        loginMutation(state, payload) {
            state.user = payload.user;
            state.message.info = payload.message;
        },
        logoutMutation(state, payload) {
            state.user = {id: null, email: null};
            state.message.info = payload.message;
        }
    },
    actions: {
        // ユーザ作成
        signUp({commit, state}, user) {
            api.post('/users', user)
                .then(response => commit('registMutation', response))
                .catch(response => alert(response));
        },
        // ユーザ退会
        quit({commit, state}, user) {
            api.delete('/users', user)
                .then(response => commit('quitMutation', response))
                .catch(response => alert(response));
        },
        // ログイン
        login({commit, state}, user) {
            api.post('/users/sign_in', user)
                .then(response => commit('loginMutation', response))
                .catch(response => alert(response));
        },
        // ログアウト
        logout({commit, state}) {
            api.delete('/users/sign_out')
                .then(response => commit('logoutMutation', response))
                .catch(response => alert(response));
        }
    }
}