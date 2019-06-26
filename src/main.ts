import Vue from 'vue'
import VueApollo from 'vue-apollo'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang' // Internationalization
import '@/icons/components'
import '@/permission'
import '@/utils/error-log'
import '@/registerServiceWorker'
import * as filters from '@/filters'
import apolloClient from '@/apollo/config'

import { mockXHR } from '../mock'
mockXHR()

Vue.use(VueApollo)

Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: (h) => h(App)
}).$mount('#app')
