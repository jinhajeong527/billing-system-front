import React, { Component } from "react";
import ProductService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.getAllProducts = this.getAllProducts.bind(this);

        this.state = {
            products: []
        };
    }
    componentDidMount() {
        this.getAllProducts();
    }

    getAllProducts() {
        ProductService.getAll()
          .then(response => {
            this.setState({
              products : response.data
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
      }
    render() {
        const { products } = this.state;
        return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Products List</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">아이디</th>
                            <th scope="col">상품명</th>
                            <th scope="col">상품유형</th>
                            <th scope="col">최소단위</th>
                            <th scope="col">단위(호스트|CPU코어|URL)</th>
                            <th scope="col">가격 정보</th>
                            <th scope="col">생성일(UTC)</th>
                            <th scope="col">갱신일(UTC)</th>
                        </tr>
                    </thead>
                    <tbody>
                    { products && products.map((product) => (    
                        <tr>
                            <th scope="row">{product.product.id}</th>
                            <td>{product.product.name}</td>
                            <td>{product.product.productType}</td>
                            <td>{product.product.minCpu}</td>
                            <td>{product.product.chargeUnit}</td>
                            <td>{product.priceHistory.id}
                                {product.priceHistory.price} KRW
                                {product.priceHistory.createDate}
                            </td>
                            <td>{product.product.createDate}</td>
                            <td>{product.product.updateDate}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}
       