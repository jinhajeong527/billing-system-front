import http from "../http-common";

class BillingService {

    get(data) {
        return http.post("/billing", data);
    }
    
}

export default new BillingService();