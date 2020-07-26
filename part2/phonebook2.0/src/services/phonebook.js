import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data )
    
}


const deleteId = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
   // return request.then(response => response.data)
}
const update = (id,newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
}

export default {
    getAll: getAll,
    create: create,
    deleteId: deleteId,
    update: update
    //update: update 
}
