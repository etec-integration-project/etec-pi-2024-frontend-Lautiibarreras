
import React from 'react';
import axios from 'axios';
import BACKEND from '../config';

const DataForm = ({ task, setTask, addTask }) => {

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    let {title, description} = task;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }
        const newTask = { title: title, description: description };
        axios
            .post(`${BACKEND}/tasks`, newTask)
            .then((res) => {
                addTask(res.data);
                setTask({
                    title: '',
                    description: ''
                });
                    })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='title' className='form-label'>Title</label>
                <input value={title} name="title" onChange={handleChange} id="title" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor='description' className='form-label'>Description</label>
                <input value={description} name="description" onChange={handleChange} id="description" type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default DataForm;