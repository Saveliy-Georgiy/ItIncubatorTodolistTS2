import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan title={t.title} callBack={(title) => editTitleTaskHandler(t.id, title)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
    );
};