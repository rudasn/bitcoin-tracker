import createApi from './api'

beforeEach(() => {
  fetch.resetMocks()
})

it('should return an api with get method', () => {
  const api = createApi()
  expect(api).toHaveProperty('get')
})

it('should return with a valid JSON response', done => {
  const api = createApi({ host: 'http://example.com' })
  const response = {
    hello: 'world',
  }

  fetch.once(JSON.stringify(response))

  api.get('/pathname').then(res => {
    expect(res).toEqual(response)
    done()
  })

  expect(fetch.mock.calls.length).toEqual(1)
  expect(fetch.mock.calls[0][0]).toEqual('http://example.com/pathname')
})

it('should handle non-JSON responses', done => {
  const api = createApi({ host: 'http://example.com' })
  const response = "Hello, World!"

  fetch.once(response)

  api.get('/pathname').then(res => {
    expect(res).toEqual(response)
    done()
  })

  expect(fetch.mock.calls.length).toEqual(1)
  expect(fetch.mock.calls[0][0]).toEqual('http://example.com/pathname')
})

it('should throw on error', done => {
  const api = createApi({ host: 'http://example.com' })
  const response = new Error('Something went wrong')

  fetch.mockReject(response)

  api.get('/pathname').then(null, error => {
    expect(error).toEqual(response)
    done()
  })

  expect(fetch.mock.calls.length).toEqual(1)
  expect(fetch.mock.calls[0][0]).toEqual('http://example.com/pathname')
})
