<script setup>
import {onMounted} from 'vue';
import {RouterView} from 'vue-router';
import Navbar from './components/Navbar.vue';

onMounted(async () => {

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
