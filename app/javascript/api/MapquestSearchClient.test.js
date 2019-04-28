import { fetch } from 'whatwg-fetch'
import MapquestSearchClient from './MapquestSearchClient'
jest.mock('whatwg-fetch')

const mockResponse = (status, statusText, response) => (
  new Response(response, { // eslint-disable-line no-undef
    status,
    statusText,
    headers: {
      'Content-type': 'application/json'
    }
  })
)

describe('MapquestSearchClient', () => {
  let results

  describe('#searchByName', () => {
    beforeEach(() => {
      results = [{
        foo: 'bar'
      }]

      fetch.mockImplementation(() => {
        const response = mockResponse(200, 'successful', JSON.stringify(results))

        return Promise.resolve(response)
      })
    })

    it('should return search results', () => {
      expect.assertions(1)

      return MapquestSearchClient.findPlacesByName('Paris').then((response) => {
        expect(response).toEqual(results)
      })
    })
  })

  describe('#findPlaceByLatLon', () => {
    beforeEach(() => {
      results = {
        foo: 'bar'
      }

      fetch.mockImplementation(() => {
        const response = mockResponse(200, 'successful', JSON.stringify(results))

        return Promise.resolve(response)
      })
    })

    it('should return results', () => {
      expect.assertions(1)

      return MapquestSearchClient.findPlaceByLatLon({
        lat: '48.858093,',
        lon: '2.294694'
      }).then((response) => {
        expect(response).toEqual(results)
      })
    })

    describe('when there are errors', () => {
      beforeEach(() => {
        results = {
          errors: '<html><body><h1>Bad Request</h1><p>Did not work!</p></body></html >'
        }
      })

      it('should return errors', () => {
        expect.assertions(1)

        return MapquestSearchClient.findPlaceByLatLon({
          lat: 'cool',
          lon: 'sweet'
        }).catch((response) => {
          expect(response.message).toEqual('Did not work!')
        })
      })
    })
  })
})
