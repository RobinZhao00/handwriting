import { combineReducers } from './combineReducers'

const createStore = (reducer, preloadedState, enhancer) => {
  let state = preloadedState
  let currentListeners = []

  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState)
  }
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    currentListeners.forEach(event => event())
    return action
  }
  const subscribe = (listener) => {
    currentListeners.push(listener)
    return {
      unsubscribe: () => {
        currentListeners = currentListeners.filter(item => item !== listener)
      },
    }
  }
  return {
    getState,
    dispatch,
    subscribe,
  }
}

const testReducer = (state = {}, action) => {
  const actions = {
    TEST: () => {
      return { ...state, mark: 'test' }
    },
    DEFAULT: () => state,
  }
  return actions[action.type]
    ? actions[action.type]()
    : actions.DEFAULT()
}

const helloReducer = (state = {}, action) => {
  const actions = {
    HELLO: () => {
      return { ...state, mark: 'hello' }
    },
    DEFAULT: () => state,
  }
  return actions[action.type]
    ? actions[action.type]()
    : actions.DEFAULT()
}

// const store = createStore(testReducer)
const store = createStore(combineReducers({ testReducer, helloReducer }))
store.dispatch({ type: 'TEST' })
store.dispatch({ type: 'HELLO' })
const state = store.getState();
console.log('**test**', 'state', state);
store.subscribe(() => console.log('hahaha'));
store.dispatch({ type: 'TEST' })
