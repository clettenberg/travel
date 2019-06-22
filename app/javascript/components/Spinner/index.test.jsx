import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Spinner from './index'

describe('Spinner', () => {
  it('should render', () => {
    const wrapper = shallow(<Spinner />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
