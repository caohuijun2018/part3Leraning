import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSuccessMessage] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const [newtitle, setTitle] = useState('')
  const [newauthor, setAuthor] = useState('')
  const [newurl, setUrl] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedLoginJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedLoginJSON) {
      const user = JSON.parse(loggedLoginJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      loginService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`${username} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      },6000)
      setUsername('')
      setPassword('')
     
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }
  const handleLogout = async (event) => {

    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    loginService.deleteToken(user.token)
  }
  const addBlogs =  (event) => {
    event.preventDefault()
    const blog = {
      title: newtitle,
      author: newauthor,
      url: newurl,
      id: Math.floor(Math.random() * 100000000000)
    }
  console.log(blog)
   blogService.setToken(user.token)
  blogService
   .create(blog)
   .then(returneBlog => {
     setBlogs(blogs.concat(blog))
     setSuccessMessage(` a new blog${newtitle}! by ${newauthor} added`)
    setTimeout( () => {
      setSuccessMessage(null)
    },5000)
    setTitle('')
    setUrl('')
    setAuthor('')
   })



    // setBlogs(blog)
    // setSuccessMessage(` a new blog${newtitle}! by ${newauthor} added`)
    // setTimeout( () => {
    //   setSuccessMessage(null)
    // },5000)
    // setTitle('')
    // setUrl('')
    // setAuthor('')
  }
  const NotificationError = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  const NOtificationSuccess = ({message}) => {
    if(message === null){
      return null
    }
    return (
      <div className = "success">
        {message}
      </div>
    )
  }
 



  if (user === null) {
    return (
      <div>
        <h1> log in to application</h1>
        <form onSubmit={handleLogin}>
        <NotificationError message = {error}/>
          <div>
            username
    <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div>
            password
    <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">login</button>

        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <NOtificationSuccess message = {success}/>
        <p>{`${username} is login in`}</p>


        <form onSubmit={handleLogout}>
          <div>
            <button type="submit">login out </button>
          </div>

        </form>
        <h2>create new</h2>
        <form onSubmit={addBlogs}>
          <div>
            title:
            <input
              type='text'
              value={newtitle}
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </div>
          <div>
            author:
            <input
              type="text"
              value={newauthor}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </div>
          <div>
            url:
            <input
              type="text"
              value={newurl}
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </div>
          <button type="onsubmit">create</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          
        </form>
      </div>
    )
  }

}

export default App