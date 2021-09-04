import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants";
import axios from "axios";

class AuthService {

    login(username, password, onLogin) {
        axios
            .post(`${AUTH_ENDPOINT}/login`, { username: username, password: password })
            .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
            }).catch(error => {
                console.error(error);
                onLogin(false);
            });
    }

    newUser(username,password,displayName,  onSuccess) {
        axios.post("http://localhost:8080/new", { username: username,password: password, displayName: displayName})
            .then(response => {
            console.log(response.data);
            onSuccess(true);
        }).catch(error => {
            console.error(`Nome do erro ${error}`);
            onSuccess(false);
        });
    }


    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    isAuthententicated() {
        return this.getJWTToken() !== null;
    }

}

export default new AuthService();