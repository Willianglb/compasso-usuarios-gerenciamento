import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./index.css";

interface IUsers {
  id: number;
  nome: String;
  usuario: String;
  telefone: String;
  dataNascimento: String;
  email: String;
  perfilTipo: String;
}

const Alunos: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadUsers();
  }, []);

  //Função para carregar uma Lista de Usuários na API
  async function loadUsers() {
    const response = await api.get("/usuarios");
    setUsers(response.data.content);
    console.log(response.data.content);
  }

  //Função para Deletar um usuário na API
  async function deleteUser(id: number) {
    await api.delete(`/usuarios/${id}`);
    loadUsers();
  }

  //Função para abrir a página de cadastramento de um novo usuário
  function newUser() {
    history.push("/alunos-gerenciamento");
  }

  //Função para abrir a página de edição de um usuário já existente
  function editUser(id: number) {
    history.push(`/alunos-gerenciamento/${id}`);
  }

  //Função que apaga o token da sessão, deslogando o usuário
  function logout() {
    sessionStorage.clear();
    history.push("/");
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="users-header">
          <Button variant="dark" onClick={() => newUser()}>
            Cadastrar
          </Button>
          <Button variant="dark" onClick={() => logout()}>
            Sair
          </Button>
        </div>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.usuario}</td>
                <td>{user.telefone}</td>
                <td>{user.dataNascimento}</td>
                <td>{user.email}</td>
                <td>{user.perfilTipo}</td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => editUser(user.id)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Deletar
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Alunos;
