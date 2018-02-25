const listHelper = require('../utils/list_helper')

const blog1 = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}

const blog2 = {
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
}


test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [blog1]

  const listWithTwoBlogs = [blog1, blog2]

  test('of one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of two blogs', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(12)
  })
  test('of empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })


})

describe('favorite blog', () => {
  const listWithOneBlog = [blog1]

  const listWithTwoBlogs = [blog1, blog2]

  test('of one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blog1)
  })
  test('of two blogs', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual(blog2)
  })
  test('of empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})