// ログインユーザ関連の情報を管理するmodule
import api from '../../api/axios';
import 'babel-polyfill';

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
        async signUp({commit, state}, data) {
            await api.post('/users', {user: data.user},
                (response) => {
                    commit('registMutation', response.data);
                });
        },
        // ユーザ退会
        async quit({commit, state}, data) {
            await api.delete('/users', {user: data.user},
                (response) => {
                    commit('quitMutation', response);
                });
        },
        // ログイン
        async login({commit, state}, data) {
            await api.post('/users/sign_in', {user: data.user},
                (response) => {
                    commit('loginMutation', response.data);
                });
        },
        // ログアウト
        async logout({commit, state}) {
            await api.delete('/users/sign_out', {},
                (response) => {
                    commit('logoutMutation', response);
                });
        },
        // ログイン状態取得
        async checkUser({commit, state}) {
            await api.get('/user/get_user', {},
                (response) => {
                    // ログイン済みであればログイン情報をstateに保存する
                    if (response.data.content.user != null) {
                        commit('loginMutation', response.data);
                    }
                });
        }
    }
}