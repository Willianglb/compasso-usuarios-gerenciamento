import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Alunos from "./pages/Alunos";
import Gerenciamento from "./pages/Alunos/Gerenciamento";

//Redireciona o usuário para a página de login, caso ele tente acessar páginas que precisa estar logado
const PrivateRoute = (props: any) => {
  const isAuthenticated = !!sessionStorage.getItem("token");
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/alunos" component={Alunos} />
      <PrivateRoute
        exact
        path="/alunos-gerenciamento"
        component={Gerenciamento}
      />
      <PrivateRoute
        exact
        path={"/alunos-gerenciamento/:id"}
        component={Gerenciamento}
      />
    </Switch>
  );
};

export default Routes;
