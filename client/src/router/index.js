import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/Home.vue';
import {store} from '@/lib/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {title: 'Home'}
    },
    {
      path: '/support',
      name: 'support',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Support.vue'),
      meta: {title: 'Support'}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {title: 'Login'}
    },
    {
      path: '/account',
      name: 'users',
      component: () => import('../views/UserAccount.vue'),
      meta: {title: 'My Account'}
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue'),
      meta: {title: 'My Cart'}
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/Product.vue'),
      meta: {title: 'Product'},
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      meta: {title: 'Search'}
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue'),
      meta: {title: 'Categories'},
    },
  ],
});

router.beforeEach((to, from) => {
  const isLoggedIn = store.user;
  const protectedRoutes = ['users', 'cart'];

  if (to.meta?.title) {
    document.title = to.meta.title + ' • Mist';
  } else {
    document.title = 'Mist';
  }
  if (!isLoggedIn && to.name && protectedRoutes.includes(to.name)) {
    return '/login?redirect=/' + to.name ;
  }
  return true;
});

export default router;