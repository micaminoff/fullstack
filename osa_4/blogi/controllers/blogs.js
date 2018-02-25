const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  let likeNum = 0
  if (blog.likes) {
    likeNum = blog.likes
  }
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: likeNum
  }
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!request.body.title && !request.body.url) {
    return response.status(400).send()
  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter