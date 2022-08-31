import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import ProductList from "./components/product-list.component";
import Product from "./components/product.component";
import AddProduct from "./components/add-product.component";
import Billing from "./components/billing.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: false
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: true
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Whatap
          </a>
          <div className="navbar-nav mr-auto">
            {currentUser ? (
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  로그아웃
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  로그인
                </Link>
              </li>
            )}
            {currentUser && (
            <li className="nav-itsem">
              <Link to={"/products"} className="nav-link">
                상품 리스트
              </Link>
            </li>
            )}
            {currentUser && (
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            )}
            {currentUser && (
            <li className="nav-item">
              <Link to={"/billing"} className="nav-link">
                사용료 확인
              </Link>
            </li>
            )}
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/add" component={AddProduct} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/billing" component={Billing} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;