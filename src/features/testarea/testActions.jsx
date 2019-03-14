import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISH } from './testConstants'

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  }
}

export const startCounterAction = () => ({
  type: COUNTER_ACTION_STARTED
})

export const finishCounterAction = () => ({
  type: COUNTER_ACTION_FINISH
})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const incrementAsync = () => async dispatch => {
  dispatch(startCounterAction())
  await delay(1000)
  dispatch(incrementCounter())
  dispatch(finishCounterAction())
}

export const decrementAsync = () => async dispatch => {
  dispatch(startCounterAction())
  await delay(1000)
  dispatch(decrementCounter())
  dispatch(finishCounterAction())
}
