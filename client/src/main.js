import './assets/main.css';

import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './lib/store';
import call from './lib/api';

async function bootstrap() {
    const {user} = await call('/api/auth/me');
    if (user) {
        store.user = user;
    }
    const {cart} = await call('/api/cart/get');
    if (cart) {
        store.cart = cart;
    }
    const {wishlist} = await call('/api/users/wish');
    if (wishlist) {
        store.wishlist = wishlist;
    }
    const {orders} = await call('/api/users/orders');
    if (orders) {
        store.orders = orders;
    }
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
}

bootstrap();



