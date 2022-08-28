import http from "../http-common";

class ProductService {
    getAll() {
        return http.get("/product");
    }
    create(data) {
        return http.post("/product", data);
    }
}

export default new ProductService();