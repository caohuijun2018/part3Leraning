import React,{useState} from 'react'
import ReactDOM from 'react-dom'

/*const Hello = ({name, age }) => {
  
  
  const bornYear = () =>  new Date().getFullYear() - age
  

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
     
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
*/

/*const Display= ({counter}) => <div>{counter} </div>
   

const Button = ({handleClick,text}) =>{
  return(
    <button onClick = {handleClick}>
        {text}
    </button>
  )
}


const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)


 
  return (
    <div>
      <Display counter = {counter} />
      <Button   handleClick = {increaseByOne}
      text = 'push'
      />
      <Button handleClick = {decreaseByOne}
      text = 'minus'
      />
      <Button handleClick ={setToZero}
      text = 'zero'
      />
    </div>
 

  )
}


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
*/


const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)