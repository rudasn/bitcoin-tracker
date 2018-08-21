import env from 'config/env'

export const formatDate = date => {

  return [date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()].join('-')
}

export default () =>
  env.NODE_ENV === 'test' ?
    new Date('2018-01-01T00:00:00Z') :
    new Date()
