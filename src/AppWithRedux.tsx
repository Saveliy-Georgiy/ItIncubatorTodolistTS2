import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const editTitleTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [])

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

    const editTitleTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTodolist={removeTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        changeTodolistTitle={editTitleTodolist}
                                        changeTaskTitle={editTitleTask}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;