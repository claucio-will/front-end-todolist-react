import React, { Component } from "react";
import AuthService from "../../api/AuthService";
import { Redirect } from 'react-router';

class NewUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            displayName: "",
            password: "",
            success: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlerInputChange = this.handlerInputChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        AuthService.newUser(this.state.username,this.state.password,this.displayName,  success => {
            if (success) {
                this.setState({ success: true });
            }
        });

    }

    handlerInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState({ [field]: value });
    }


    render() {

        if (this.state.success) {
            return <Redirect to="/login" />
        }

        return (
            <div>
                <h1>Criar Novo Usuário</h1>
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label htmlFor="username">Nome de Usuário:</label>
                    <input
                        className="form-control"
                        placeholder="Digite o nome de usuário"
                        name="username"
                        value={this.state.username}
                        onChange={this.handlerInputChange}
                    />
                     <label htmlFor="displayName">Nome de exibição:</label>
                    <input
                        className="form-control"
                        placeholder="Digite o nome de exibição"
                        name="displayName"
                        value={this.state.displayName}
                        onChange={this.handlerInputChange}
                    />
                    <label htmlFor="password">Senha:</label>
                    <input
                       type="password"
                        className="form-control"
                        placeholder="Digite a senha"
                        name="password"
                        value={this.state.password}
                        onChange={this.handlerInputChange}
                    />
                    <br />
                    <button type="submit" className="btn btn-success">Criar</button>
                    
                </form>
            </div>
        );
    }
}

export default NewUser;