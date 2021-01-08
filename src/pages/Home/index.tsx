import React, { ChangeEvent, useState, useCallback, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { login, storeToken } from "../../services/Authentication";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    usuario: "",
    senha: "",
  });

  //Função que salva as credenciais digitadas no login
  const updateCredentials = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      });
    },
    [credentials]
  );

  //Função para realizar login
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(credentials);
      storeToken(user.token);
      api.defaults.headers.authorization = `Bearer ${user.token}`;
      history.push("/alunos");
    } catch (error) {
      console.log(error);
      alert(`Login Inválido. ${" "} ${error}`);
    }
  };

  return (
    <>
      <br />
      <div className="container">
        <Container>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Nome de Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="usuario"
                value={credentials.usuario}
                onChange={updateCredentials}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                name="senha"
                value={credentials.senha}
                onChange={updateCredentials}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Home;
