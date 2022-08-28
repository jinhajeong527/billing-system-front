import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProductList from "./components/product-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Whatap
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-itsem">
              <Link to={"/products"} className="nav-link">
                상품 리스트
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/products" element={<ProductList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;