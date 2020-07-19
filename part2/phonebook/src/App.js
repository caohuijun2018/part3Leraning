import React, { useState } from 'react'
//import logo from './logo.svg';
import './App.css';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, phone: '1561234567' },
    { name: 'Ada Lovelace', id: 2, phone: '39-44-5323523' },
    { name: 'Dan Abramov', id: 3, phone: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 4, phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFNewilterName] = useState('')
  const add = (event) => {
    event.preventDefault()
    const Object = {
      name: newName,
      id: persons.length + 1,
      phone: newPhone
    }
    let flag = 0;
    persons.forEach(props => {
      if (props.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        flag = 1;
      }
    })
    if (flag === 0) {
      setPersons(persons.concat(Object))
      setNewName('')
      setNewPhone('')
    }
    setFNewilterName(filterName.concat(filterName))

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterName = (event) => {
    setFNewilterName(event.target.value)
  }
  return (
    <div>
      <div>
        <h2>phonebook</h2>
        <div>
          filter shown with
          <input value={filterName}
            onChange={handleFilterName}
          />
        </div>
      </div>
      <h2>Add a new </h2>
     < form onSubmit={add}>
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
    <div>
      <button type="submit">add</button>
    </div>
  </form>
      {/* <Peopleadd add={add} newName={newName} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} /> */}
      <form>
        <h2>Numbers</h2>
        {persons && persons.filter(note => note.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1).map(note =>
          <p key={note.id}>  {note.name} {note.phone}</p>
        )}
      </form>
    </div>

  )
}

export default App
