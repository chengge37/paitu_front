import '@babel/polyfill'
//require('es6-promise').polyfill();
//require('es6-promise/auto');
import Vue from 'vue'
import Element from 'element-ui'
if (process.env.NODE_ENV === 'development') require('element-ui/lib/theme-chalk/index.css')

import App from './App.vue'
import router from './router'
import store from './store';
import filters from './filter'
import echarts from 'echarts'
import animated from 'animate.css'
import VueAMap from 'vue-amap';

// 导入全景图相关包
import 'pannellum/build/pannellum.js'
import 'pannellum/build/pannellum.css'

// 导入取色器
// import { Photoshop } from 'vue-color'
// Vue.use(Photoshop, {
//   el: '#app',
//   components: {
//     'material-picker': material,
//     'compact-picker': compact,
//     'swatches-picker': swatches,
//     'slider-picker': slider,
//     'sketch-picker': sketch,
//     'chrome-picker': chrome,
//     'photoshop-picker': photoshop
//   },
// })


// 导入轮播图样式
import 'swiper/css/swiper.min.css';

import AliSvgIcon from './views/components/SvgIcon/ali'
// import Chat from './views/pages/front_page/components/beautiful-chat/src'

//导入iconfont
import './assets/css/iconfont/iconfont.css'


//主css
require('@css/index.scss')
// 这里是为了修改被element覆盖的问题，但是，这似乎是import和require工作机制问题
// 啧，暂时这样可用
require('@css/element-ui.css')

//导入设备检测
import './util/browserCheck.js';


import './util/httpUtil.js';
//导入表格导出功能
import './util/tableExport.js';
import './util/progress'
import 'nprogress/nprogress.css'
// 导入极验
import '@/util/gt.js'
// 导入错误抓取
// import './util/errorLogs'



//导入打印模块
import Print from '@/util/print.js'

Vue.use(Print);


import vRometeJs from 'v-remote-js'
Vue.use(vRometeJs)


//导入全局自定义指令
import directives from '@/directive/index.js'

//导入全局公共函数
import * as util from './common/function/util.js'
//导入全局验证函数
import * as validate from './util/validate.js'
//导入全局变量
import * as config from '@config/config.js'

Vue.prototype.$staticCategoryTree = staticCategoryTree;
Vue.prototype.$staticBrandArray = staticBrandArray;
Vue.prototype.$staticEquipArray = staticEquipArray;
Vue.prototype.$staticCityArray = staticCityArray;
Vue.prototype.$staticAllCityArray = staticAllCityArray


// 导入七牛的qiniu-js
import * as qiniu from 'qiniu-js'
// 图片裁剪组件
import VuejsClipper from 'vuejs-clipper'
Vue.use(VuejsClipper, {
  components: {
    // 把其中某些组件注册为全局组件
    clipperBasic: true,
    clipperPreview: true,
    clipperUpload: true,
    clipperFixed: true,
    clipperPreview: true,
    clipperRange: true
  }
})
Vue.use(VuejsClipper)

//导入视频组件
import Videojs from 'video.js'
 
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Videojs;

//回到顶部方法
import VBack from 'v-back'

Vue.use(VBack)

// or with options
Vue.use(VBack, {
  el: '#app',
  duration: 300,
  distance: '50px'
})

Vue.use(directives);

Vue.prototype.util = util;
Vue.prototype.config = config;
Vue.prototype.$qiniuHost = config.qiniuHost;
Vue.prototype.validate = validate;

// 挂载七牛
Vue.prototype.$qiniu = qiniu;

Vue.prototype.echarts = echarts;
// 挂载原型
Vue.prototype.$initGeet = window.initGeetest;

//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$socketUrl= process.env.SOCKET_URL;

Vue.use(Element);
Vue.use(animated)
Vue.use(VueAMap);
Vue.component('ali-svg-icon', AliSvgIcon)
// Vue.use(Chat)

VueAMap.initAMapApiLoader({
  key: 'f95c3466594d19fa1c152220e0492fe4',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Weather', 'AMap.Marker'],
  v: '1.4.15',
  uiVersion: '1.0.11'
});

//初始化SOCKET

// import PaituSocketClient from "./common/socket";
// Vue.prototype.$PaituSocketClient = new PaituSocketClient(store,process.env.SOCKET_URL);
import VueNativeSock from 'vue-native-websocket'

console.error('连接地址'+process.env.SOCKET_URL);
Vue.use(VueNativeSock, process.env.SOCKET_URL, {
    store: store,
    protocol: store.getters.is_login_in?store.getters.user_data.token:null,
    reconnection: true, 
    reconnectionAttempts: 20, 
    reconnectionDelay: 3000,
    connectManually: true,
  })

const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
if(store.getters.is_login_in){
  console.error('#______####_____ 有用户数据开始连接');
  vue.$connect();
} else {

}
export default vue