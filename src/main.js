import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

app.use(store);
app.use(router);
app.mount('#app');
