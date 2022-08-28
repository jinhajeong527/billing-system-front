import http from "../http-common";

class BillingService {

    get() {
        return http.get("/billing");
    }
    
}

export default new BillingService();