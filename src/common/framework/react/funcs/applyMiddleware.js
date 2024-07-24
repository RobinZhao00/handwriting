import { memo, useMemo, useState } from 'react'
import { compose } from './compose'

export const applyMiddleware = (...middlewares) => createStore => (...args) => {
  const store = createStore(...args)
  let dispatch = () => {
    throw new Error(
      'Dispatching while constructing your middleware is not allowed. ' +
      'Other middleware would not be applied to this dispatch.',
    )
  }
  const middlewareAPI = {
    getState: store.getState,
    dispatch: () => dispatch(),
  }

  const chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)
  return {
    ...store,
    dispatch,
  }
}

const log = store => next => action => {
  console.log('dispatch', action.type)
  const result = next(action)
  console.log('newState', store.getState())
  return result
}

const err = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.log('redux抛出异常')
    throw err
  }
}
