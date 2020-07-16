import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
/*const Display = (props) => {
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
*/
/*const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)*/
const Precent = (props) => {
  if (props.total === 0) {
    return 0
  }
  let precent = Math.round(props.good / props.total * 100) + '%'

  return (precent)
}
const Average = (props) => {
  if (props.total === 0) return 0
  let average = (props.good - props.bad) / props.total

  return (
    average
  )
}
const Statistics = (props) => {
  if (props.total === 0) return (
    <div>
      <p>No feedback given</p>
    </div>)
  return (
    <p>
      {/* {props.text}    */}
      {props.value}

      {/* good  <Display counter={props.good} /> */}
      {/* neutral <Display counter={props.neutral} /> */}
      {/* bad <Display counter={props.bad} /> */}
      {/* all <Display counter={props.total} /> */}
      {/* average */}
      {/* <p> <Average  good={props.good} bad={props.bad} total={props.total} /></p> */}
      {/* positive */}
      {/* <p><Precent good={props.good} total={props.total} /></p> */}
    </p>
  )

}
/*const CreatTablr = (props) => {
  let tableData = '<tr>'


}*/
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
      <Statistics total={total} />
      {total !== 0 &&
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td> <Statistics text={'good'} value={good} /></td>
            </tr>
            
            <tr>
              <td>neutral</td>
              <td><Statistics text ={'neutral'} value={neutral}/></td>
            </tr>
            <tr>
              <td>bad</td>
              <td><Statistics text={'bad'} value={bad} /></td>
            </tr>
            <tr>
              <td>all</td>
              <td> <tr><Statistics text={'all'} value={total} /></tr></td>
            </tr>
            <tr>
              <td> average</td>
              <td><Statistics text={'average'} value={<Average good={good} bad={bad} total={total} />} /></td>
            </tr>
            <tr>
              <td>precent</td>
              <td><Statistics text={'precent'} value={<Precent good={good} total={total} />} /></td>
            </tr>
          </tbody>
        </table>}
      {/* <Statistics   total = {total} good = {good} neutral = {neutral} bad = {bad} /> */}
    </div>
  )
}

