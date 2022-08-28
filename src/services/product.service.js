import http from "../http-common";

class ProductService {
    getAll() {
        return http.get("/product");
    }
}

export default new ProductService();