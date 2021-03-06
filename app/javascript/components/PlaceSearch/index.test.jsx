import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import PlaceSearch from './index'

describe('PlaceSearch Component', () => {
  describe('Place Name', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<PlaceSearch handlePlaceSelection={jest.fn()} />)

      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
})
