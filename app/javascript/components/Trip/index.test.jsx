
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Trip from './index'

describe('Trip', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Trip trip={{
        id: 26,
        title: 'UK with Ron and Stacey',
        places: [{
          id: 286,
          name: 'The Pink House (Behind the caravan park)',
          point: [-5.21714480341615, 51.8780559],
          note: '',
          startDate: '09/20/19',
          endDate: '09/22/19'
        }, {
          id: 287,
          name: 'AirBnB in Edinburgh',
          point: [-3.1936512, 55.9499331],
          note: 'u003cdivu003eGreat flat in old Edinburghu003c/divu003e',
          startDate: '09/25/19',
          endDate: '09/28/19'
        }],
        center: [-2.6707358336225657, 53.941955750000005],
        startDate: '09/15/19',
        endDate: '09/28/19'
      }}
      />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
