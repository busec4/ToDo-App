import React, { useEffect, useReducer,useRef} from 'react';
import ToDoTasks from './ToDoTasks.jsx';

/*
    yapılacaklar:tasks {
        text
        id
        done
        edited
    }
*/ 
function tasksReducer(tasks, action){

    switch(action.type) {
        case "added": {
            return [...tasks,action.payload];
            
        }
        case "deleted": {
            return tasks.filter((_,index) => index !== action.id);
        }
        case "changeEdit": {
            return tasks.map((task,index) =>
                index === action.id ? {...task, edited: !task.edited} : task
            );
        }
        case "edited": {
            return tasks.map((task,index) =>
                index === action.id ? {...task,text:action.text} : task
            );
        }
        case "completed": {
            return tasks.map((task,index) => 
                index === action.id ? {...task, done: !task.done} : task
            );
        }
        default: {
            throw Error('Unknown Action' + action.type);
        }
    }
}

function ToDoApp(){

    const [tasks, dispatch] = useReducer(tasksReducer,[], () => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() =>{
        localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks]);
    const inputRef = useRef(null);
    // const editRef = useRef(null);
    function handleAddedTask(){
        const text = inputRef.current.value;
        if (text.trim() !== "") {
            dispatch({
                type: 'added',
                payload:{text: text.trim(),done:false,edited:false}
            });
            inputRef.current.value = '';
        }
        
    }


    return(
        <div className="todo-container">
                <h2>TODO LIST</h2>
                <h3>Add Item</h3>
                <p>
                    <input className="new-task" ref={inputRef} placeholder="Enter New Task"  />
                    <button className='add-btn' onClick={handleAddedTask}>Add</button>
                </p>
                <h3>TODO</h3>
                <ul className="incomplete-tasks">
                    {tasks.map((task, index) =>!task.done && (
                    <ToDoTasks
                    key = {index} 
                    task = {task}
                    index = {index}
                    handleCompleteTasks = {(index) => dispatch({type:'completed',id:index})}
                    handleEditChange = {(index) => dispatch({type:'changeEdit',id:index})}
                    handleDeleteTask = {(index) => dispatch({type:'deleted',id:index})}
                    handleEditTask = {(e,index) => dispatch({type:'edited',id:index,text:e.target.value.trim()})}/>
                    )
                    )}
                </ul>
                <h3>COMPLETE</h3>
                <ul className="completed-tasks">
                    {tasks.map((task, index) => task.done && (
                    <ToDoTasks
                    key = {index} 
                    task = {task}
                    index = {index}
                    handleCompleteTasks = {(index) => dispatch({type:'completed',id:index})}
                    handleEditChange = {(index) => dispatch({type:'changeEdit',id:index})}
                    handleDeleteTask = {(index) => dispatch({type:'deleted',id:index})}
                    handleEditTask = {(e,index) => dispatch({type:'edited',id:index,text:e.target.value.trim()})}/>
                    )
                    )}
                </ul>
            </div>
        );
}


export default ToDoApp