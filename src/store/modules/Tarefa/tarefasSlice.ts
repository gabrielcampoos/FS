import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import serviceAPI from '../../../configs/services/listaDeTarefas.api';
import { RespostaTarefa } from '../../types/RetornoRequests';
import { TarefaDTO, TarefaState } from '../../types/Tarefa';
import { showNotification } from '../Notification/notificationSlice';

export const criarTarefa = createAsyncThunk(
	'tarefas/criar',
	async (dadosTarefa: TarefaDTO, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const resposta = await serviceAPI.post('/tarefas', dadosTarefa, {
				headers,
			});

			dispatch(
				showNotification({
					success: resposta.data.sucesso,
					message: resposta.data.mensagem,
				}),
			);

			return resposta.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaTarefa = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}
			return {
				sucesso: false,
				mensagem: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const editarTarefa = createAsyncThunk(
	'tarefas/editar',
	async (dadosTarefa: TarefaDTO, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const retorno = await serviceAPI.put(
				`/tarefas/${dadosTarefa.id}`,
				dadosTarefa,
				{ headers },
			);
			dispatch(
				showNotification({
					success: retorno.data.sucesso,
					message: retorno.data.mensagem,
				}),
			);
			return retorno.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaTarefa = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}
			return {
				sucesso: false,
				mensagem: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const excluirTarefa = createAsyncThunk(
	'tarefas/excluir',
	async (id: string, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const retorno = await serviceAPI.delete(`/tarefas/${id}`, {
				headers,
			});
			dispatch(
				showNotification({
					message: retorno.data.mensagem,
					success: retorno.data.sucesso,
				}),
			);
			return retorno.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaTarefa = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}
			return {
				sucesso: false,
				mensagem: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

export const listarTarefas = createAsyncThunk(
	'tarefas/listar',
	async (_, { dispatch }) => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				token: localStorage.getItem('userLogged'),
			};
			const resposta = await serviceAPI(`/tarefas`, { headers });

			dispatch(
				showNotification({
					success: resposta.data.sucesso,
					message: resposta.data.mensagem,
				}),
			);

			return resposta.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const retorno: RespostaTarefa = {
					sucesso: error.response?.data.sucesso,
					mensagem: error.response?.data.mensagem,
				};
				dispatch(
					showNotification({
						message: error.response?.data.mensagem,
						success: false,
					}),
				);
				return retorno;
			}
			return {
				sucesso: false,
				mensagem: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

const tarefasAdapter = createEntityAdapter<TarefaState>({
	selectId: (state) => state.id,
});

export const { selectAll: listarTodasTarefas } = tarefasAdapter.getSelectors(
	(global: RootState) => global.tarefas,
);

const tarefasSlice = createSlice({
	name: 'tarefas',
	initialState: tarefasAdapter.getInitialState({
		loading: false,
		mensagem: '',
	}),
	reducers: {
		refresh(estadoAtual) {
			return { ...estadoAtual };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(listarTarefas.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Carregando tarefas.';
		});

		builder.addCase(listarTarefas.fulfilled, (estadoAtual, acao) => {
			const { mensagem, dados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dados || dados.length === 0) {
				estadoAtual.mensagem = 'Nada encontrado';
				return;
			}
			tarefasAdapter.setAll(estadoAtual, dados);
		});

		builder.addCase(criarTarefa.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Criando tarefa...';
		});

		builder.addCase(criarTarefa.fulfilled, (estadoAtual, acao) => {
			const { dados, mensagem } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dados?.id) {
				console.log(acao.payload);
				return;
			}

			tarefasAdapter.addOne(estadoAtual, dados);
			console.log(dados);
		});

		builder.addCase(criarTarefa.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Tarefa não criada.';
		});

		builder.addCase(editarTarefa.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Atualizando tarefa...';
		});
		builder.addCase(editarTarefa.fulfilled, (estadoAtual, acao) => {
			const { mensagem, dados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (!dados || !dados.id) {
				console.log(acao.payload);
				return;
			}

			tarefasAdapter.updateOne(estadoAtual, {
				id: dados.id,
				changes: dados,
			});
		});
		builder.addCase(editarTarefa.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Tarefa não atualizada.';
		});

		builder.addCase(excluirTarefa.pending, (estadoAtual) => {
			estadoAtual.loading = true;
			estadoAtual.mensagem = 'Apagando tarefa...';
		});
		builder.addCase(excluirTarefa.fulfilled, (estadoAtual, acao) => {
			const { mensagem, sucesso, dados } = acao.payload;
			estadoAtual.loading = false;
			estadoAtual.mensagem = mensagem;

			if (sucesso) {
				tarefasAdapter.removeOne(estadoAtual, dados);
			}
		});
		builder.addCase(excluirTarefa.rejected, (estadoAtual) => {
			estadoAtual.loading = false;
			estadoAtual.mensagem = 'Tarefa não apagada.';
		});
	},
});

export default tarefasSlice.reducer;
export const { refresh } = tarefasSlice.actions;
