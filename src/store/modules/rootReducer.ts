import { combineReducers } from '@reduxjs/toolkit';

import contextoModalSlice from './ContextoModal/contextoModalSlice';
import loadingSlice from './Loading/loadingSlice';
import ModalTarefas from './ModalTarefas/modalTarefasSlice';
import notificationSlice from './Notification/notificationSlice';
import tarefasSlice from './Tarefa/tarefasSlice';
import usuarioSlice from './Usuario/usuarioSlice';

const rootReducer = combineReducers({
	notification: notificationSlice,
	users: usuarioSlice,
	tarefas: tarefasSlice,
	loading: loadingSlice,
	contexto: contextoModalSlice,
	id: ModalTarefas,
});

export default rootReducer;
