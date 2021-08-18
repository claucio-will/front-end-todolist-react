import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router"
import TaskListTable from './components/Table/TaskListTable';
import CreateTasks from './components/creatTasks/CreateTasks';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container" style={{ marginTop: 20 }}>
            <Switch>
              <Route exact path="/"><TaskListTable /></Route>
              <Route path="/form"><CreateTasks /></Route>
              
            </Switch>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
