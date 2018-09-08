// ログインユーザ関連の情報を管理するmodule

import api from '../../api/axios';

export default {
    namespaced: true,
    state: {
        user: {
            id: null,
            email: null,
        },
    },
    getters: {},
    mutations: {
        registMutation(state, payload) {
            state.user = payload.content.user;
        },
        quitMutation(state, payload) {
            state.user = {id: null, email: null};
        },
        loginMutation(state, payload) {
            state.user = payload.content.user;
        },
        logoutMutation(state, payload) {
            state.user = {id: null, email: null};
        }
    },
    actions: {
        // ユーザ作成
        signUp({commit, state}, data) {
            api.post('/users', {user: data.user},
                (response) => {
                    commit('registMutation', response.data);
                },)
        },
        // ユーザ退会
        quit({commit, state}, user) {
            api.delete('/users', user)
                .then(response => commit('quitMutation', response))
                .catch(response => alert(response));
        },
        // ログイン
        login({commit, state}, data) {
            api.post('/users/sign_in', {user: data.user},
                (response) => {
                    commit('loginMutation', response.data);
                },)
        },
        // ログアウト
        logout({commit, state}) {
            api.delete('/users/sign_out')
                .then(response => commit('logoutMutation', response))
                .catch(response => alert(response));
        },
        // ログイン状態取得
        checkUser({commit, state}, callbacks) {
            api.get('/user/get_user', {}, (response) => {
                // ログイン済みであればログイン情報をstateに保存する
                if (response.data.content.user != null) {
                    commit('loginMutation', response.data);
                }
                callbacks.callback(response);
            });
        }
    }
}