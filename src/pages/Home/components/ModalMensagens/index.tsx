import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { escondeModal } from '../../../../store/modules/ContextoModal/contextoModalSlice';
import { apagaId } from '../../../../store/modules/ModalTarefas/modalTarefasSlice';
import {
	criarTarefa,
	editarTarefa,
	excluirTarefa,
	refresh,
} from '../../../../store/modules/Tarefa/tarefasSlice';

export const ModalTarefas = () => {
	const [titulo, setTitulo] = useState('');
	const [tarefa, setTarefa] = useState('');

	const dispatch = useAppDispatch();
	const { contexto, isOpen } = useAppSelector((state) => state.contexto);
	const usuarioLogado = useAppSelector((s) => s.users);

	const tarefaSelecionada = useAppSelector((state) => state.id);

	useEffect(() => {
		if (isOpen) {
			if (
				contexto === 'editar' &&
				tarefaSelecionada.titulo &&
				tarefaSelecionada.tarefa
			) {
				setTitulo(tarefaSelecionada.titulo);
				setTarefa(tarefaSelecionada.tarefa);
			}
		}
	}, [tarefaSelecionada, contexto, isOpen, dispatch]);

	const fechaModal = () => {
		dispatch(escondeModal());
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		switch (contexto) {
			case 'adicionar':
				dispatch(
					criarTarefa({
						id: '',
						titulo: titulo,
						tarefa: tarefa,
						criadoPor: usuarioLogado.usuario.username,
					}),
				);
				setTitulo('');
				setTarefa('');
				fechaModal();
				break;
			case 'editar':
				if (tarefaSelecionada.id) {
					dispatch(
						editarTarefa({
							id: tarefaSelecionada.id,
							titulo: titulo,
							tarefa: tarefa,
							criadoPor: usuarioLogado.usuario.username,
						}),
					);
				}
				setTarefa('');
				setTitulo('');

				dispatch(apagaId());
				fechaModal();

				break;
			case 'excluir':
				if (tarefaSelecionada.id) {
					dispatch(excluirTarefa(tarefaSelecionada.id));
				}
				dispatch(apagaId());
				fechaModal();
				dispatch(refresh());
				break;
		}
	};

	return (
		<Dialog open={isOpen}>
			<Box component={'form'} onSubmit={handleSubmit}>
				<DialogTitle>
					{contexto === 'adicionar' && 'Adicionar tarefa'}
					{contexto === 'editar' && 'Editar tarefa'}
					{contexto === 'excluir' && 'Excluir tarefa'}
				</DialogTitle>
				{contexto !== 'excluir' && (
					<>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								name="titulo"
								id="titulo"
								label="Título"
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setTitulo(ev.target.value)}
								value={titulo}
							/>
							<TextField
								autoFocus
								margin="dense"
								id="tarefa"
								name="tarefa"
								label="Escreva aqui sua tarefa..."
								type="text"
								fullWidth
								variant="filled"
								onChange={(ev) => setTarefa(ev.target.value)}
								value={tarefa}
								multiline
								minRows={3}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={fechaModal}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="success"
								variant="contained"
							>
								Salvar
							</Button>
						</DialogActions>
					</>
				)}

				{contexto === 'excluir' && (
					<>
						<DialogContent>
							<Typography variant="body1">
								Você deseja mesmo excluir esse recado?
							</Typography>
						</DialogContent>

						<DialogActions>
							<Button
								type="button"
								variant="outlined"
								onClick={fechaModal}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								color="error"
								variant="contained"
							>
								Excluir
							</Button>
						</DialogActions>
					</>
				)}
			</Box>
		</Dialog>
	);
};
