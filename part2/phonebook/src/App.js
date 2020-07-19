import React, { useState } from 'react'
//import logo from './logo.svg';
import './App.css';


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      id: 1,
      phone: 15612345678
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const add = (event) => {
    event.preventDefault()
    const Object = {
      name: newName,
      id: persons.length + 1,
      phone: newPhone
    }
    //console.log(Objext.content)
    setPersons(persons.concat(Object))
    setNewName('')
    setNewPhone('')
  }
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  persons.forEach(props => {
    console.log(props.name)
    if (props.name === newName) {
      window.alert(`${newName} is already added to phonebook`)

    }

  }
  )
  /*let isinclude = persons.includes(newName)
  console.log(isinclude)
  if (isinclude === true ) window.alert(`${newName} is already added to phonebook`)*/

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={add}>
        <div>
          name:
          <input value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          phone:
          <input value={newPhone}
            onChange={handlePhoneChange} />
        </div>

        <h2>Numbers</h2>


        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <form>
     
        {persons && persons.map(note =>
          <li key={note.id}>   {note.name} {note.phone}</li>
        )}
        {/* {persons && persons.map(note =>
          <li key={note.id}> {note.phone} </li>
        )} */}
        
      </form>
    </div>
  )
}

export default App
