import React, { Component } from "react";
import NavBarITem from "./NavBarITem";
import './styles.css';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [
                { name: "Listar Tarefa", href: "/", active: true },
                { name: "Nova Tarefa", href: "/form", active: false },

            ]
        }
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler(itemClicked) {
        const items = [...this.state.items];
        items.forEach(item => {
            if (item.name === itemClicked.name) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        this.setState({items});
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <span id="appName" className="navbar-brand md-0 h1">ToDo List</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <div className="navbar-nav mr-auto">
                                {this.state.items.map((item) =>
                                    <NavBarITem key={item.name} item={item} onClick={this.onClickHandler} />
                                )}
                            </div>

                        </div>
                        <span className="navbar-text">
                            Olá, Claucio Willian
                        </span>
                    </div>

                </nav>
            </div>
        )
    }
}

export default NavBar;