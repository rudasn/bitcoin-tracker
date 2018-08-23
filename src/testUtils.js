import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import date from 'utils/date'

export const mockStore = configureMockStore([ thunk ])
export const mockApi = (response, error) => {
  const id = Date.now()
  const _mockApiGet = jest.fn()
  return {
    _mockApiGet,
    get: () => {
      _mockApiGet(error ? error : response)
      return error ? Promise.reject(error) : Promise.resolve(response)
    },
  }
}
export const mockDate = date
