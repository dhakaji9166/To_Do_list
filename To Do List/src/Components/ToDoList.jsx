import React, { useEffect, useState } from 'react';
import './ToDoList.css';
import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function ToDoList() {
    const [isComplete, setIscomplete] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [CompleteTodo, setCompleteTodo] = useState([]);

    const inputValueHandler = (e) => {
        setNewTitle(e.target.value);
    }

    const inputDescriptionHandler = (e) => {
        setNewDescription(e.target.value);
    }

    const AddHandler = () => {
        let newToDoItem = {
            title: newTitle,
            description: newDescription,
        }
        let updateToDoItem = [...todoList];
        updateToDoItem.push(newToDoItem);
        setTodoList(updateToDoItem);
        localStorage.setItem('todoList', JSON.stringify(updateToDoItem));
    };

    const deleteHandle = (index) => {
        let reduceTodo = [...todoList];
        reduceTodo.splice(index, 1);
        localStorage.setItem('todoList', JSON.stringify(reduceTodo));
        setTodoList(reduceTodo);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let filteredItems = {
            ...todoList[index],
            completedOn: completedOn
        }
        let updateCompleteArr = [...CompleteTodo];
        updateCompleteArr.push(filteredItems);
        setCompleteTodo(updateCompleteArr);
        deleteHandle(index);
        localStorage.setItem('CompleteTodo', JSON.stringify(updateCompleteArr));
    }

    useEffect(() => {
        let savedTodoList = JSON.parse(localStorage.getItem('todoList'));
        let savedCompleteTodo = JSON.parse(localStorage.getItem('savedCompleteTodo'));

        if (savedTodoList) {
            setTodoList(savedTodoList);
        }
        if (savedCompleteTodo) {
            setCompleteTodo(savedCompleteTodo);
        }
    }, []);

    const completeDeleteHandle = (index) => {
        let reduceTodo = [...CompleteTodo];
        reduceTodo.splice(index, 1);
        localStorage.setItem('CompelteTodo', JSON.stringify(reduceTodo));
        setCompleteTodo(reduceTodo);
    }

    return (
        <div className='main'>
            <h1>To Do List</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type="text" onChange={inputValueHandler} placeholder='What is your task title' />
                    </div>

                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type="text" onChange={inputDescriptionHandler} placeholder='What is your task description' />
                    </div>
                    <div className="todo-input-item">
                        <button type='button' onClick={AddHandler} className='Btn'>Add</button>
                    </div>

                </div>

                <div className="btn-area">
                    <button className={`secondarybtn ${isComplete === false && 'active'}`} onClick={() => setIscomplete(false)}>ToDo</button>
                    <button className={`secondarybtn ${isComplete === true && 'active'}`} onClick={() => setIscomplete(true)}>Complete</button>
                </div>
                <div className="todo-list">
                    {isComplete === false && todoList.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div>
                                    <AiFillDelete className='icon' onClick={() => deleteHandle(index)} />
                                    <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                                </div>
                            </div>
                        )
                    })}
                    {isComplete === true && CompleteTodo.map((item, index) => {
                        return (
                            <div className="todo-list-item" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed on: {item.completedOn}</small></p>
                                </div>
                                <div>
                                    <AiFillDelete className='icon' onClick={() => completeDeleteHandle(index)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ToDoList;
