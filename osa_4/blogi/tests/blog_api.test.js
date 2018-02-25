const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, format, nonExistingId, blogsInDb, blog1, blog2, blog3, usersInDb } = require('./test_helper')


describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogObjects = initialBlogs.map(b => new Blog(b))
        await Promise.all(blogObjects.map(b => b.save()))
    })

    test('blogs are returned', async () => {
        const blogsInDatabase = await blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const returnedContents = response.body.map(b => b.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.title)
        })
    })

})

describe('adding new blogs', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret', adult: true, blogs: [] })
        await user.save()
    })
    test('blogs are posted', async () => {
        const blogsAtStart = await blogsInDb()
        await api
            .post('/api/blogs')
            .send(blog1)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsAtStart.length + 1)

        const contents = blogsAfter.map(r => r.title)
        expect(contents).toContain('TestBlogi')
    })

    test('blogs without like attribute are initialized to 0', async () => {
        const blogsAtStart = await blogsInDb()
        await api
            .post('/api/blogs')
            .send(blog2)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsAtStart.length + 1)

        const contents = blogsAfter.map(r => r.likes)
        expect(contents).toContain(0)
    })

    test('blogs without title and url get rejected', async () => {
        const blogsAtStart = await blogsInDb()
        await api
            .post('/api/blogs')
            .send(blog3)
            .expect(400)
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsAtStart.length)
    })
})

describe('deleting a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: 'please remove me',
            author: 'user0',
            url: '127.168.0.0',
            likes: -5
        })
        await addedBlog.save()
    })

    test('deletion succeeds', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfter = await blogsInDb()

        const contents = blogsAfter.map(r => r.title)

        expect(contents).not.toContain(addedBlog.title)
        expect(blogsAfter.length).toBe(blogsAtStart.length - 1)
    })
})

describe('updating a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog({
            title: 'please remove me',
            author: 'user0',
            url: '127.168.0.0',
            likes: -5
        })
        await addedBlog.save()
    })

    test('updating succeeds', async () => {
        const blogsAtStart = await blogsInDb()
        addedBlog.likes = 200

        await api
            .put(`/api/blogs/${addedBlog._id}`)
            .send(addedBlog)
            .expect(200)

        const blogsAfter = await blogsInDb()

        const contents = blogsAfter.map(r => r.likes)

        expect(contents).not.toContain(-5)
        expect(contents).toContain(200)
        expect(blogsAfter.length).toBe(blogsAtStart.length)
    })
})

describe('when there is initially one user in db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret', adult: true })
        await user.save()
    })

    test('GET /api/users finds all users', async () => {
        const usersBeforeOperation = await usersInDb()

        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersBeforeOperation).toEqual(usersAfterOperation)
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            adult: false,
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
        const usernames = usersAfterOperation.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            adult: true,
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'username must be unique' })

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })
})

afterAll(() => {
    server.close()
})