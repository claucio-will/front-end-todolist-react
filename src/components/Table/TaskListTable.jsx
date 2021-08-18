import React, { Component } from "react";
import TaskService from "../../api/TaskService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TaskListTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }

        this.onDeleteHadler = this.onDeleteHadler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
    }

    componentDidMount() {
        this.listTasks();
    }


    listTasks() {
        this.setState({ tasks: TaskService.list() });
    }

    onDeleteHadler(id) {
        if (window.confirm("Deseja Excluir a Tarefa ?")) {
            TaskService.delete(id);
            this.listTasks();
            toast.success("Tarefa excluida com sucesso!");
        }
    }

    onStatusChangeHandler(task) {
        task.done = !task.done;
        TaskService.save(task);
        this.listTasks();
    }


    render() {
        return (
            <>
                <table className="table table-striped" >
                    <TableHeader />
                    {this.state.tasks.length > 0 ? <TableBody
                        tasks={this.state.tasks}
                        onDelete={this.onDeleteHadler}
                        onStatusChange={this.onStatusChangeHandler}
                    /> :
                        <EmptyTableBody />}
                </table>
                <ToastContainer autoClose={2000} position="bottom-left" />
            </>

        );
    }

}


const TableHeader = () => {
    return (
        <thead className="table-light" >
            <tr >
                <th scope="col">Status</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
    );
}

const TableBody = (props) => {
    return (

        <tbody>
            {props.tasks.map(task =>
                <tr key={task.id}>
                    <td><input type="checkbox"
                        checked={task.done}
                        onChange={() => props.onStatusChange(task)}
                    /></td>
                    <td >{task.done ? <s>{task.description}</s> : task.description}</td>
                    <td> {task.done ? <s>{task.whenToDo}</s> : task.whenToDo}</td>
                    <td>
                        <input className="btn btn-success" type="button" value="Editar" />
                        &nbsp;&nbsp;
                        <input className="btn btn-dark"
                            type="button"
                            value="Excluir"
                            onClick={() => props.onDelete(task.id)}
                            
                        />
                    </td>
                </tr>
            )}

        </tbody>
    )
}

const EmptyTableBody = () => {
    return (
        <tbody>
            <tr><td colSpan="4">Nenhuma tarefa cadastrada!</td></tr>
        </tbody>
    )
}
export default TaskListTable;