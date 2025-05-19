
import {createApp} from 'vue';
import App from './App.vue';
import './assets/main.css';
import call from './lib/api';
import {store} from './lib/store';
import router from './router';

async function bootstrap() {
  const {user} = await call('/api/auth/me');
  if (user) {
    store.user = user;
  }
  const {cart} = await call('/api/cart/get');
  if (cart) {
    store.cart = cart;
  }
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

bootstrap();



