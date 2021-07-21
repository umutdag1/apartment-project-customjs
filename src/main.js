import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification';

import './index.css';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(VueToast)
    .mount('#app')
