import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  } else {
    return (
      <div>
        button press history:{props.allClicks.join(' ')}
      </div>
    )
  }
}
/*const Button = (props) => {
  return(
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  )
}*/


const Button = ({onClick,text}) => {
  return(
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRigt] = useState(0)
  const [allClicks, setAll] = useState([])
  

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRigt(right + 1)
  }



  return (
    <div>
      <div>
        {left}
        <Button onClick = {handleLeftClick} text = 'left'/>
        <Button onClick = {handleRightClick} text = 'right'/>
        
        {right}
      
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))