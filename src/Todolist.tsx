import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {NewComponentMap} from './NewComponentMap';
import {Button} from '@material-ui/core';
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    editTitleTodolist: (todolistId: string, title: string) => void
    editTitleTask: (todolistId: string, taskId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const editTitleTodolistHandler = (title: string) => {
        props.editTitleTodolist(props.todolistId, title)
    }

    const ChangeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistId, filterValue)
    }

    const deleteTaskHandler = () => props.removeTodolist(props.todolistId)

    return <div>
        <h3>
            <EditableSpan callBack={editTitleTodolistHandler} title={props.title}/>
            <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </h3>
        < AddItemForm callBack={addTaskHandler}/>
        <NewComponentMap
            tasks={props.tasks}
            removeTask={props.removeTask}
            todolistId={props.todolistId}
            changeTaskStatus={props.changeTaskStatus}
            editTitleTask={props.editTitleTask}
        />
        <div>
            <Button
                variant={props.filter === 'all' ? "outlined" : "text"}
                onClick={() => ChangeFilterHandler('all')}
                color="inherit">All
            </Button>
            <Button
                variant={props.filter === 'active' ? "outlined" : "text"}
                onClick={() => ChangeFilterHandler('active')}
                color="primary">Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? "outlined" : "text"}
                onClick={() => ChangeFilterHandler('completed')}
                color="error">Completed
            </Button>
        </div>
    </div>
}
