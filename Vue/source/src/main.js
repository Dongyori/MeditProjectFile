// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import localforage from 'localforage'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import 'expose-loader?$!expose-loader?jQuery!jquery'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

localforage.config({
  name: 'budgeterbium'
})
