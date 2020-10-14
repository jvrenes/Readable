const api = "http://localhost:3001"
const headers = { 'Authorization': 'whatever-you-want' }

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
    const categories = response.json()
    return categories
}

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return d.toLocaleDateString() + ' | '+ time.substr(0, 5) + time.slice(-2) 
}

export function generateId () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}