import React, { useState, useEffect } from 'react'
//import logo from './logo.svg';
import './App.css';
//import _ from 'lodash'
//import axios from 'axios'
import phoneService from './services/phonebook'
//

//import axios from 'axios';
//import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const service = () => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(() => {
    service()
    // phoneService
    //   .getAll()
    //   .then(phoneIn => {
    //     setPersons(phoneIn)
    //   })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
  }, [])


  const add = (event) => {
    //event.preventDefault()
    const Object = {                       //创建一个新的object，存储输入的名字和电话
      name: newName,
      number: newPhone
    }
    if (newName === '' || newPhone === '') {
      console.log("newName和newPhone不能为空")  //当newname或者newphone为空时，退出函数
      return
    }
    let target = 0;                          //作为是否为更新内容的标志
    persons.forEach(person => {
      if (person.name === newName && person.number !== newPhone) {
        replace({ ...Object, id: person.id })    //...object 创建一个新对象，是具有Object对象属性的副本。id： 将id赋值为person的id
        target = 1;
      }
    })
    if (target === 0) {
      let flag = 0;                        //作为输入内容是否重复的标志
      persons.forEach(props => {
        if (props.name === newName && props.number === newPhone) { //当输入的内容重复时，发出提示
          window.alert(`${newName} is already added to phonebook`)
          flag = 1;
        }
      })
      if (flag === 0) { //输入内容不重复时
        phoneService
          .create(Object) 
          .then(inputNewPhone => {
            console.log(inputNewPhone)
            service()  //获取后端数据库的数据
            // phoneService
            //   .getAll()
            //   .then(persons => {
            //     setPersons(persons)
            //   })
            setNewName('')
            setNewPhone('')
          })

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
    }


    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log(persons.data)
    //     setFNewilterName(filterName.concat(filterName))

    //   })


  }
  const clickDelete = (note) => {
    console.log(note.id)
    let flag = window.confirm(`Delete ${note.name}`)
    if (flag === true) {
      phoneService
        .deleteId(note.id)
        .then(() => {
          service()
          // phoneService
          //   .getAll()
          //   .then(persons => {
          //     setPersons(persons)
          //   })
        })
      // axios
      //   .delete(`http://localhost:3001/persons/${note.id}`)
      //   .then( () => {
      //     phoneService
      //       .getAll()
      //       .then(persons => {
      //         setPersons(persons)
      //       })
      //})
    }
  }
  const replace = (note) => {
    let flag = window.confirm(`${note.name} is already added to phonebook, repalce the old number with a new one?`)
    if (flag === true) {
      phoneService
        .update(note.id, note)
        .then(() => {
          service()
        })

    }
  }



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterName = (event) => {
    setNewFilterName(event.target.value)
  }


  // const clickDelete = (persons) => {

  //   console.log(persons.name)

  //   let flag = confirm(`Delete  ${persons.name}`)
  //   if(flag === true){
  //     axios 
  //      .delelte('http://localhost:3001/persons', {data: {id : persons.id}})

  //   }
  // }

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
      <h2>Numbers</h2>

      {persons && persons.filter(note => note.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
        .map(note => <p key={note.id}>  {note.name} {note.number}<button onClick={() => clickDelete(note)} >delete</button> </p>)}

    </div>

  )
}

export default App

