<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue'
  import Home from './views/Home.vue'
</script>

<template>
  <div>
    <h1>WELCOME TO MIST !</h1>
    <Navbar/>
    <RouterView />
  </div>
</template>

<style scoped>
  *{
    text-align: center;
  }
  h1{
    margin: 0;
    color: var(--color-dark);
    margin: 20px;
  }
</style>
