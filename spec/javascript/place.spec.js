import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Place from '../../app/javascript/components/Place';

configure({ adapter: new Adapter() });

describe('<Place />', () => {
  it('displays name', () => {
    const wrapper = shallow(<Place
      id={123}
    />);

    const nameDiv = wrapper.find('#name');
    expect(nameDiv).toHaveLength(1);
  });
});
