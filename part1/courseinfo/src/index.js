import React from 'react'
import ReactDOM from 'react-dom'
const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>{
      props.parts.map(part => <Part part={part.name} exercises={part.exercises} />)
    }
    </div>
  )
}
const Total = (props) => {
  return (
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

  let total = 0;
  course.parts.forEach(part => {
    total += part.exercises
});
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p>Number of exercises  <Total total={total} /> </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
