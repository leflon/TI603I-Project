<script setup>
import {RouterLink, RouterView} from 'vue-router';
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import {store} from './lib/store';
import {onMounted} from 'vue';
import call from './lib/api';

onMounted(async () => {
  const {user} = await call('/api/auth/me');
  if (user) {
    store.user = user;
  }
});
</script>

<template>
  <div>
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
* {
  text-align: center;
  box-sizing: border-box;
}
</style>
