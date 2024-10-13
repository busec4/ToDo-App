function ToDoTasks({task,index,handleCompleteTasks,handleEditChange,handleDeleteTask,handleEditTask}){

    return(
        <li  key={task.id}  className={task.edited ? "editMode" : ""}>
        <input type="checkbox"  checked={task.done} onClick={() => handleCompleteTasks(index)} />
        {task.edited ? (<input type="text" value={task.text} onChange={(e) => handleEditTask(e,index)}/>):(
        <span>{task.text}</span>
        )}
        <div className='button'>
        <button className="edit" onClick={() => handleEditChange(index)}>{task.edited ? "save" : "edit"}</button>
        <button className="delete" onClick={() => handleDeleteTask(index)}>Delete</button>
        </div>
       </li>
    )

}

export default ToDoTasks;