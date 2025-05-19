<template>
  <div>
    <h2>Your Profile</h2>
    <div v-if="user">
      <p><strong>First Name:</strong> {{ user.first_name }}</p>
      <p><strong>Last Name:</strong> {{ user.last_name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

<script setup>
import { store } from '@/lib/store';
const user = store.user;
</script>