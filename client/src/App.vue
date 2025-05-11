<script setup>
import {RouterLink, RouterView} from 'vue-router';
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
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
