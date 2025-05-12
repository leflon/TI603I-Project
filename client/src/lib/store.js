import {reactive, watch} from 'vue';
import {useRouter} from 'vue-router';
export const store = reactive({
	user: null,
	cart: {}
});


watch(() => store.user, (newValue) => {
	if (!newValue) {
		store.cart = {};
	}
}, {deep: true});