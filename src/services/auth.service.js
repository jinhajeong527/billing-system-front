import http from "../http-common";

class AuthService {

    login(data) {
        return http.post("/auth/signin", data)
        .then(response => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
        });
    }
    
    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
    
}

export default new AuthService();