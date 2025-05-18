<script setup>
import { ref, watch } from "vue";
import ListInput from "./ListInput.vue";

const props = defineProps({
    game: {
        type: Object,
        default: () => ({}),
    },
    mode: {
        type: String,
        default: "add",
    },
});

const emit = defineEmits(["submit", "cancel"]);

const defaultFormData = {
    name: "",
    price: 0,
    description: "",
    yearPublished: new Date().getFullYear(),
    avg_grade: 0,
    min_players: 1,
    max_players: 1,
    min_play_time: 0,
    max_play_time: 0,
    min_age: 0,
    max_age: 0,
    quantity_available: 0,
    quantity_lent: 0,
    category: "",
    family: [],
    implementations: [],
    designers: [],
    artists: [],
    publishers: [],
    mechanics: [],
    expansions: [],
};
const formData = ref({ ...defaultFormData });

const arrayFields = [
    "family",
    "implementations",
    "designers",
    "artists",
    "publishers",
    "mechanics",
    "expansions",
];

const updateFormData = (game) => {
    if (!game) {
        formData.value = { ...defaultFormData };
        return;
    }
    const newForm = { ...defaultFormData, ...game };
    arrayFields.forEach((field) => {
        if (typeof newForm[field] === "string") {
            try {
                newForm[field] = JSON.parse(newForm[field]);
                if (!Array.isArray(newForm[field])) newForm[field] = [];
            } catch (e) {
                newForm[field] = [];
            }
        } else if (!Array.isArray(newForm[field])) {
            newForm[field] = [];
        }
    });
    formData.value = newForm;
};

watch(
    () => props.game,
    (newGame) => {
        updateFormData(newGame);
    },
    { immediate: true },
);

const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { ...formData.value };
    emit("submit", submitData);
};

const handleCancel = () => {
    emit("cancel");
};
</script>

<template>
    <form @submit="handleSubmit" class="game-form">
        <h2>{{ mode === "add" ? "Add New Game" : "Edit Game" }}</h2>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="formData.name" required />
        </div>

        <div class="form-group">
            <label for="price">Price</label>
            <input
                type="number"
                id="price"
                v-model="formData.price"
                min="0"
                step="0.01"
                required
            />
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea
                id="description"
                v-model="formData.description"
                rows="4"
                required
            ></textarea>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="yearPublished">Year Published</label>
                <input
                    type="number"
                    id="yearPublished"
                    v-model="formData.yearPublished"
                    required
                />
            </div>

            <div class="form-group">
                <label for="avg_grade">Average Grade</label>
                <input
                    type="number"
                    id="avg_grade"
                    v-model="formData.avg_grade"
                    min="0"
                    max="10"
                    step="0.1"
                    required
                />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="min_players">Min Players</label>
                <input
                    type="number"
                    id="min_players"
                    v-model="formData.min_players"
                    min="1"
                    required
                />
            </div>

            <div class="form-group">
                <label for="max_players">Max Players</label>
                <input
                    type="number"
                    id="max_players"
                    v-model="formData.max_players"
                    min="1"
                    required
                />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="min_play_time">Min Play Time (minutes)</label>
                <input
                    type="number"
                    id="min_play_time"
                    v-model="formData.min_play_time"
                    min="0"
                    required
                />
            </div>

            <div class="form-group">
                <label for="max_play_time">Max Play Time (minutes)</label>
                <input
                    type="number"
                    id="max_play_time"
                    v-model="formData.max_play_time"
                    min="0"
                    required
                />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="min_age">Min Age</label>
                <input
                    type="number"
                    id="min_age"
                    v-model="formData.min_age"
                    min="0"
                    required
                />
            </div>

            <div class="form-group">
                <label for="max_age">Max Age</label>
                <input
                    type="number"
                    id="max_age"
                    v-model="formData.max_age"
                    min="0"
                    required
                />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="quantity_available">Quantity Available</label>
                <input
                    type="number"
                    id="quantity_available"
                    v-model="formData.quantity_available"
                    min="0"
                    required
                />
            </div>

            <div class="form-group">
                <label for="quantity_lent">Quantity Lent</label>
                <input
                    type="number"
                    id="quantity_lent"
                    v-model="formData.quantity_lent"
                    min="0"
                    required
                />
            </div>
        </div>

        <div class="form-group">
            <label for="category">Category</label>
            <input
                type="text"
                id="category"
                v-model="formData.category"
                required
            />
        </div>

        <div class="form-group">
            <label for="family">Family</label>
            <ListInput v-model="formData.family" />
        </div>

        <div class="form-group">
            <label for="implementations">Implementations</label>
            <ListInput v-model="formData.implementations" />
        </div>

        <div class="form-group">
            <label for="designers">Designers</label>
            <ListInput v-model="formData.designers" />
        </div>

        <div class="form-group">
            <label for="artists">Artists</label>
            <ListInput v-model="formData.artists" />
        </div>

        <div class="form-group">
            <label for="publishers">Publishers</label>
            <ListInput v-model="formData.publishers" />
        </div>

        <div class="form-group">
            <label for="mechanics">Mechanics</label>
            <ListInput v-model="formData.mechanics" />
        </div>

        <div class="form-group">
            <label for="expansions">Expansions</label>
            <ListInput v-model="formData.expansions" />
        </div>

        <div class="form-actions">
            <button type="submit" class="btn-primary">
                {{ mode === "add" ? "Add Game" : "Save Changes" }}
            </button>
            <button type="button" @click="handleCancel" class="btn-secondary">
                Cancel
            </button>
        </div>
    </form>
</template>

<style scoped>
.game-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn-primary {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-secondary {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #45a049;
}

.btn-secondary:hover {
    background-color: #da190b;
}
</style>
