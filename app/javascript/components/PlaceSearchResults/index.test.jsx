import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import PlaceSearchResults from './index'

describe('PlaceSearchResults', () => {
  it('should render correctly', () => {
    const results = [
      {
        place_id: 'foo', description: 'bar', osm_type: 'way', osm_id: '123456'
      },
      {
        place_id: 'another', description: 'fake-place', osm_type: 'way', osm_id: '123456'
      }
    ]

    const wrapper = shallow(
      <PlaceSearchResults
        results={results}
        selectedId='1234'
        onPlaceSelection={() => {}}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
