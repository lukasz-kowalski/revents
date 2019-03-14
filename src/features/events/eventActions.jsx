import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventsConstants'
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi'

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: {
    event
  }
})

export const startCreatingEvent = event => {
  return async dispatch => {
    try {
      dispatch(createEvent(event))
      toastr.success('Success!', 'Event has been created')
    } catch (error) {
      toastr.error('Oops', 'Something went wrong')
    }
  }
}

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: {
    event
  }
})

export const startUpdateEvent = event => {
  return async dispatch => {
    try {
      dispatch(updateEvent(event))
      toastr.success('Success!', 'Event has been updated')
    } catch (error) {
      toastr.error('Oops', 'Something went wrong')
    }
  }
}

export const deleteEvent = eventId => ({
  type: DELETE_EVENT,
  payload: {
    eventId
  }
})

export const fetchEvents = events => ({
  type: FETCH_EVENTS,
  payload: events
})

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart())
      let events = await fetchSampleData()
      dispatch(fetchEvents(events))
      dispatch(asyncActionFinish())
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError())
    }
  }
}
