import Header from "./components/Header";
import Tasks from './components/Tasks'
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks()
      setTasks(data)
    }

    getTasks()
  }, [])

  const fetchTasks = async() => {
    const res = await fetch(`http://localhost:5000/tasks`)

    const data = await res.json()
    return data
  }

const onAddTask = async (task) => {

  const res = await fetch(`http://localhost:5000/tasks`, 
  {
    method: 'POST',
    headers:
    {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })

  const updatedData = await res.json()

  console.log("updated Data-", updatedData)
  setTasks([...tasks,updatedData])


  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
}

const onDelete =  async (id) => {

  const res = await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: 'DELETE',
  })

  res.status===200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error Deleting this task')
}

const fetchTask =  async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}
 
const toggleReminder = async (id) => {

  const toggleReminderTask = await fetchTask(id)
  const updatedTask = {...toggleReminderTask, reminder: !toggleReminderTask.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task
  ))
}

const toggleAddTask = () => {
  setShowAddTask(!showAddTask)
}

  return (
    <div className="container">
      <Header title="Task Tracker" onShowAddTask = {toggleAddTask} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={onAddTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} delete={onDelete} toggle={toggleReminder}/> : 'No tasks to show'}
    </div>
  );
}

export default App;
