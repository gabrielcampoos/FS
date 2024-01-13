export interface Usuario {
	nome: string;
	username: string;
	senha: string;
}

export interface UsuarioState {
	nome: string;
	username: string;
	senha: string;
	token: string;
	isLogged: boolean;
}
