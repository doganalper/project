import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Unicon from './utils/Icons';

Vue.config.productionTip = false;
Vue.use(Unicon);

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
