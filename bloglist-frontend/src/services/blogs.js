import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getName = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get('http://localhost:3003/api/blogs')
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
console.log("config:",config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


export default { getAll,create ,setToken,getName}