const api = "http://localhost:3001"
const headers = { 'Authorization': 'whatever-you-want' }

export function getInitialData () {
    return Promise.all([
      getCategories(),
      getPosts(),
    ]).then(([categories, posts]) => ({
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

