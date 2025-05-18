<script setup>
import {ref, onMounted} from 'vue';
import call from '@/lib/api';

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
	try {
		const res = await call('/api/users/orders');
		console.log(res);
		orders.value = res.orders || [];
	} catch (err) {
		error.value = err.message || 'Failed to load orders';
	} finally {
		loading.value = false;
	}
});
</script>
<template>
	<main>
		<h1 style="text-align:left; margin-bottom: 18px; font-size:2rem; font-weight:900; color:var(--color-primary);">
			My Orders</h1>
		<div v-if="loading">Loading...</div>
		<div v-else-if="error">{{ error }}</div>
		<div v-else-if="orders.length === 0">
			<p>You have no orders yet.</p>
		</div>
		<div v-else class="order-list">
			<div v-for="order in orders" :key="order.id" class="order-card">
				<h2>Order #{{ order.id }}</h2>
				<p>{{ order.createdAt ? new Date(order.createdAt).toLocaleString('en-GB', {
					dateStyle: 'medium',
					timeStyle: 'short'
				}) : 'N/A' }}</p>
				<div class="order-total">Total: <span class="price">€{{ order.totalPrice }}</span></div>
				<h3>Items ({{ order.items.length }})</h3>
				<div v-if="order.items && order.items.length" class="order-items-list">
					<RouterLink :to='`/product/${item.gameId}`' v-for="item in order.items" :key="item.gameId"
						class="order-item-entry">
						<img :src="item.imageUrl" alt="Game image" class="order-item-img" />
						<div class="order-item-details">
							<div class="order-item-name">{{ item.name }}</div>
							<div class="order-item-meta">
								<span class="price">€{{ item.price }}</span>
								<span>Qty: {{ item.quantity }}</span>
								<span class="subtotal">Subtotal: €{{ (item.price * item.quantity).toFixed(2) }}</span>
							</div>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
	</main>
</template>
<style scoped>
.order-list {
	display: flex;
	flex-direction: column;
	gap: 32px;
	margin-top: 24px;
}

.order-card {
	border: 1px solid var(--color-div);
	border-radius: 14px;
	padding: 28px 32px;
	background: #fff;
	box-shadow: 0 2px 12px rgba(255, 0, 85, 0.06);
	transition: box-shadow 0.2s;
}

.order-card:hover {
	box-shadow: 0 4px 24px rgba(255, 0, 85, 0.10);
}

.order-card h2 {
	margin: 0 0 8px 0;
	font-size: 1.3rem;
	font-weight: 700;
	color: var(--color-dark);
	text-align: left;
}

.order-card p {
	margin: 4px 0 0 0;
	font-size: 1rem;
	color: #444;
	text-align: left;
}

.order-card .order-total {
	font-size: 1.5rem;
	font-weight: 800;
	color: var(--color-primary);
	margin: 12px 0 18px 0;
	letter-spacing: 0.5px;
	text-align: left;
}

.order-items-list {
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 10px;
}

.order-item-entry {
	display: flex;
	align-items: center;
	gap: 18px;
	padding: 12px 0;
	border-bottom: 1px solid var(--color-div);
}

h3 {
	text-align: left;
}

.order-item-name {
	text-align: left;
}

.order-item-entry:last-child {
	border-bottom: none;
}

.order-item-img {
	height: 64px;
	width: 64px;
	object-fit: cover;
	border-radius: 10px;
	box-shadow: 0 1px 6px rgba(255, 0, 85, 0.08);
	background: var(--color-div);
}

.order-item-details {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.order-item-name {
	font-size: 1.1rem;
	font-weight: 700;
	color: var(--color-dark);
}

.order-item-meta {
	display: flex;
	gap: 18px;
	align-items: center;
	font-size: 1rem;
	color: #555;
}

.price {
	font-weight: 700;
	color: var(--color-primary);
	font-size: 1.1rem;
}

.subtotal {
	font-weight: 700;
	color: var(--color-secondary);
	font-size: 1.05rem;
}

@media (max-width: 700px) {
	.order-card {
		padding: 16px 6px;
	}

	.order-item-img {
		height: 48px;
		width: 48px;
	}

	.order-item-meta {
		font-size: 0.95rem;
		gap: 10px;
	}
}
</style>