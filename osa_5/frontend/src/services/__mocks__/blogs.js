let token = null
const blogs = [
  {
    "_id": "abc123",
    "title": "test",
    "author": "testimies",
    "url": "abc.123",
    "likes": 500000,
    "user": {"_id": "tosikätsy", "username": "Matti Memeläinen", "name": "Petteri"}
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }