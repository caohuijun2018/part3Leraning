import React from 'react'
import ReactDOM from 'react-dom'
const Courses = ({ courses }) => {
 
 const reducer = (accumulator, currentValue) => accumulator + currentValue;
 const total1 = courses[0].parts.map(note => note.exercises).reduce(reducer)
 const total2 = courses[1].parts.map(note => note.exercises).reduce(reducer)
  return (
    <div>
      <h1> {courses[0].name}</h1>
      <ul>
        {courses[0].parts.map(note =>
          <p key = {note.id}>{note.name} {note.exercises}</p>
          )}
          <p>total of {total1} exercises</p>
      </ul>
      <h1> {courses[1].name}</h1>
      <ul>
        {courses[1].parts.map(note =>
          <p key = {note.id}>{note.name} {note.exercises}</p>
          )}
          <p>total of {total2} exercises</p>
      </ul>
      {/* <ul> */}
        
        {/* {course.parts.map(note => */}
          {/* <p key={note.id}> {note.name} {note.exercises}</p> */}
        {/* )} */}
         {/* {course.parts.forEach(note => { total += note.exercises }  */}
        
        {/* <p> total of {total} exercises</p> */}
      {/* </ul> */}
    </div>
  )
}
//const App = () => {
  /*const course = {
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
  }*/
  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
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
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
  return <Courses courses={courses} />

}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
