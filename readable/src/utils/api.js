const api = "http://localhost:3001"
let token = localStorage.token
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export function getInitialData () {
    return Promise.all([
      getCategories(),
      getPosts(),
  ``  ]).then(([categories, posts]) => ({
      categories,
      posts,
    }))
  }

const getCategories = async () => {
    const response = await fetch( `${api}/categories`, {
        method: 'GET',
        headers
    })
    const categories = response.json()
    return categories
}

const getPosts = async () => {
    const response = await fetch(`${api}/posts`, {
        method: 'GET',
        headers
    })
    const posts = response.json()
    return posts
}

export const addPostToServer = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())
    .then(data => data)

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return d.toLocaleDateString() + ' | '+ time.substr(0, 5) + time.slice(-2) 
}

export function generateId () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const changeVoteToServer = (vote, id) => {
  console.log(vote, id)
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({option: vote})
  }).then((res) => res.json())
} 

export const deletePostToServer = id => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then((res) => res.json())
}

export const modifyPostToServer = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  }).then((res) => res.json())
}

export const getComments = id => {
  console.log("CALLING SERVER", id)
    return fetch(`${api}/posts/${id}/comments`, {
      method: 'GET',
      headers
    })
    .then((res) => res.json())
}