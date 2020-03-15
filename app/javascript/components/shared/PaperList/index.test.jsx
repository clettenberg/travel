import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PaperList from '.'
import ThingToList from '../../../models/ThingToList'

describe('PaperList', () => {
  describe('when provided with things to list', () => {
    it('should render', () => {
      const thingsToList = [
        { title: 'title 1', url: '/url/1', id: 1 },
        { title: 'title 2', url: '/url/2', id: 2 },
        { title: 'title 3', url: '/url/3', id: 3 }
      ].map(({ title, url, id }) => new ThingToList(url, title, id))

      const wrapper = shallow(
        <PaperList
          title='Testing'
          actionButtonUrl='/test/it'
          thingsToList={thingsToList}
        />
      )
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })
})
