import env from 'config/env'

export default () =>
  env.NODE_ENV === 'test' ?
    new Date('2018-01-01T00:00:00Z') :
    new Date()
