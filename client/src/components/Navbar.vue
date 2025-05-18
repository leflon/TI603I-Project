<script setup>
import {RouterLink, RouterView, useRouter} from 'vue-router';
import {store} from '@/lib/store';
import call from '@/lib/api';
import {computed, ref} from 'vue';


const searchQuery = ref('');
const router = useRouter();

const itemsInCart = computed(() => {
  let count = 0;
  for (const item of Object.values(store.cart)) {
    count += item.quantity;
  }
  return count;
});

const logout = async () => {
  await call('/api/auth/logout', {method: 'POST'});
  store.user = null;
  router.push('/login');
};


const search = async () => {
  const query = searchQuery.value;
  if (query) {
    router.push({name: 'search', query: {name: query}});
  }
};
</script>

<template>
  <nav>
    <div class="nav-left">
      <RouterLink to="/">MIST</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/support">About</RouterLink>
      <RouterLink to="/admin" v-if="store.user && store.user.is_admin">Admin</RouterLink>
      <input type="text" placeholder="Search" class="search" v-model.trim='searchQuery' @keydown.enter='search' />
    </div>
    <div class="nav-right">
      <RouterLink to="/cart">
        <div class='cart-size' v-if='itemsInCart > 0'>{{ itemsInCart }}</div>
        <i class="fa-solid fa-cart-shopping"></i>
      </RouterLink>
      <RouterLink to="/account"><i class="fa-solid fa-circle-user"></i></RouterLink>
      <a href='#' @click='logout' v-if='store.user'>Log out ({{ store.user.first_name + ' ' + store.user.last_name
        }})</a>
      <RouterLink to="/login" v-else>Log in</RouterLink>
    </div>
  </nav>
</template>


<style scoped>
nav {
  z-index: 1000;
  position: sticky;
  top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  text-align: center;
  flex-wrap: wrap;
  background-color: var(--color-tertiary);
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(99, 99, 99, 0.383) 0px 2px 8px 0px;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

nav a {
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: white;
}

.cart-size {
  position: absolute;
  top: -9px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

input {
  font-size: 15px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  outline: none;
  padding: 5px;
  width: 200px;
  height: 30px;
}

input:focus {
  border: 2px solid var(--color-primary);
}

::placeholder {
  font-size: 15px;
}

i {
  color: white;
}

nav a:hover,
i:hover {
  color: var(--color-primary);
}
</style>
