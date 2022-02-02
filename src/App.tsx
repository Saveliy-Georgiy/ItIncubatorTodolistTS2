import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

   /* let [filter, setFilter] = useState<FilterValuesType>("all");*/

    let [todolists, setTodolists]=useState<Array<TodolistsType>>([
        {id:todolistID1,title:'What to learn',filter:'all'},
        {id:todolistID2,title:'What to buy',filter:'all'},
    ])

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f=> f.id !== id)})
        /*let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]], })
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
      setTasks({...tasks, [todolistId]: tasks[todolistId].map(m=> m.id === taskId ? {...m, isDone}: m)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter:value} : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistId))
    }

    return (
        <div className="App">
            {
                todolists.map((tl, index) => {
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                    }
                    return  <Todolist key={index}
                                      todolistId={tl.id}
                                      title={tl.title}
                                      tasks={tasksForTodolist}
                                      removeTodolist={removeTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      filter={tl.filter}
                    />
                })
            }

        </div>
    );
}

export default App;
/* let task = tasks.find(t => t.id === taskId);
       if (task) {
           task.isDone = isDone;
       }

       setTasks([...tasks]);*/