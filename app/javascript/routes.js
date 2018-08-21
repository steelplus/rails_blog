import VueRouter from 'vue-router';
import Welcome from './components/page/Welcome'

const routes = [{
    path: '/', component: Welcome,
}];

export default new VueRouter({ routes });