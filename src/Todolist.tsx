import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {TaskRedux} from './TaskRedux';
import {Button, IconButton} from '@material-ui/core';
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

export const Todolist = memo((props: PropsType) => {
    console.log("Todolist")
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])
    const editTitleTodolistHandler = useCallback((title: string) => {
        props.editTitleTodolist(props.todolistId, title)
    }, [props.editTitleTodolist, props.todolistId])
    const ChangeFilterHandler = useCallback((filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistId, filterValue)
    }, [props.changeFilter, props.todolistId])
    const deleteTaskHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])

    let allTodolistTasks = props.tasks

    if (props.filter === "active") {
        allTodolistTasks = allTodolistTasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        allTodolistTasks = allTodolistTasks.filter(t => t.isDone);
    }
    console.log(props.filter)
    return <div>
        <h3>
            <EditableSpan onChange={editTitleTodolistHandler} value={props.title}/>
            <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </h3>
        < AddItemForm callBack={addTaskHandler}/>

        {
            allTodolistTasks.map(t => {
                return <TaskRedux
                    key={t.id}
                    taskId={t.id}
                    todolistId={props.todolistId}
                />
            })
        }
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
})
