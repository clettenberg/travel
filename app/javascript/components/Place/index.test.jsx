
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Place from './index'

describe('Place', () => {
  it('should render', () => {
    const wrapper = shallow(<Place />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
