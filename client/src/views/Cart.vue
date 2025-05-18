<script setup>
import {store} from '@/lib/store';
import {onMounted, computed} from 'vue';
import {useRouter} from 'vue-router';
import call from '@/lib/api';

const router = useRouter();
const total = computed(() => {
    let total = 0;
    for (const item of Object.values(store.cart)) {
        total += item.price * item.quantity;
    }
    return total.toFixed(2);
});



const onRemove = async (id) => {
    const res = await call('/api/cart/remove', {method: 'POST', body: {gameId: id}});
    if (res.success) {
        delete store.cart[id];
    } else {
        alert(res.message);
    }
};

const onSubmitOrder = async () => {
    if (!confirm('Are you sure you want to buy these items?')) return;
    const res = await call('/api/cart/submit', {method: 'POST'});
    if (res.success) {
        store.cart = {};
        router.push('/orders');
    } else {
        alert(res.message || 'Failed to submit order');
    }
};
</script>
<template>
    <main>
        <h1>Your Cart</h1>
        <div v-if='Object.keys(store.cart).length === 0'>
            <p>Your cart is empty</p>
        </div>
        <div v-else>
            <div class='cart'>
                <div class='cart-item' v-for='(item, id) in store.cart' :key='id' v-if='Object.keys(store.cart).length'>
                    <img :src='item.imageUrl' alt='Product Image' />
                    <h2>
                        <RouterLink :to='`/product/${id}`'>
                            {{ item.name }}
                        </RouterLink>
                    </h2>
                    <p>x{{ item.quantity }}</p>
                    <p class='price'>€{{ (item.price * item.quantity).toFixed(2) }}</p>
                    <button @click='() => onRemove(id)'>Remove</button>
                </div>
            </div>
            <div class='total'>
                <h2>Total</h2>
                <div>€{{ total }}</div>
            </div>
            <button @click='onSubmitOrder' style='margin-top: 20px; width: 80%; font-size: 1.2rem;'>Submit
                Order</button>
        </div>
    </main>
</template>

<style scoped>
.cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.cart-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 50px;
    margin: 10px 0;
    padding: 10px;
    gap: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.cart-item img {
    height: 100%;
    aspect-ratio: 1 / 1;
    background: var(--color-div);
    border-radius: 10px;
}

.cart-item-text {
    text-align: left;
    flex: 1;
}

button {
    cursor: pointer;
}

.total {
    text-align: right;
    width: 80%;
    margin: 0 auto;

    & div {
        font-size: 2rem;
        font-weight: 800;
    }
}
</style>