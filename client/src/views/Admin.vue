<script setup>
import {ref, onMounted, watch} from 'vue';
import GameForm from '../components/GameForm.vue';
import call from '../lib/api';
import {useRoute, useRouter} from 'vue-router';

const games = ref([]);
const selectedGameId = ref('');
const selectedGame = ref(null);
const showAddForm = ref(false);
const error = ref('');

const route = useRoute();
const router = useRouter();

const clearQuery = () => {
	router.replace({query: {...route.query, edit: undefined}});
};

const loadGames = async () => {
	try {
		const response = await call('/api/admin/all-games');
		games.value = response.games;
	} catch (err) {
		error.value = 'Failed to load games';
		console.error(err);
	}
};

const handleGameSelect = async () => {
	if (!selectedGameId.value) {
		selectedGame.value = null;
		clearQuery();
		return;
	}

	try {
		const response = await call(`/api/products/${selectedGameId.value}`);
		selectedGame.value = response.product;
		showAddForm.value = false;
		router.replace({query: {...route.query, edit: selectedGameId.value}});
	} catch (err) {
		error.value = 'Failed to load game details';
		console.error(err);
		selectedGame.value = null;
		clearQuery();
	}
};

const handleAddGame = () => {
	selectedGameId.value = '';
	selectedGame.value = null;
	showAddForm.value = true;
	clearQuery();
};

const handleSubmit = async (formData) => {
	let url;
	if (selectedGame.value)
		url = `/api/admin/games/update/${selectedGame.value.id}`;
	else
		url = '/api/admin/games/add';

	try {
		await call(url, {
			method: 'POST',
			body: formData
		});
		await loadGames();
		alert('Game saved successfully!');
	} catch (err) {
		error.value = 'Failed to save game';
		console.error(err);
	}
};

const handleDelete = async () => {
	if (!selectedGame.value) return;

	if (!confirm('Are you sure you want to delete this game?')) return;

	try {
		await call(`/api/admin/games/delete/${selectedGame.value.id}`, {
			method: 'DELETE'
		});
		await loadGames();
		selectedGameId.value = '';
		selectedGame.value = null;
		clearQuery();
	} catch (err) {
		error.value = 'Failed to delete game';
		console.error(err);
	}
};

const handleCancel = () => {
	selectedGameId.value = '';
	selectedGame.value = null;
	showAddForm.value = false;
	clearQuery();
};

watch(() => route.query.edit, async (newGameId) => {
	if (newGameId && newGameId !== selectedGameId.value) {
		selectedGameId.value = newGameId;
		await handleGameSelect(newGameId);
	}
}, {immediate: true});

onMounted(async () => {
	await loadGames();
});
</script>

<template>
	<div class="admin-page">
		<h1>Admin Panel</h1>

		<div v-if="error" class="error-message">
			{{ error }}
		</div>

		<div class="admin-content">
			<div class="game-list">
				<h2>Games</h2>
				<select v-model="selectedGameId" @change="handleGameSelect">
					<option value="">Select a game...</option>
					<option v-for="game in games" :key="game.id" :value="game.id">
						{{ game.id }} - {{ game.name }}
					</option>
				</select>

				<button @click="handleAddGame" class="btn-add">Add New Game</button>
			</div>

			<div class="game-form-container">
				<GameForm v-if="selectedGame || showAddForm" :game="selectedGame" :mode="selectedGame ? 'edit' : 'add'"
					@submit="handleSubmit" @cancel="handleCancel" />

				<div v-if="selectedGame" class="delete-section">
					<button @click="handleDelete" class="btn-delete">Delete Game</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.admin-page {
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
}

.admin-content {
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 20px;
	margin-top: 20px;
}

.game-list {
	background: #f5f5f5;
	padding: 20px;
	border-radius: 8px;
}

select {
	width: 100%;
	padding: 8px;
	margin-bottom: 20px;
	border: 1px solid #ddd;
	border-radius: 4px;
}

.btn-add {
	width: 100%;
	padding: 10px;
	background-color: #4CAF50;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.btn-add:hover {
	background-color: #45a049;
}

.btn-delete {
	width: 100%;
	padding: 10px;
	background-color: #f44336;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 20px;
}

.btn-delete:hover {
	background-color: #da190b;
}

.error-message {
	background-color: #ffebee;
	color: #c62828;
	padding: 10px;
	border-radius: 4px;
	margin-bottom: 20px;
}

.delete-section {
	margin-top: 20px;
	padding: 20px;
	background: #f5f5f5;
	border-radius: 8px;
}
</style>