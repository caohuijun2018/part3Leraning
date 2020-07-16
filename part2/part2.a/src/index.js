import React from 'react'
import ReactDOM from 'react-dom'
const Course = ({ course }) => {
 //let total = 0;
 const reducer = (accumulator, currentValue) => accumulator + currentValue;
 const total = course.parts.map(note => note.exercises).reduce(reducer)
  return (
    <div>
      <h1> {course.name}</h1>
      <ul>
        {course.parts.map(note =>
          <p key={note.id}> {note.name} {note.exercises}</p>
        )}
         {/* {course.parts.forEach(note => { total += note.exercises }  */}
        
        <p> total of {total} exercises</p>
      </ul>
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return <Course course={course} />

}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
