import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)
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
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>

  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       ></input>
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="text"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       ></input>
  //     </div>
  //     <button type="submit">login</button>
  //   </form>
  // )



  if (user === null) {
    return (
      <div>
        <h1> log in to application</h1>
        <form onSubmit={handleLogin}>

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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        <form onSubmit={handleLogout}>
          <div>
            <button type="submit">login out </button>
          </div>

        </form>
      </div>
    )
  }
  // return (
  //   <div>
  //     <h2>blogs</h2>
  //     if(user === null){}
  //     {user == null ?
  //   loginForm():
  //   <div>

  //     <p>{user.name} login in </p>
  //     {loginForm()}
  //   </div>  
  //   }

  //     {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} />
  //     )}
  //   </div>
  // )
}

export default App