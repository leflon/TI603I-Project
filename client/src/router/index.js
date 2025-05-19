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
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {title: 'Login'}
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
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: {title: 'Admin Panel', requiresAdmin: true},
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
      meta: {title: 'My Orders'}
    },
  ],
});

router.beforeEach((to, from) => {
  const isLoggedIn = !!store.user; // Check if user is logged in
  const isAdmin = store.user?.is_admin || false; // Check if user is admin

  const protectedRoutes = ['cart', 'orders', 'admin']; // Define protected routes

  if (to.meta?.title) {
    document.title = to.meta.title + ' • Mist';
  } else {
    document.title = 'Mist';
  }

  // Redirect to login if trying to access a protected route and not logged in
  if (!isLoggedIn && protectedRoutes.includes(to.name)) {
    return {name: 'login', query: {redirect: to.fullPath}};
  }

  // Redirect to home if trying to access an admin route and not an admin
  if (to.meta?.requiresAdmin && !isAdmin) {
    return {name: 'home'}; 
  }

  // Prevent logged-in users from accessing login page, redirect to home
  if (isLoggedIn && to.name === 'login') {
    return {name: 'home'};
  }

  return true;
});

export default router;