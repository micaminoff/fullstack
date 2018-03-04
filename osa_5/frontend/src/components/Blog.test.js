import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    // haetaan klikattava osa komponentista
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'mluukkai',
      likes: 5000,
      url: 'abc.123',
      user: {name: 'mikal'}
    }

    const blogComponent = shallow(<Blog blog={blog}/>)
    const nameDiv = blogComponent.find('.blogStyle')
    nameDiv.at(0).simulate('click')

    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const contentDiv = nameDiv.find('.expandable')

    expect(contentDiv.getElement().props.style).toEqual({display: 'none'})
  })
})