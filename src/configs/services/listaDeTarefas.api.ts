import axios from 'axios';

const servicoAPI = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const useAPI = () => ({
	validateToken: async (token: string) => {
		const response = await servicoAPI.post('/login', { token });
		return response.data;
	},

	signIn: async (username: string, senha: string) => {
		const response = await servicoAPI.post('/login', { username, senha });
		return response.data;
	},

	logout: async () => {
		const response = await servicoAPI.post('/');
		return response.data;
	},
});

export default servicoAPI;
