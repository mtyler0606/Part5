import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token},
  }
  //console.log(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  try{
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
  }
  catch(error){
    console.log(error.message)
  }
}

export default { getAll, create, setToken, updateBlog, deleteBlog }