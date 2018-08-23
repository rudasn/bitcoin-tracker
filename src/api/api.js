import 'whatwg-fetch'

const cleanPath = (host, path) =>
  host.charAt(host.length - 1) !== '/' &&
  path.charAt(0) !== '/' ?
    (host + '/' + path) :
    host + path


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
      return fetch(cleanPath(host, path), {
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
