
import React from 'react'
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



   export default Courses
