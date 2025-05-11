<template>
  <div v-if="user" class="user-detail">
    <h2>Your Profile</h2>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Last name:</strong> {{ user.lastName }}</p>
    <p><strong>First name:</strong> {{ user.firstName }}</p>
  </div>
  <div v-else>
    Loading user profile...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/profile');
    if (!response.ok) {
      throw new Error('No user has been fetched.');
    }
    const data = await response.json();
    console.log('Response data:', data);
    user.value = data.user;
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>


