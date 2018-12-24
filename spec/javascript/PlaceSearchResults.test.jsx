import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PlaceSearchResults from '../../app/javascript/components/PlaceSearchResults';

describe('PlaceSearchResults', () => {
  it('should render correctly', () => {
    const results = [
      { place_id: 'foo', description: 'bar' },
      { place_id: 'another', description: 'fake-place' },
    ];

    const wrapper = shallow(<PlaceSearchResults
      results={results}
      selectedId="1234"
      onPlaceSelection={() => {}}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
