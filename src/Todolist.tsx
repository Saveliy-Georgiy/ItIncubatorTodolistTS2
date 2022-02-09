import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import { NewComponentMap } from './NewComponentMap';
import {Button} from "./Button";


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

    /*const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");*/
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");
   /* const removeTodolistHandler = () => props.removeTodolist(props.todolistId)*/

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const editTitleTodolistHandler = (title: string) => {
        props.editTitleTodolist(props.todolistId, title)
    }

    const ChangeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(props.todolistId, filterValue)
    }

    return <div>
        <h3><EditableSpan callBack={editTitleTodolistHandler} title={props.title}/>
        {/*<button onClick={removeTodolistHandler}>X</button>*/}
            <Button
                name="X"
                callBack={() => props.removeTodolist(props.todolistId)}
            />
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <NewComponentMap
            tasks={props.tasks}
            removeTask={props.removeTask}
            todolistId={props.todolistId}
            changeTaskStatus={props.changeTaskStatus}
            editTitleTask={props.editTitleTask}
        />
        {/*<ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                               <EditableSpan title={t.title} callBack={(title) => editTitleTaskHandler(t.id, title)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>*/}
        <div>
            <Button
                filter={props.filter}
                name="all"
                callBack={() => ChangeFilterHandler('all')}
            />
            <Button
                filter={props.filter}
                name="active"
                callBack={() => ChangeFilterHandler('active')}
            /> <Button
                filter={props.filter}
                name="completed"
                callBack={() => ChangeFilterHandler('completed')}
            />
           {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>*/}
           {/* <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>*/}
           {/* <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
        </div>
    </div>
}
