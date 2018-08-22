import env from 'config/env'

import Chart from './Chart'
import ChartTest from './ChartTest'

export default (env.NODE_ENV === 'test') ? ChartTest : Chart
