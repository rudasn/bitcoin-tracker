import 'whatwg-fetch'

export default ({ host, port }) => {
  return {
    version: '0.0.1',
    get(path) {
      return fetch(`${ host }/${ path }`).then(
        response => response.json()
      ).then(null, error => {
        throw error
      })
    },
    post(path, data) {
      throw new Error(`Not Implemented`)
    }
  }
}
