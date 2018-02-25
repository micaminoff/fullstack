const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const init1 = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}

const init2 = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
}

const initialBlogs = [init1, init2]

beforeAll(async () => {
    await Blog.remove({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

const blog1 = {
    title: 'TestBlogi',
    author: 'Er W. Ditra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}

const blog2 = {
    title: "ReactPatterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    __v: 0
}

const blog3 = {}

test('blogs are returned', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs are posted', async () => {
    const blogToPost = blog1
    await api
        .post('/api/blogs')
        .send(blogToPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('TestBlogi')
})

test('blogs without like attribute are initialized to 0', async () => {
    const blogToPost = blog2
    await api
        .post('/api/blogs')
        .send(blogToPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
    const contents = response.body.map(r => r.likes)
    expect(contents).toContain(0)
})

test('blogs without title and url get rejected', async () => {
    const blogToPost = blog3
    await api
        .post('/api/blogs')
        .send(blogToPost)
        .expect(400)
})


afterAll(() => {
    server.close()
})