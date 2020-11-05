import Vue from 'vue';
import App from './App.vue';
import MintUI from 'mint-ui';
import {volumeLink} from './config/index'

import 'mint-ui/lib/style.css';
// 路由文件
import { router } from './router';
import './assets/scss/index.scss';
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'',
    loading:''
})
Vue.use(MintUI)
new Vue({
    router,
    el: '#app',
    components: { App },
    template: '<app></app>',
});
