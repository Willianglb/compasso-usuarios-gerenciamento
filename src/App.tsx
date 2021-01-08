import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar_users from "./components/NavBar/Navbar";

import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
    <Navbar_users />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
