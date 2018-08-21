import React from 'react'

import APIConsumerCreator from './components/Consumer'
import APIProviderCreator from './components/Provider'
import createApi from './api'

const { Provider, Consumer } = React.createContext(null)

export const withAPI = APIConsumerCreator({ Consumer })
export const APIProvider = APIProviderCreator({ createApi, Provider })


