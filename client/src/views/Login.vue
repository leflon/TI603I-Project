<script setup>
import {store} from '@/lib/store';
import router from '@/router';
import {onMounted, reactive} from 'vue';


const issues = reactive({
    login: '',
    register: ''
});

onMounted(() => {
    if (store.user)
        router.push('/');

});


const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const json = Object.fromEntries(formData.entries());
    const action = form.id;
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/${action}`, {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (!data.success) {
            issues[action] = data.message;
        } else {
            router.push('/');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
</script>
<template>
    <form id='login' method='post' action='' @submit="onSubmit">
        <h2>Login</h2>
        <div class='issue' v-if='issues.login'>{{ issues.login }}</div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name='email' placeholder='john.doe@efrei.net'>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name='password'>
        </div>
        <button>Login</button>
    </form>
    <form id='register' method='post' action='' @submit="onSubmit">
        <h2>Register</h2>
        <div class='issue' v-if='issues.register'>{{ issues.register }}</div>
        <div>
            <label for='firstname'>First name</label>
            <input type="text" id="firstname" name='firstname' placeholder='John'>
        </div>
        <div>
            <label for='firstname'>Last name</label>
            <input type="text" id="lastname" name='lastname' placeholder='Doe'>
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name='email' placeholder='john.doe@efrei.net'>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name='password'>
        </div>
        <button>Register</button>
    </form>
</template>

<style>
form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    width: 500px;
}

form div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.issue {
    color: red;
    margin-bottom: 10px;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 6px;
}
</style>