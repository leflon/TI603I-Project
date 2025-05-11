<template>
  <main class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      
      <label for="username">Enter your username:</label>
      <input 
        type="text" 
        id="username" 
        v-model="username" 
        placeholder="Username" 
        :class="{ 'input-error': usernameError }"
        required
      />
      <div v-if="usernameError" class="error-message">Username is required.</div>


      <label for="mdp">Enter your password:</label>
      <input 
        type="password" 
        id="mdp" 
        v-model="password" 
        placeholder="Password" 
        :class="{ 'input-error': passwordError }"
        required
      />
      <div v-if="passwordError" class="error-message">Password is required.</div>


      <button @click="handleLogin">Login</button>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

// Reactive state for form inputs and errors
const username = ref('');
const password = ref('');
const usernameError = ref(false);
const passwordError = ref(false);


// Handle the login action
const handleLogin = () => {
  // Reset errors
  usernameError.value = !username.value;
  passwordError.value = !password.value;

  // Check if both fields are valid
  if (!username.value || !password.value) {
    return;
  }


  // Dummy delay for demonstration (replace with actual login logic)
  setTimeout(() => {
    alert('Login successful!');
  }, 2000);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #555;
  display: block;
}

input {
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.875rem;
}

button {
  background-color: #ff4683;
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

button:hover {
  background-color: #e34c73;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}



@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
