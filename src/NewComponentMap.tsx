import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

type NewComponentMapPropsType = {
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    todolistId: string
    changeTaskStatus: (todolistId: string, id: string, checked: boolean) => void
    editTitleTask: (todolistId: string, taskId:string, title: string) => void
}

export const NewComponentMap = (props: NewComponentMapPropsType) => {

    const {tasks, removeTask, todolistId, changeTaskStatus, editTitleTask} = props;

    const editTitleTaskHandler = (taskId: string, title: string) => {
        editTitleTask(todolistId, taskId, title)
    }
    return (
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
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
        </ul>
    );
};