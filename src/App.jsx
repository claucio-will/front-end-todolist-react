import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router"
import TaskListTable from './components/Table/TaskListTable';
import CreateTasks from './components/creatTasks/CreateTasks';
import Login from './components/login/Login';
import NewUser from './components/login/NewUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container" style={{ marginTop: 20 }}>
            <Switch>
              <Route exact path="/" component={TaskListTable} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/new" component={NewUser} />
             <Route exact path="/form" component={CreateTasks} />
             <Route exact path="/form/:id" component={CreateTasks} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
