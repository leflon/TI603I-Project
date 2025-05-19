<script setup>
import {ref, computed} from 'vue';
import call from '@/lib/api';
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {store} from '@/lib/store';
import IconStar from '@/components/icons/IconStar.vue';

const router = useRouter();
const id = router.currentRoute.value.params.id;
const product = ref(null);
const quantity = ref(1);

// Computed property to check if the user is an admin
const isAdmin = computed(() => store.user && store.user.is_admin);

const reviews = ref([]);
const userReview = ref(null);
const reviewForm = ref({description: '', grade: 1});
const submitting = ref(false);
const reviewError = ref('');
const editingReview = ref(false);

async function fetchReviews() {
    const res = await call(`/api/products/${id}/reviews`);
    reviews.value = res.reviews || [];
}

async function fetchUserReview() {
    if (!store.user) return;
    const res = await call(`/api/products/${id}/review`);
    userReview.value = res.review;
    if (userReview.value) {
        reviewForm.value.description = userReview.value.description;
        reviewForm.value.grade = userReview.value.grade;
    }
}

async function submitReview() {
    reviewError.value = '';
    submitting.value = true;
    try {
        const res = await call(`/api/products/${id}/review`, {
            method: 'POST',
            body: {
                description: reviewForm.value.description,
                grade: reviewForm.value.grade
            }
        });
        if (res.success) {
            await fetchReviews();
            await fetchUserReview();
            reviewForm.value.description = '';
            reviewForm.value.grade = 0;
        } else {
            reviewError.value = res.error || 'Failed to submit review.';
        }
    } catch (e) {
        reviewError.value = 'Failed to submit review.';
    } finally {
        submitting.value = false;
    }
}

async function startEditReview() {
    editingReview.value = true;
    reviewForm.value.description = userReview.value.description;
    reviewForm.value.grade = userReview.value.grade;
}

async function cancelEditReview() {
    editingReview.value = false;
    reviewError.value = '';
}

async function updateReviewHandler() {
    reviewError.value = '';
    submitting.value = true;
    try {
        const res = await call(`/api/products/${id}/review`, {
            method: 'PATCH',
            body: {
                description: reviewForm.value.description,
                grade: reviewForm.value.grade
            }
        });
        if (res.success) {
            await fetchReviews();
            await fetchUserReview();
            editingReview.value = false;
        } else {
            reviewError.value = res.error || 'Failed to update review.';
        }
    } catch (e) {
        reviewError.value = 'Failed to update review.';
    } finally {
        submitting.value = false;
    }
}

async function deleteOwnReview() {
    if (!confirm('Delete your review?')) return;
    submitting.value = true;
    try {
        const res = await call(`/api/products/${id}/review`, {method: 'DELETE'});
        if (res.success) {
            await fetchReviews();
            await fetchUserReview();
        } else {
            reviewError.value = res.error || 'Failed to delete review.';
        }
    } catch (e) {
        reviewError.value = 'Failed to delete review.';
    } finally {
        submitting.value = false;
        editingReview.value = false;
    }
}

async function adminDeleteReview(reviewId) {
    if (!confirm('Admin: Delete this review?')) return;
    submitting.value = true;
    try {
        const res = await call(`/api/admin/games/${id}/review/${reviewId}`, {method: 'DELETE'});
        if (res.success) {
            await fetchReviews();
        } else {
            alert(res.error || 'Failed to delete review.');
        }
    } catch (e) {
        alert('Failed to delete review.');
    } finally {
        submitting.value = false;
    }
}

onMounted(async () => {
    const data = await call(`/api/products/${id}`, 'GET');
    product.value = data.product;
    await fetchReviews();
    await fetchUserReview();
});

const onAdd = async () => {
    if (store.user) {
        const res = await call(`/api/cart/add`, {method: 'POST', body: {gameId: id, quantity: quantity.value}});
        if (res.success) {
            if (store.cart[id]) {
                store.cart[id].quantity = store.cart[id].quantity + quantity.value;
            } else {
                store.cart[id] = {quantity: quantity.value, ...product.value};
            }
            alert('Added to cart!');
        } else {
            alert(res.message);
        }
    } else {
        router.push('/login?redirect=/product/' + id);
    }
};

const editProduct = () => {
    if (isAdmin.value && product.value) {
        router.push({name: 'admin', query: {edit: product.value.id}});
    }
};

const deleteProduct = async () => {
    if (isAdmin.value && product.value) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await call(`/api/admin/games/delete/${product.value.id}`, {method: 'DELETE'});
                if (response.success) {
                    alert('Product deleted successfully.');
                    router.push('/');
                } else {
                    alert('Failed to delete product: ' + (response.error || 'Unknown error'));
                }
            } catch (err) {
                alert('An error occurred while deleting the product.');
                console.error(err);
            }
        }
    }
};

