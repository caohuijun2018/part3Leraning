import React from 'react'
import ReactDOM from 'react-dom'
const Part =(props)=>{
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Header = (props)=>{
  return(
    <div>
      <p>{props.course}</p>
      </div>
  )
  }
  const Content =(props) =>{
    return(
      <div>
        <Part  part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part  part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part  part={props.parts[2].name} exercises={props.parts[2].exercises} />
      </div>
    )
  }
  const Total =(props)=>{
    return(
      <div>
        <p>
          {props.total}
        </p>
      </div>
    )
  }
  
const App = (props) => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


const total = course.parts[0].exercises + course.parts[1].exercises+course.parts[2].exercises
   return (
    <div>
      <Header course = {course.name}  />
      <Content parts={course.parts} />
      <p>Number of exercises  <Total  total = {total}/> </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
