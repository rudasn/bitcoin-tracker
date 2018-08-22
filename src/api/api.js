import 'whatwg-fetch'

/**
 * Creates an object to interact with the api.
 *
 * @param {object} options
 * @param {string} options.host The API's host URL.
 * @returns {object} An `API` object.
 */
export default ({ host='', }={}) => {
  return {
    get(path='') {
      return fetch(`${ host }${ path }`, {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }).then(
        // Accept JSON and non-JSON responses
        response => response.json().then(
          null, _ => response.clone().text()
        )
      ).then(null, error => {
        throw error
      })
    },
  }
}
