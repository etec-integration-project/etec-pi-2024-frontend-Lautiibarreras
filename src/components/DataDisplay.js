
import React from 'react';
import axios from 'axios';
import BACKEND from '../config';

const DataDisplay = ({ task, setTask, tasks, setListUpdated }) => {

    const handleDelete = (id) => {
        axios.delete(`${BACKEND}/tasks/${id}`)
            .then((res) => {
                console.log(res);
                setListUpdated(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    let {title, description} = task;

    const handleUpdate = (id) => {

        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }

        axios.put(`${BACKEND}/tasks/${id}`, task)
            .then((res) => {
                console.log(res);
                setListUpdated(true);
                setTask(
                    title = '',
                    description = ''
                )
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            <div className='mb-3'>
                                <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Delete</button>
                            </div>
                            <div className='mb-3'>
                                <button onClick={() => handleUpdate(task.id)} className="btn btn-dark">Update</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataDisplay;