<script setup>
import {ref} from 'vue';
import call from '@/lib/api';
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {store} from '@/lib/store';
const router = useRouter();
const id = router.currentRoute.value.params.id;
const product = ref(null);
const quantity = ref(1);

onMounted(async () => {
    const data = await call(`/api/products/${id}`, 'GET');
    product.value = data.product;
});

const onAdd = async () => {
    if (store.user) {
        const res = await call(`/api/cart/add`, {method: 'POST', body: {gameId: id, quantity: quantity.value}});
        console.log(res);
        if (res.success) {
            if (store.cart[id]) {
                store.cart[id].quantity = store.cart[id].quantity + quantity.value;
            } else {
                store.cart[id] = {quantity: quantity.value, ...product.value};
            }
        } else {
            alert(res.message);
        }
    } else {
        router.push('/login?redirect=/product/' + id);
    }
}


</script>
<template>
    <div class='loading' v-if='!product'>
        <p>Loading...</p>
    </div>
    <div v-else>
        <div class='heading'>
            <img :src='product.imgageUrl' alt='Product Image' />
            <div class='heading-text'>
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <div class='price-line'>
                    <div class='price'>€{{ product.price }}</div>
                    <div>
                        Quantity:
                        <select name='quantity' id='quantity' v-model='quantity'>
                            <option v-for='i in [1, 2, 3, 4, 5]' :key='i' :value='i'>{{ i }}</option>
                        </select>
                    </div>
                    <button @click='onAdd'>
                        <span v-if='store.user'>Add to cart</span>
                        <span v-else>Login to add to cart</span>
                    </button>
                </div>
            </div>
        </div>
        <h2>Product details</h2>
        <table>
            <tr>
                <td>Age</td>
                <td>{{ product.min_age }} - {{ product.max_age }}</td>
            </tr>
            <tr>
                <td>Play time (min)</td>
                <td>{{ product.min_play_time }} - {{ product.max_play_time }}</td>
            </tr>
            <tr>
                <td>Players</td>
                <td>{{ product.min_players }} - {{ product.max_players }}</td>
            </tr>
            <tr>
                <td>Designers</td>
                <td>{{ product.designers.join(', ') }}</td>
            </tr>
            <tr>
                <td>Publishers</td>
                <td>{{ product.publishers.join(', ') }}</td>
            </tr>
            <tr>
                <td>Artists</td>
                <td>{{ product.artists.join(', ') }}</td>
            </tr>
            <tr>
                <td>Release year</td>
                <td>{{ product.yearPublished }}</td>
            </tr>
            <tr>
                <td>Game family</td>
                <td>{{ product.family.join(', ') }}</td>
            </tr>
            <tr>
                <td>Implementations</td>
                <td>{{ product.implementations.join(', ') }}</td>
            </tr>
            <tr>
                <td>Expansions</td>
                <td>{{ product.expansions.join(', ') }}</td>
            </tr>
            <tr>
                <td>Mechanics</td>
                <td>{{ product.mechanics.join(', ') }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
* {
    text-align: left;
}

.heading {
    position: relative;
    display: flex;
    text-align: left;
    margin: 30px auto;
    width: 100%;
    gap: 20px;
}

.heading img {
    width: 33%;
    aspect-ratio: 16 / 9;
    background-color: pink;
    border-radius: 10px;
}

h1 {
    margin-top: 0;
}

.price-line {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 30px;
}

.price {
    font-size: 3rem;
    font-weight: 800;
}

button {
    appearance: none;
    border: none;
    background-color: var(--color-primary);
    color: white;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background .1s ease;

    & span {
        color: inherit;
    }

    &:hover {
        background-color: var(--color-dark);
    }
}


table {
    margin: 30px auto;
    width: 800px;
    max-width: 100%;
    border-collapse: collapse;
}

tr {
    border-bottom: 1px solid var(--color-primary);
}

tr:last-child {
    border-bottom: none;
}

td {
    padding: 10px 0;
}

tr td:first-child {
    font-weight: bold;
}
</style>
