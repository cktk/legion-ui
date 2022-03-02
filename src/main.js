// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import App from './App'
import { router } from './router/index'
import store from './store'
import i18n from '@/locale'
import { getRequest, postRequest, putRequest, postBodyRequest, getNoAuthRequest, postNoAuthRequest } from '@/libs/axios'
import { setStore, getStore, removeStore } from '@/libs/storage'
import { format } from "date-fns"
import util from '@/libs/util'
import hasPermission from '@/libs/hasPermission'
import hasRole from '@/libs/hasRole'
import iviewArea from '@/views/my-components/iview-area'
import XIcon from '@/views/my-components/legion/x-icon'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import VueApexCharts from 'vue-apexcharts'
import './assets/iconfont/iconfont.css'
import '@babel/polyfill'

import AvueFormDesign from '@sscfaith/avue-form-design'
import basicContainer from '@/components/basic-container/main'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters' // 全局filter\
import { iconfontUrl, iconfontVersion } from '@/config/config'
import {loadStyle, downBlobFile} from '@/util/index'

// import Avue from '@smallwei/avue';
// import '@smallwei/avue/lib/index.css';
// Vue.use(Avue);

Vue.config.productionTip = false
Vue.use(VueLazyload, {
    error: require('./assets/img-error.png'),
    loading: require('./assets/loading2.gif')
})
Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.use(ElementUI, {
    size: 'small',
    menuType: 'text'
})
  
// 表单设计器
Vue.use(AvueFormDesign);
// 加载过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  
//   Vue.use(AVUE, {
//     size: 'small',
//     menuType: 'text'
//   })
  // 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.use(VueClipboard);
Vue.use(hasPermission);
Vue.use(hasRole);
Vue.use(iviewArea);
Vue.use(XIcon);
Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);
// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.postBodyRequest = postBodyRequest;
Vue.prototype.getNoAuthRequest = getNoAuthRequest;
Vue.prototype.postNoAuthRequest = postNoAuthRequest;
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;
Vue.prototype.format = format;
Vue.prototype.util = util;
Vue.prototype.getUserInfo = util.getUserInfo;


// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele))
  })
  

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
    },
    mounted() {
        // 加载主题
        this.$store.commit("setTheme", localStorage.theme);
        // 初始化菜单
        util.initRouter(this);
        // 设置用户信息
        this.$store.commit("setUserInfo", {
            nickname: localStorage.nickname,
            avatar: localStorage.avatar,
        });
        // 显示打开的页面的列表
        this.$store.commit("setOpenedList");
        this.$store.commit("initCachepage");
    }
})