</script>
<template>
    <div class='loading' v-if='!product'>
        <p>Loading...</p>
    </div>
    <div v-else>
        <div class="admin-controls" v-if="isAdmin">
            <button @click="editProduct" class="admin-button edit-button">Edit Product</button>
            <button @click="deleteProduct" class="admin-button delete-button">Delete Product</button>
        </div>

        <div class='heading'>
            <img :src='product.imageUrl' alt='Product Image' />
            <div class='heading-text'>
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <div class="star-rating">
                    <span v-for="n in 5" :key="n">
                        <IconStar :color="n <= product.avg_grade ? 'var(--color-primary)' : '#ccc'" />
                    </span>
                    <span>
                        ({{ product.avg_grade }})
                    </span>
                </div>
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
            <tbody>
                <tr>
                    <td>Category</td>
                    <td>{{ product.category }}</td>
                </tr>
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
            </tbody>
        </table>

        <!-- Review Section -->
        <section class="reviews-section">
            <h2>Reviews</h2>

            <div v-if="store.user">
                <div v-if="userReview && !editingReview">
                    <p><strong>Your review:</strong></p>
                    <div class="user-review">
                        <div class="stars">
                            <IconStar v-for="n in 5" :key="n" :color="n <= userReview.grade ? '#ffb400' : '#ccc'" />
                        </div>
                        <p>{{ userReview.description }}</p>
                        <div class="review-actions">
                            <button @click="startEditReview">Edit</button>
                            <button @click="deleteOwnReview">Delete</button>
                        </div>
                    </div>
                </div>
                <div v-else-if="editingReview" class="review-form">
                    <h3>Edit your review</h3>
                    <form @submit.prevent="updateReviewHandler">
                        <div class="stars-input">
                            <label>Rating:</label>
                            <span v-for="n in 5" :key="n" @click="reviewForm.grade = n" style="cursor:pointer">
                                <IconStar :color="n <= reviewForm.grade ? '#ffb400' : '#ccc'" />
                            </span>
                        </div>
                        <textarea v-model="reviewForm.description" placeholder="Write your comment..." required rows="3"
                            style="width:100%;margin:10px 0;"></textarea>
                        <button type="submit" :disabled="submitting">Save</button>
                        <button type="button" @click="cancelEditReview" :disabled="submitting">Cancel</button>
                        <div v-if="reviewError" class="review-error">{{ reviewError }}</div>
                    </form>
                </div>
                <div v-else class="review-form">
                    <h3>Leave a review</h3>
                    <form @submit.prevent="submitReview">
                        <div class="stars-input">
                            <label>Rating:</label>
                            <span v-for="n in 5" :key="n" @click="reviewForm.grade = n" style="cursor:pointer">
                                <IconStar :color="n <= reviewForm.grade ? '#ffb400' : '#ccc'" />
                            </span>
                        </div>
                        <textarea v-model="reviewForm.description" placeholder="Write your comment..." required rows="3"
                            style="width:100%;margin:10px 0;"></textarea>
                        <button type="submit" :disabled="submitting">Submit Review</button>
                        <div v-if="reviewError" class="review-error">{{ reviewError }}</div>
                    </form>
                </div>
            </div>
            <div v-else>
                <p><em>Login to leave a review.</em></p>
            </div>
            <div class="review-list">
                <h3 v-if="reviews.length">All reviews</h3>
                <div v-if="!reviews.length">No reviews yet.</div>
                <div v-for="review in reviews" :key="review.id" class="review-item">
                    <div class="review-header">
                        <span class="review-author">{{ review.first_name }} {{ review.last_name }}</span>
                        <span class="review-date">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
                        <span class="review-stars">
                            <IconStar v-for="n in 5" :key="n"
                                :color="n <= review.grade ? 'var(--color-primary)' : '#ccc'" />
                        </span>
                        <button v-if="store.user && store.user.is_admin" class="admin-delete-btn"
                            @click="adminDeleteReview(review.id)">Delete</button>
                    </div>
                    <div class="review-body">{{ review.description }}</div>
                </div>
            </div>
        </section>
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
    box-shadow: #82002b26 0px 5px 15px;
    transition: all .5s ease;

}

.heading img:hover {
    transform: scale(1.05);
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

h1,
h2,
.price {
    color: var(--color-primary);
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

.admin-controls {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin: 15px 0;
}

.admin-button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    font-size: .8rem;
    cursor: pointer;
    font-weight: bold;
}

.edit-button {
    background-color: #ffc107;

    &:hover {
        background-color: #ffd54f;
    }

    /* Amber */
    color: black;
}

.delete-button {
    background-color: #f44336;

    &:hover {
        background-color: #ff6358;
    }

    /* Red */
    color: white;
}

.reviews-section {
    margin: 40px auto 0 auto;
    max-width: 800px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(255, 0, 85, 0.06);
    padding: 32px 32px 24px 32px;
}

.review-form {
    margin-bottom: 24px;
}

.stars-input {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.stars {
    display: flex;
    gap: 2px;
    margin-bottom: 4px;
}

.review-list {
    margin-top: 24px;
}

.review-item {
    border-bottom: 1px solid #eee;
    padding: 12px 0;
}

.review-header {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 1rem;
    color: #555;
}

.review-author {
    font-weight: bold;
    color: var(--color-primary);
}

.review-date {
    color: #888;
    font-size: 0.95em;
}

.review-stars {
    margin-left: auto;
    display: flex;
    gap: 2px;
}

.review-body {
    margin-top: 4px;
    font-size: 1.1rem;
    color: #222;
}

.review-error {
    color: red;
    margin-top: 8px;
}

.user-review {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 18px;
}

.star-rating {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.half-star {
    position: relative;
    overflow: hidden;
}

.review-actions {
    display: flex;
    gap: 10px;
    margin-top: 8px;
}

.admin-delete-btn {
    margin-left: 16px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 4px 10px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background .1s;
}

.admin-delete-btn:hover {
    background: #ff6358;
}
</style>
