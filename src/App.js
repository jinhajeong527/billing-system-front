import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import ProductList from "./components/product-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";
import Billing from "./components/billing.component";

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
              <Link to={"/login"} className="nav-link">
                로그인
              </Link>
            </li>
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
            <li className="nav-item">
              <Link to={"/billing"} className="nav-link">
                사용료 확인
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route exact path="/add" element={<AddProduct />} />
            <Route exact path="/product/:id" element={<Product />} />
            <Route exact path="/billing" element={<Billing />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;