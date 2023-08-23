import Task from "./Task"

const Tasks = (props) => {


  return (
    <>
      {/* {props.tasks.map((task) => (<h3 key={task.id}>{task.text}</h3>))} */}
      {props.tasks.map((task) => (
        <Task key={task.id} task={task} delete={props.delete} toggle={props.toggle} />
      ))}
    </>
  )
}

export default Tasks
