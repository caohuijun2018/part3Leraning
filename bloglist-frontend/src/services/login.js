import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'


let token = null

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const setToken = newToken => {
    token = `bearer ${newToken}`
}
const deleteToken = newToken => {
    token = null
}


export default {
    login,
    setToken,
    deleteToken
}