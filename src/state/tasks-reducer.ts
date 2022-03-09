import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerACType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: [],
            }
        case "REMOVE-TODOLIST":
            /*let {[action.payload.id]:[], ...part} = {...state}
            return part*/
            let newState = {...state}
            delete newState[action.payload.id]
            return newState
        default:
            return state
    }
}

export type RemoveTaskACType = {
    type: "REMOVE-TASK"
    payload: {
        todolistId: string
        taskId: string
    }


}

export type AddTaskACType = {
    type: "ADD-TASK"
    payload: {
        todolistId: string
        title: string
    }
}

export type changeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}

export type changeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        todolistId: string,
        taskId: string,
        title: string
    }
}

type TasksReducerACType =
    RemoveTaskACType
    | AddTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistId, taskId}
    }
}

export const addTaskAC = (todolistId: string, title: string): AddTaskACType => {
    return {
        type: 'ADD-TASK',
        payload: {todolistId, title}
    }
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): changeTaskStatusACType => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {todolistId, taskId, isDone}
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleACType => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {todolistId, taskId, title}
    }
}