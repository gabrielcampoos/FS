import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loading } from '../../shared-components/Loading';
import { SnackBarComp } from '../../shared-components/SnackBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mostraModal } from '../../store/modules/ContextoModal/contextoModalSlice';
import { showNotification } from '../../store/modules/Notification/notificationSlice';
import {
	listarTarefas,
	listarTodasTarefas,
} from '../../store/modules/Tarefa/tarefasSlice';
import {
	logoutUser,
	obterUsuario,
} from '../../store/modules/Usuario/usuarioSlice';
import MyAppBar from './components/AppBar';
import { Cards } from './components/Cards';
import { ModalTarefas } from './components/ModalMensagens';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const selector = useAppSelector((s) => s.tarefas);

	const selectTarefas = useAppSelector(listarTodasTarefas);
	const selectUser = useAppSelector((s) => s.users);

	const [username, setUsername] = useState('');
	const [idUserLogged, setIdUserLogged] = useState('');
	const [tokenUserLogged, setTokenUserLogged] = useState('');

	useEffect(() => {
		setUsername(selectUser.usuario.username);
		setIdUserLogged(selectUser.usuario.id);
		setTokenUserLogged(selectUser.usuario.token);
	}, [
		selectUser.usuario.username,
		selectUser.usuario.id,
		selectUser.usuario.token,
		username,
		idUserLogged,
		tokenUserLogged,
	]);

	useEffect(() => {
		if (!localStorage.getItem('userLogged')) {
			dispatch(
				showNotification({
					success: false,
					message: 'You shall not pass!',
				}),
			);

			dispatch(logoutUser());
			localStorage.clear();
			navigate('/');
		}
		dispatch(obterUsuario());
	}, [dispatch]);

	useEffect(() => {
		dispatch(listarTarefas());
	}, [
		dispatch,
		navigate,
		selectUser.usuario.username,
		selectUser.usuario.id,
		selectUser.usuario.token,
	]);

	return (
		<>
			<Box
				display={'flex'}
				flexDirection={'column'}
				width={'100%'}
				top={0}
			>
				<MyAppBar />

				<Divider />

				<Grid container spacing={2} mt={2} px={2}>
					{selectTarefas
						.filter(
							(item) =>
								item.criadoPor === selectUser.usuario.username,
						)
						.map(({ tarefa, titulo, id, criadoPor }) => (
							<Cards
								key={id}
								id={id}
								titulo={titulo}
								tarefa={tarefa}
								criadoPor={criadoPor}
							/>
						))}
				</Grid>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					bottom: '24px',
					right: '24px',
					display: 'flex',
					flexDirection: 'column-reverse',
					gap: 2,
				}}
			>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => {
						dispatch(mostraModal('adicionar'));
					}}
				>
					<AddIcon />
				</Fab>
			</Box>

			<SnackBarComp />
			<ModalTarefas />
			<Loading open={selector.loading} />
		</>
	);
};
