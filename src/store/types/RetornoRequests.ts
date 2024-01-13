import { TarefaState } from './Tarefa';
import { UsuarioState } from './Usuario';

export interface RespostaCadastro {
	sucesso: boolean;
	mensagem: string;
	dadosCadastrados?: UsuarioState & { id: string };
}

export interface RespostaLogin {
	sucesso: boolean;
	mensagem: string;
	dados?: { id: string; nome: string; username: string; token: string };
}

export interface RespostaTarefa {
	sucesso: boolean;
	mensagem: string;
	dadosCadastrados?: TarefaState[];
}
