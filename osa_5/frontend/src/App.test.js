import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when first arriving', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('don\'t render blogs', () => {
      app.update();
      const blogs = app.find(Blog);
      expect(blogs.length).toBe(0);
    });
  })
  describe('when user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      
      app = mount(<App />)

    })

    it('blogs are rendered', () => {
      app.update()
      const blogs = app.find(Blog);
      console.log(app.html())
      expect(blogs.length).toBe(1);
    })
  })
})