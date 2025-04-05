import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'Bearer ' + newToken;
}

const getAll = async () => {
  console.log(token, "tken-----------------------------")
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.get(baseUrl, config);
  return response.data
}

const create = async (blogData) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogData, config);
  console.log(response, "----------------------------")
  return response.data
}

const modify = async (blogData) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}`, blogData, config);
  console.log(response, "----------------------------")
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data
}

export default { 
  getAll,
  setToken,
  create,
  modify,
  deleteBlog
}