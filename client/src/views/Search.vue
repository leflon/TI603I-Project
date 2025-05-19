<template>
	<div class="search-view">
		<div v-if='category' class='category'>
			<h1>Games under '{{ category }}' category</h1>
		</div>
		<div v-else>
			<h1>Search</h1>
			<input class='search-bar' type="text" placeholder="Search for a product..." v-model.trim='searchBar'
				@keydown.enter='search' />
		</div>
		<div class='search-results'>
			<div v-if="results.length === 0" class='no-results'>No results found</div>
			<RouterLink :to='`/product/${result.id}`' v-else v-for="(result, index) in results" :key="index"
				class='result-item'>
				<img :src='result.imageUrl' alt="Product Image" class='result-image' />
				<div class='result-details'>
					<h2>{{ result.name }}</h2>
					<div>{{ result.description }}</div>
					<div>€{{ result.price }}</div>
				</div>
			</RouterLink>
		</div>
	</div>
</template>

<script setup>

import call from '@/lib/api';
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const router = useRouter();
const route = useRoute();

const searchBar = ref(router.currentRoute.value.query.name || '');
const category = ref(router.currentRoute.value.query.category || null);
const results = ref([]);
const search = () => {
	const query = searchBar.value;
	if (query) {
		router.push({name: 'search', query: {name: query}});
		fetchSearchResults(query);
	}
};

const fetchSearchResults = async (name) => {
	try {
		const query = `?${name ? 'name=' + name : ''}${category.value ? '&category=' + category.value : ''}`;
		const data = await call('/api/products/search' + query);
		results.value = data.products;
	} catch (error) {
		console.error('Error fetching search results:', error);
	}
};

watch(() => route.query, (newQuery) => {
	category.value = newQuery.category;
	searchBar.value = newQuery.name;
	fetchSearchResults(newQuery.name);
}, {immediate: true, deep: true});

onMounted(() => {
	fetchSearchResults(searchBar.value);
})

</script>

<style scoped>
.search-view {
	padding: 20px;
}

.no-results {
	font-size: 1.5rem;
	margin: 20px auto;
}

.search-view input {
	box-sizing: border-box;
	width: 100%;
	height: 50px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 2rem;
}


.result-item {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin: 10px 0;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	width: 100%;
	text-decoration: none;
	color: black;
	text-align: left;
	gap: 30px;
	height: 100px;
}

.result-item img {
	height: 100%;
	aspect-ratio: 1/1;
	object-fit: cover;
	border-radius: 5px;
	background-color: var(--color-div);
}

.result-item h2 {
	margin: 5px auto;
}
</style>