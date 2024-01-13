import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';

import { useAppDispatch } from '../../../../store/hooks';
import { mostraModal } from '../../../../store/modules/ContextoModal/contextoModalSlice';
import { capturaId } from '../../../../store/modules/ModalTarefas/modalTarefasSlice';

interface CardsProps {
	id: string;
	titulo: string;
	tarefa: string;
	criadoPor: string;
}

export const Cards = ({ tarefa, titulo, id, criadoPor }: CardsProps) => {
	const dispatch = useAppDispatch();

	const showModal = (tipo: string) => {
		switch (tipo) {
			case 'editar':
				dispatch(mostraModal('editar'));
				dispatch(
					capturaId({
						id: id,
						titulo: titulo,
						tarefa: tarefa,
						criadoPor: criadoPor,
					}),
				);

				break;
			case 'excluir':
				dispatch(mostraModal('excluir'));
				dispatch(
					capturaId({
						id: id,
						titulo: titulo,
						tarefa: tarefa,
						criadoPor: criadoPor,
					}),
				);
		}
	};

	const newData = new Date();
	const dataFormatada =
		newData.getDate() +
		'/' +
		(newData.getMonth() + 1) +
		'/' +
		newData.getFullYear();

	return (
		<>
			<Grid item xs={12} md={6} lg={4}>
				<Card
					variant="outlined"
					id={id}
					sx={{
						boxShadow: '1px 1px 10px  #6e5fa2',
					}}
				>
					<CardHeader title={titulo} />

					<CardContent>
						<Typography>{tarefa}</Typography>
					</CardContent>
					<CardContent>
						<Typography>
							Criado por:{' '}
							<span
								style={{
									fontWeight: 500,
								}}
							>
								{criadoPor.toUpperCase()}
							</span>
							<Typography>{dataFormatada}</Typography>
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton onClick={() => showModal('editar')}>
							<EditNoteIcon />
						</IconButton>
						<IconButton onClick={() => showModal('excluir')}>
							<DeleteIcon />
						</IconButton>
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};
