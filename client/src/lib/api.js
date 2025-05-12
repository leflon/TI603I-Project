export default async function call(endpoint, {
	method = 'GET',
	body,
} = {}) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		credentials: 'include'
	});
	return res.json();
}