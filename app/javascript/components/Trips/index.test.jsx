
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Trips from './index'

describe('Trips', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Trips trips={
        [{
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
        },
        {
          id: 25,
          title: 'Europe 2019',
          places: [{
            id: 281,
            name: 'Lunch at Buenasmigas',
            point: [2.1773041, 41.3838014],
            note: 'u003cdivu003eLunch near the la sagrada familiau003c/divu003e',
            startDate: '09/01/19',
            endDate: '09/01/19'
          }, {
            id: 282,
            name: 'Sagrada Família ',
            point: [2.17439826359357, 41.4034719],
            note: 'u003cdivu003eTour of the cathedral. Went up in the tower.u0026nbsp;u003c/divu003e',
            startDate: '09/01/19',
            endDate: '09/01/19'
          }],
          center: [11.00602877486278, 41.65760095],
          startDate: '09/01/19',
          endDate: '09/15/19'
        }]
      }
      />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
