import api from "./api";

interface Credentials {
  usuario: string;
  senha: string;
}

type Token = string;

export const login = (credentials: Credentials) =>
  api
    .post<{ token: Token }>("/autenticacao", credentials)
    .then((res) => res.data);

export const storeToken = (token: Token) => {
  window.sessionStorage.setItem("token", token);
};