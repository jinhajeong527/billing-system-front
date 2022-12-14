import React, { Component } from "react";
import ProductService from "../services/product.service";

export default class Product extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMinCpu = this.onChangeMinCpu.bind(this);
        this.onChangeChargeUnit = this.onChangeChargeUnit.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    
        this.state = {
            currentProduct: {
                id: null,
                productType: null,
                name: null,
                minCpu: null,
                chargeUnit: null,
                price: null
            },
            message: ""
        };
    }

    componentDidMount() {
        const url = document.location.href;
        const splitBySlash = url.split('/')
        const seq = splitBySlash.length;
        this.getProduct(splitBySlash[seq-1]);
    }
    onChangeProductType(e) {
        const productType = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                productType: productType
                }
            };
        });
    }
    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                name: name
                }
            };
        });
    }
    onChangeMinCpu(e) {
        const minCpu = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                minCpu: minCpu
                }
            };
        });
    }
    onChangeChargeUnit(e) {
        const chargeUnit = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                chargeUnit: chargeUnit
                }
            };
        });
    }
    onChangePrice(e) {
        const price = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                price: price
                }
            };
        });
    }
    getProduct(id) {
        ProductService.get(id)
          .then(response => {
           this.setState({
            currentProduct: {
                id : response.data.product.id,
                productType: response.data.product.productType,
                name: response.data.product.name,
                minCpu: response.data.product.minCpu,
                chargeUnit: response.data.product.chargeUnit,
                price: response.data.priceHistory.price
            }});
            console.log(response.data);
           })
           .catch(e => {
             console.log(e);
           });
    }

    updateProduct() {
        ProductService.update(
          this.state.currentProduct.id,
          this.state.currentProduct
        )
        .then(response => {
        console.log(response.data);
        this.setState({
              message: "????????? ??????????????? ?????????????????????."
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    deleteProduct() {    
        ProductService.delete(this.state.currentProduct.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push("/products");
          })
          .catch(e => {
            console.log(e);
          });
    }
    render() {
        const { currentProduct } = this.state;
        return (
            <div>
            {currentProduct ? (
              <div className="edit-form">
                <h4>??????</h4>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      hidden
                      value={currentProduct.id}
                    />
                  </div>  
                  <div className="form-group">
                    <label htmlFor="productType">????????????</label>
                    <input
                      type="text"
                      className="form-control"
                      id="productType"
                      value={currentProduct.productType}
                      onChange={this.onChangeProductType}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">??????</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={currentProduct.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="minCpu">????????????</label>
                    <input
                      type="text"
                      className="form-control"
                      id="minCpu"
                      value={currentProduct.minCpu}
                      onChange={this.onChangeMinCpu}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="chargeUnit">??????</label>
                    <input
                        type="text"
                        className="form-control"
                        id="chargeUnit"
                        required
                        value={currentProduct.chargeUnit}
                        onChange={this.onChangeChargeUnit}
                        name="chargeUnit"
                    />
                   </div>
                   <div className="form-group">
                    <label htmlFor="price">??????</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        required
                        value={currentProduct.price}
                        onChange={this.onChangePrice}
                        name="price"
                    />
                    </div> 
                </form>
               
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteProduct}
                >
                  ??????
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateProduct}
                >
                  ??????
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        );
      }
    
}
