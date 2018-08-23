import VueRouter from 'vue-router';
import Welcome from './components/page/Welcome'
import Home from './components/page/Home'

const routes = [
    {path: '/', component: Welcome,},
    {path: '/home', component: Home,}
];

export default new VueRouter({routes});