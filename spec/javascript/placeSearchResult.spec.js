import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceSearchResult from '../../app/javascript/components/PlaceSearchResult';

configure({ adapter: new Adapter() });

describe('<PlaceSearchResult />', () => {
  it('displays address', () => {
    const wrapper = shallow(<PlaceSearchResult
      address="1234 Oak Street"
    />);

    const placeDiv = wrapper.find('#place');
    expect(placeDiv).toHaveLength(1);
    expect(placeDiv).toHaveText('1234 Oak Street');
  });
});
