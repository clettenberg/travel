import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlacesForm from '../../app/javascript/components/PlacesForm';
import Place from '../../app/javascript/components/Place';

configure({ adapter: new Adapter() });

describe('<PlacesForm />', () => {
  it('renders a Place for each ID', () => {
    const placesJson = {"data":[{"id":"2","type":"place","attributes":{"placeId":"ChIJGwMcNyMziUgRIUhUCOM-oM0","note":"<div><strong>this is a note<br></strong><br></div><h1>This is an even bigger note!</h1><div><br></div>"},"relationships":{"trip":{"data":{"id":"1","type":"trip"}}}},{"id":"13","type":"place","attributes":{"placeId":"ChIJK94XLVtxj0gRPcQ-LtEJQ2I","note":null},"relationships":{"trip":{"data":{"id":"1","type":"trip"}}}},{"id":"14","type":"place","attributes":{"placeId":"ChIJGwMcNyMziUgRIUhUCOM-oM0","note":null},"relationships":{"trip":{"data":{"id":"1","type":"trip"}}}}]}
    const wrapper = shallow(<PlacesForm
      places={placesJson}
    />);

    expect(wrapper.find(Place)).toHaveLength(3);
  });
});
