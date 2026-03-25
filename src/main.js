import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import '@/assets/iconfont/iconfont.css';
import '@/assets/css/index.css';
import 'vant/lib/index.css';
import { marked } from '@/plugins/marked.js';
import { pinia } from '@/stores/index.js';

createApp(App).use(router).use(pinia).use(marked).mount('#app');
