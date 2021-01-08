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

export const token = window.sessionStorage.getItem("token");

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}
