export interface TarefaDTO {
	id: string;
	titulo: string;
	tarefa: string;
	criadoPor: string;
}

export interface TarefaState {
	id: string;
	titulo: string;
	tarefa: string;
	criadoPor: string;
	criadoEm: string;
}

export interface PesquisaTarefa {
	id: string;
	username: string;
}
