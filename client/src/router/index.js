import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/Home.vue';
<<<<<<< HEAD
import {store} from '../lib/store';
=======
import {store} from '@/lib/store';
>>>>>>> origin/master

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
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: {title: 'Admin Panel', requiresAdmin: true},
    },
  ],
});

router.beforeEach((to, from) => {
  const isLoggedIn = !!store.user; // Check if user is logged in
  console.log(store.user);
  const isAdmin = store.user?.is_admin || false; // Check if user is admin

  const protectedRoutes = ['users', 'cart'];
  // const adminRoutes = ['admin']; // adminRoutes variable is not used, can be removed or kept for clarity

  if (to.meta?.title) {
    document.title = to.meta.title + ' • Mist';
  } else {
    document.title = 'Mist';
  }
<<<<<<< HEAD

  // Redirect to login if trying to access a protected route and not logged in
  if (!isLoggedIn && protectedRoutes.includes(to.name)) {
    return {name: 'login', query: {redirect: to.fullPath}};
=======
  if (!isLoggedIn && to.name && protectedRoutes.includes(to.name)) {
    return '/login?redirect=/' + to.name ;
>>>>>>> origin/master
  }

  // Redirect to home if trying to access an admin route and not an admin
  if (to.meta?.requiresAdmin && !isAdmin) {
    return {name: 'home'}; // Or to a specific 'Unauthorized' page
  }

  // Prevent logged-in users from accessing login page, redirect to home
  if (isLoggedIn && to.name === 'login') {
    return {name: 'home'};
  }

  return true;
});

export default router;