import React from 'react'
import ReactDOM from 'react-dom'

/*const Hello = () => {
  return (
    <div>
      <p>Hello world</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))*/
const Hello = (props) =>{
  return (
    <div>
      <h2>say hello to {props.name},your age is {props.age}</h2>
      
      </div>
  )
}
const App = () => {
  const  name = "peter";
  const age = 12;

  return(
    <>
      <h1>Greetings</h1>
      <Hello  name = "huijun"  age = {10+12}/>
      <Hello  name = {name}    age = {age}/>
      </>
      
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
