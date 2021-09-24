import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import VueToast from 'vue-toast-notification';
import CKEditor from '@ckeditor/ckeditor5-vue';

import './index.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

const app = createApp(App);

app
    .use(store)
    .use(router)
    .use(VueLoading)
    .use(VueAxios, axios)
    .use(VueToast)
    .use(CKEditor)
    .mount('#app')
