import { fetch } from 'whatwg-fetch';

class MapquestSearchClient {
  static findPlacesByName(name) {
    return fetch(`/search?q=${name}`)
      .then(results => results.json());
  }

  static findPlaceByLatLon({ lat, lon }) {
    return fetch(`/reverse?lat=${lat}&lon=${lon}`)
      .then(results => results.json())
      .then((results) => {
        if (results.errors) {
          const el = document.createElement('html');
          el.innerHTML = results.errors;
          const pTags = el.getElementsByTagName('p');
          const messages = Array.from(pTags).map(p => p.innerHTML);

          return Promise.reject(new Error(messages));
        }

        return Promise.resolve(results);
      });
  }
}


export default MapquestSearchClient;
