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


// export async function addPostToServer(post) {
//   const response = await fetch( `${api}/posts`, {
//       method: 'POST', 
//       headers,
//      // Body data type must match "Content-Type" header        
//       body: JSON.stringify({post}),
//     })
//       try {
//           const post = await response.json();
//           return post
//       }catch(error) {
//       console.log("Error posting a new post on server", error);
//       }
// }

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

