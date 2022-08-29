import http from "../http-common";

class ProductService {
    getAll(data) {
        return http.post("/product/paging", data);
    }
    get(id) {
        return http.get(`/product/${id}`);
    }
    create(data) {
        return http.post("/product", data);
    }
    update(id, data) {
        return http.put(`/product/${id}`, data);
    }
    delete(id) {
        return http.delete(`/product/${id}`);
    }
    
}

export default new ProductService();