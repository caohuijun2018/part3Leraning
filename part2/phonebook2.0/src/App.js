import React, { useState, useEffect } from 'react'
//import logo from './logo.svg';
import './App.css';
//import _ from 'lodash'
//import axios from 'axios'
import phoneService from './services/phonebook'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFNewilterName] = useState('')
  useEffect(() => {

    phoneService
      .getAll()
      .then(phoneIn => {
        setPersons(phoneIn)
      })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
  }, [])



  const add = (event) => {
    event.preventDefault()
    const Object = {
      name: newName,
      id: persons.length + 1,
      number: newPhone
    }
    let flag = 0;
    persons.forEach(props => {
      if (props.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        flag = 1;
      }
    })
    if (flag === 0) {
      phoneService
        .create()
        .then(inputNewPhone => {
          setPersons(persons.concat(inputNewPhone))
          setNewName('')
          setNewPhone('')
        })
      setPersons(persons.concat(Object))
      setNewName('')
      setNewPhone('')
      setFNewilterName('')
      // axios
      //   .post('http://localhost:3001/persons',Object)
      //   .then(response => {
      //     console.log(Object)
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewPhone('')
      //   })


      //persons.debounce(setPersons,3000)
      // setPersons(persons.concat(Object))
      // setNewName('')
      // setNewPhone('')
    }
    phoneService
      .getAll()
      .then(inputFilerPhone => {
        setFNewilterName(filterName.concat(inputFilerPhone))
      })
      
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log(persons.data)
    //     setFNewilterName(filterName.concat(filterName))

    //   })


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

        <h2>Numbers</h2>

        {persons && persons.filter(note => note.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1).map(note => <p key={note.id}>  {note.name} {note.number}</p>)}


      </form>
    </div>

  )
}

export default App
