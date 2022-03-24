import React, {useCallback} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist is called')
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.todolistId, props.addTask])

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props.todolistId, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'all'), [props.todolistId, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'active'), [props.todolistId, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'completed'), [props.todolistId, props.changeFilter])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.todolistId}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


