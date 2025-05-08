import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {title: 'Mist Home Page'}
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
      path: '/carts',
      name: 'carts',
      component: () => import('../views/Cart.vue'),
      meta: {title: 'My Cart'}
    },
    {
      path: '/wishlists',
      name: 'wishlists',
      component: () => import('../views/Wishlist.vue'),
      meta: {title: 'My Wishlist'}
    },
    {
      path: '/product/:id',
      name: 'products',
      component: () => import('../views/Product.vue'),
      meta: {title: 'Our Products'}
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue'),
      meta: {title: 'Our Categories'}      
    }
  ],
})

router.beforeEach((to, from) => {
  // need to change isLoggedIn to verify if the user is already logged in
  const isLoggedIn = true;
  const protectedRoutes = ['users', 'wishlists', 'orders', 'carts']

  if (to.meta?.title){
    document.title = to.meta.title;
  } else {
    document.title = 'Mist';
  }
  if (!isLoggedIn && to.name && protectedRoutes.includes(to.name)) {
    return {name: 'login'};
  }
  return true;
})

export default router
;