import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ModalTarefasProps {
	id: string | undefined;
	titulo: string | undefined;
	tarefa: string | undefined;
	criadoPor: string | undefined;
}

const initialState: ModalTarefasProps = {
	id: '',
	titulo: '',
	tarefa: '',
	criadoPor: '',
};

export const idTarefaSlice = createSlice({
	name: 'modalTarefas',
	initialState,
	reducers: {
		capturaId: (state, action: PayloadAction<ModalTarefasProps>) => {
			return {
				id: action.payload.id ?? '',
				titulo: action.payload.titulo ?? '',
				tarefa: action.payload.tarefa ?? '',
				criadoPor: action.payload.criadoPor ?? '',
			};
		},
		apagaId: (state) => {
			return initialState;
		},
	},
});

export const { apagaId, capturaId } = idTarefaSlice.actions;

export default idTarefaSlice.reducer;
