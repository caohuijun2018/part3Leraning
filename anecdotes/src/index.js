import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const Display = (props) => {
  if (props.counter === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  } else {
    return (
      <div>
        {props.counter}
      </div>
    )
  }
}

/*const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)*/
const Precent = (props) => {
  let precent = Math.round(props.good / props.total * 100) + '%'
  if (precent === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (precent)
}
const Average = (props) => {
  let average = (props.good - props.bad) / props.total
  
  return (
    average
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <p>
      good  <Display counter={good} />
      neutral <Display counter={neutral} />
      bad <Display counter={bad} />
      all <Display counter={total} />
      average
      <p> <Average  good={good} bad={bad} total={total} /></p>
      positive
       <p><Precent good={good} total={total} /></p>
      </p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)