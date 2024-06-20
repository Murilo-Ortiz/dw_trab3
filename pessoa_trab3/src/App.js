import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';

import HomePage from "./components/HomePage";
import AddPessoa from "./components/addPessoa";
import ListPessoa from "./components/listPessoa";
import Pessoa from "./components/pessoa";


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
              <Link to={"/"} className="navbar-brand">
                <b>Biblioteca</b>
              </Link>
            </div>
          </nav>
          <div className="container container-border mt-3">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ListPessoa />} path="/list" />
              <Route element={<AddPessoa />} path="/add" />
              <Route element={<Pessoa />} path="/list/:id" />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


