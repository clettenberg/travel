import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PlaceSearch from '../../app/javascript/components/PlaceSearch';

describe('PlaceSearch Component', () => {
  describe('Place Name', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<PlaceSearch onPlaceSelection={jest.fn()} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Lat/Lon', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<PlaceSearch onPlaceSelection={jest.fn()} />);
      wrapper.find('button#latlon').simulate('click');

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
