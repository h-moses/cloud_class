import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '../src/assets/fonts/iconfont.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import store from './store'

Vue.prototype.$video = Video
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
