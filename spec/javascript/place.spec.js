import React from 'react';
import { shallow, configure, mount } from 'enzyme';
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

  it('calls the onDelete function when the delete button is clicked', () => {
    const placeId = 1;
    const deleteFunc = jest.fn();
    const wrapper = mount(<Place
      id={1}
      onDelete={deleteFunc}
    />);

    const p = wrapper.find('.delete-place');
    expect(p).toHaveLength(1)
    p.simulate('click');
    expect(deleteFunc).toBeCalledWith(1);
  });
});
