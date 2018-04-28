import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlacesForm from '../../app/javascript/components/PlacesForm';
import Place from '../../app/javascript/components/Place';

configure({ adapter: new Adapter() });

describe('<PlacesForm />', () => {
  it('renders hidden fields for place ids', () => {

    const wrapper = shallow(<PlacesForm
      placeIds={[123, 456]}
    />);

    expect(wrapper.find(Place)).toHaveLength(2);
  });
});
