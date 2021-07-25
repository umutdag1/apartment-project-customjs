import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification';
import CKEditor from '@ckeditor/ckeditor5-vue';
import mitt from 'mitt';

import './index.css';
import 'vue-toast-notification/dist/theme-sugar.css';

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;

app
.use(store)
.use(router)
.use(VueAxios, axios)
.use(VueToast)
.use(CKEditor)
.mount('#app')
