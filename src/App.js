import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import DataDisplay from './components/DataDisplay';
import DataForm from './components/DataForm';
import BACKEND from './config';

const App = () => {

  const [task, setTask] = useState({
      title: '',
      description: ''
  });

  const [tasks, setTasks] = useState([]);

  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
      const fetchTasks = () => {
          const url = `${BACKEND}/tasks`;
          console.log(url);
          axios.get(url)
              .then((response) => {
                  setTasks(response.data);
              })
      };
      fetchTasks();
      setListUpdated(false)
  }, [listUpdated]);

  const addTask = (newTask) => {
      setTasks([...tasks, newTask]);
  };

  return (
      <Fragment>
          <Navbar brand="App" />
          <div className="container">
              <div className='row'>
                  <div className='col-7'>
                      <h2 style={{ textAlign: 'center' }}>Lista</h2>
                      <DataDisplay task={task} setTask={setTask} tasks={tasks} setListUpdated={setListUpdated} />
                  </div>
                  <div className='col-5'>
                      <h2 style={{ textAlign: 'center' }}>Formulario</h2>
                      <DataForm task={task} setTask={setTask} addTask={addTask} />
                  </div>
              </div>
          </div>
      </Fragment>
  );
};

export default App;