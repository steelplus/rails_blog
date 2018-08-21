import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import user from '../store/modules/user'
import router from '../routes';
import App from '../app';

Vue.use(Vuex);
Vue.use(VueRouter);

document.addEventListener('DOMContentLoaded', () => {
    const el = document.body.appendChild(document.createElement('index'));
    const app = new Vue({
        el,
        store: new Vuex.Store({
            modules: {
                user
            }
        }),
        router,
        render: h => h(App)
    });
});