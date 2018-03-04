import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'mluukkai',
      likes: 5000,
    }
    const onClick = () => (5)

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    const simpleDiv = blogComponent.find('.basic')
    const involvedDiv = blogComponent.find('.involved')

    expect(simpleDiv.text()).toContain(blog.title)
    expect(simpleDiv.text()).toContain(blog.author)
    expect(involvedDiv.text()).toContain(blog.likes)
  })
})