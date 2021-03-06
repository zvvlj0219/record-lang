import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

//load font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faThList } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//use font
library.add(faCog)
library.add(faChartPie)
library.add(faThList)
library.add(faClock)

//font-awesome component
Vue.component('font-awesome-icon', FontAwesomeIcon)

//config
Vue.config.productionTip = false

//create vue instance
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
