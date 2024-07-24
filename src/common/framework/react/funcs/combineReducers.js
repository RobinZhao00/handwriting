// const combineReducers = (reducers = {}) => {
//   return function(state = {}, action) {
//     return Object.entries(reducers).reduce((prevState, [key, reducer]) => {
//       return {
//         ...prevState,
//         [key]: reducer(prevState[key] || {}, action),
//       }
//     }, state)
//   }
// }


export const combineReducers = (reducers = {}) => (state = {}, action) => Object.entries(reducers)
  .reduce((prevState, [key, reducer]) => ({
    ...prevState,
    [key.replace('Reducer', 'State')]: reducer(prevState[key] || {}, action),
  }), state)
