import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskReduxPropsType = {
    taskId: string
    todolistId: string
}

export const TaskRedux = React.memo(({taskId, todolistId}: TaskReduxPropsType) => {

    console.log('TaskRedux')

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(task => task.id === taskId)[0])
    const dispatch = useDispatch()

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }, [dispatch, changeTaskStatusAC])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newValue))
    }, [dispatch, changeTaskTitleAC])

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(todolistId, taskId)), [dispatch, removeTaskAC])

    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})