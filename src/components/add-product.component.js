import React, { Component } from "react";
import ProductService from "../services/product.service";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMinCpu = this.onChangeMinCpu.bind(this);
        this.onChangeChargeUnit = this.onChangeChargeUnit.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.registerProduct = this.registerProduct.bind(this);
        //this.newTutorial = this.newTutorial.bind(this);
        
        this.state = {
          productType: "",
          name: "",
          minCpu: "",
          chargeUnit: "",
          price: "",
          submitted: false
        };
    }
    onChangeProductType(e) {
        this.setState({
            productType: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeMinCpu(e) {
        this.setState({
            minCpu: e.target.value
        });
    }
    onChangeChargeUnit(e) {
        this.setState({
            chargeUnit: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    registerProduct() {
        var data = {
          productType: this.state.productType,
          name: this.state.name,
          minCpu: this.state.minCpu,
          chargeUnit: this.state.chargeUnit,
          price: this.state.price
        };
    
        ProductService.create(data)
          .then(response => {
            this.setState({
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
                <div>
                    <h4>성공적으로 상품을 등록했습니다.</h4>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                    <label htmlFor="productType">상품유형</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productType"
                        required
                        value={this.state.productType}
                        onChange={this.onChangeProductType}
                        name="productType"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="name">상품명</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.state.name}
                        onChange={this.onChangeName}
                        name="name"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="minCpu">최소단위</label>
                    <input
                        type="text"
                        className="form-control"
                        id="minCpu"
                        required
                        value={this.state.minCpu}
                        onChange={this.onChangeMinCpu}
                        name="minCpu"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="chargeUnit">단위</label>
                    <input
                        type="text"
                        className="form-control"
                        id="chargeUnit"
                        required
                        value={this.state.chargeUnit}
                        onChange={this.onChangeChargeUnit}
                        name="chargeUnit"
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="price">가격</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        required
                        value={this.state.price}
                        onChange={this.onChangePrice}
                        name="price"
                    />
                    </div>
                    
          
    
                    <button onClick={this.registerProduct} className="btn btn-success">
                    등록하기
                    </button>
                </div>
            )}
          </div>
        );
      }


    
}