import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistsReducerACType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title}: m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter}: m)
        default: return state
    }
}

type TodolistsReducerACType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistACType | ChangeFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistACType = ReturnType<typeof changeTodolistTitleAC>
/*type ChangeFilterACType = ReturnType<typeof changeFilterAC>*/
type ChangeFilterACType = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        id: string,
        filter: FilterValuesType
    }
}
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id: todolistId1}
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {todolistId: v1(), title}
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {id, title}
    } as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {id, filter}
    } as const
}