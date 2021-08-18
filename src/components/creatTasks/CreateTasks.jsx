import React, { Component } from "react";
import TaskService from "../../api/TaskService";
import {Redirect} from 'react-router';

class CreateTasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: 0,
                description: "",
                whenToDo: ""
            },
            redirect: false
        }
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);

    }

    onSubmitHandler(event) {
        event.preventDefault();
        TaskService.save(this.state.task);
        this.setState({ redirect: true });
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState =>({ task: {...prevState.task, [field]: value }}));
    
    }
    
    render() {
  
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            );
       }
        return (
            <>
                <h1>Nova Tarefa</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div>
                        <label for="description" className="form-label">Descriçao:</label>
                        <input onChange={this.onInputChangeHandler} type="text" name="description" className="form-control" />
                    </div>
                    <div>
                        <label for="whenToDo" className="form-label">Data:</label>
                        <input onChange={this.onInputChangeHandler} type="date" name="whenToDo" className="form-control" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success">Cadastrar</button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-dark">Voltar</button>
                </form>
            </>
        );
    }
}

export default CreateTasks;