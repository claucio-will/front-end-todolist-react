import React, { Component } from "react";
import {Redirect} from 'react-router';
import AuthService from "../../api/AuthService";
import Alert from "../Alert";
// import "./style.css"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            alert: null,
            processing: false,
            loggedIn: false
        }
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    handlerSubmit(event) {
        event.preventDefault();
        this.setState({processing: true})
        AuthService.login(this.state.username, this.state.password, success => {
            if (success) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({alert: "Erro ao realizar o login"})
            }
            this.setState({processing: false})
        });
      
    }

    handlerInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState({ [field]: value });

    }

    render() {

        if (AuthService.isAuthententicated()) {
            return <Redirect to="/" />
        }

        if (this.state.loggedIn) {
           return <Redirect  to="/"/>
       }

        return (
            <div className="myContainer">
                <h1>Login</h1><br />
                {
                    this.state.alert !== null ? <Alert message={this.state.alert} /> : ""
                }
                <form onSubmit={this.handlerSubmit}>
                    <div className="form-group">

                        <label htmlFor="username">Usuário</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            onChange={this.handlerInputChange}
                            value={this.state.username}
                            placeholder="Nome de usuário"
                        />
                        <label htmlFor="username">Senha</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            onChange={this.handlerInputChange}
                            value={this.state.password}
                            placeholder="Digite sua senha"
                        />
                    </div><br />
                    <button
                        type="submit"
                        className="btn btn-success aligmentItem"
                        disabled={this.state.processing}
                    >ENTRAR</button>
                </form>
             
            </div>
        );
    }
}

export default Login;