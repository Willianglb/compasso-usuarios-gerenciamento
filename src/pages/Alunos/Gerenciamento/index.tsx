import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";
import "./index.css";

interface IUsers {
  dataNascimento: string;
  email: string;
  idade: number;
  nome: string;
  perfilId: number;
  senha: string;
  sexo: string;
  telefone: string;
  usuario: string;
}

interface IParams {
  id: string;
}

const Gerenciamento: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<IParams>();
  const [users, setUsers] = useState<IUsers>({
    dataNascimento: "",
    email: "",
    idade: 1,
    nome: "",
    perfilId: 1,
    senha: "",
    sexo: "MASCULINO",
    telefone: "",
    usuario: "",
  });

  useEffect(() => {
    if (id != undefined) {
      findUser(id);
    }
  }, [id]);

  //Função para salvar os dados digitados
  function updatedUsers(e: ChangeEvent<HTMLInputElement>) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  //Função para criar um novo usuário ou criar um já existente
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id != undefined) {
      await api.put(`/usuarios/${id}`, users);
    } else {
      await api.post("/usuarios", users);
    }
    back();
  }

  //Função para pegar as informações de um usuário pelo seu ID
  async function findUser(id: string) {
    const response = await api.get(`/usuarios/${id}`);
    setUsers(response.data);
  }

  //Função para voltar a página
  function back() {
    history.goBack();
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="container">
          <Form onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome Completo"
                  name="nome"
                  value={users.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  name="usuario"
                  value={users.usuario}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DDNNNNNNNNN"
                  name="telefone"
                  value={users.telefone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DD-MM-YYYY"
                  name="dataNascimento"
                  value={users.dataNascimento}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="teste@teste.com"
                  name="email"
                  value={users.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  name="senha"
                  value={users.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Tipo de perfil (1 - aluno, 2 - admin)</Form.Label>
                <Form.Control
                  as="select"
                  name="perfilId"
                  value={users.perfilId}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                >
                  <option>1</option>
                  <option>2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                  as="select"
                  name="sexo"
                  value={users.sexo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                >
                  <option>MASCULINO</option>
                  <option>FEMININO</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Idade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite sua Idade"
                  name="idade"
                  value={users.idade}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updatedUsers(e)
                  }
                />
              </Form.Group>
            </Form.Row>

            <div className="gerenciamento-buttons">
              <Button variant="dark" type="submit">
                Submit
              </Button>
              <Button variant="dark" onClick={back}>
                Voltar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Gerenciamento;
