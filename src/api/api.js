import 'whatwg-fetch'

/**
 * Creates an object to interact with the api.
 *
 * @param {object} options
 * @param {string} options.host The API's host URL.
 * @returns {object} An `API` object.
 */
export default ({ host, }) => {
  return {
    version: '0.0.1',
    get(path) {
      return fetch(`${ host }/${ path }`).then(
        response => {
          try {
            return response.json()
          } catch(e) {
            return response
          }
        }
      ).then(null, error => {
        throw error
      })
    },
    post(path, data) {
      throw new Error(`Not Implemented`)
    }
  }
}
