import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
/*const Number = (props) =>{
  return (
    <div>
      props.counter = {Math.random() *5}
    </div>
  )
}*/
/*const Most = (props) => {
  return (
    <div>
      {props.maxNumber}
    </div>
  )
}*/
const App = (props) => {
  const [selected, setSelected] = useState(0)

  let number = Math.floor(Math.random() * 6)
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })


  const vote = () => {
    const copy = { ...points }
    copy[number] += 1
    setPoints(copy)

  }
  const increaseByOne = () => setSelected(number)
  let maxNumber = Math.max.apply(null,Object.values(points))
  const maxKey = Object.keys(points).find(key => points[key] === maxNumber)
  console.log(Object.values(points))
  return (
    <div>
      <h1> Anecdote of the day</h1>
      <Button handleClick={increaseByOne} text='next anecdotes' />
      <Button handleClick={vote} text='vote' />
      {props.anecdotes[selected]}
      {<p> has {points[number]} votes</p>}
      <h1>Anecdote with the most</h1>
      {/* <Most maxNumber={maxNumber} /> */}
      {props.anecdotes[maxKey]}
      <p> has {points[maxKey]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)