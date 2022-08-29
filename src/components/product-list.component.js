import React, { Component } from "react";
import ProductService from "../services/product.service";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            products: [],
            page: 1,
            count: 0,
            pageSize: 5
        };
        this.pageSizes = [5, 10, 15];
    }
    componentDidMount() {
        this.getAllProducts();
    }
    handlePageChange(event, value) {
        console.log(value);
        this.setState(
          {
            page: value,
          },
          () => {
            this.getAllProducts();
          }
        );
      }
    handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.getAllProducts();
          }
        );
    }
    getAllProducts() {
        const { page, pageSize } = this.state;
        var data = {
            page: page - 1,
            size: pageSize,
            sort : "id"
        };
        ProductService.getAll(data)
          .then(response => {
            this.setState({
              products : response.data.productListPayload,
              count: response.data.totalPages
            });
            console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    render() {
        const { products, page, count, pageSize} = this.state;
        return (
        <div>
            <div className="col-md-6">
                <h4>상품 목록</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>수정 및 삭제</th>
                            <th>아이디</th>
                            <th>상품명</th>
                            <th>상품유형</th>
                            <th>최소단위</th>
                            <th>단위(호스트|CPU코어|URL)</th>
                            <th>가격 정보</th>
                            <th>생성일(UTC)</th>
                            <th>갱신일(UTC)</th>
                        </tr>
                    </thead>
                    <tbody>
                    { products && products.map((product) => (    
                        <tr>
                            <th>
                            <Link to={"/product/" + product.product.id}>관리</Link>
                            </th>
                            <td>{product.product.id}</td>
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
                <div className="mt-3">
                {"Items per Page: "}
                <select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                    <option key={size} value={size}>
                    {size}
                    </option>
                ))}
                </select>
                <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={this.handlePageChange}
                />
                </div>
            </div>
        </div>
        );
    }
}
       