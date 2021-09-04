import React, { Component } from "react";
import TaskService from "../../api/TaskService";
import { Redirect } from 'react-router';
import AuthService from "../../api/AuthService";

class CreateTasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: 0,
                description: "",
                whenToDo: ""
            },
            redirect: false,
            buttonName: "Cadastrar"
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);

    }

    componentDidMount() {
        const editId = this.props.match.params.id;
        if (editId) {
            const task = TaskService.load(~~editId);
            this.setState({ task: task, buttonName: "Editar" });

        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        TaskService.save(this.state.task);
        this.setState({ redirect: true });
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({ task: { ...prevState.task, [field]: value } }));

    }

    render() {

        if (!AuthService.isAuthententicated()) {
            return <Redirect to="/login" />
        }
   

        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <>
                <h1>Nova Tarefa</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="description">Descriçao:</label>
                        <input
                            placeholder="Digite a descrição"
                            onChange={this.onInputChangeHandler}
                            type="text"
                            name="description"
                            value={this.state.task.description}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="whenToDo">Data:</label>
                        <input
                            onChange={this.onInputChangeHandler}
                            type="date"
                            name="whenToDo"
                            value={this.state.task.whenToDo}
                            className="form-control" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success">{this.state.buttonName}</button>
                    &nbsp;&nbsp;
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => this.setState({redirect: true})}
                    >Cancelar</button>
                </form>
            </>
        );
    }
}

export default CreateTasks;