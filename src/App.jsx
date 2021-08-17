import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import { BrowserRouter } from "react-router-dom";
import TaskListTable from './components/Table/TaskListTable';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div className="container" style={{marginTop:20}}>
            <TaskListTable />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
