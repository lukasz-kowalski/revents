import React from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import { Segment, Form, Button } from 'semantic-ui-react'
import { createEvent, updateEvent } from '../eventActions'

class EventForm extends React.Component {
  state = {
    event: { ...this.props.event }
  }

  onInputChange = event => {
    const newEvent = {...this.state.event}
    newEvent[event.target.name] = event.target.value
    this.setState(() => ({
      event: newEvent
    }))
  }

  onFormSubmit = event => {
    event.preventDefault()
    const evt = this.state.event
    if (evt.id) {
      this.props.updateEvent(evt)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...evt,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  render() {
    const { event } = this.state
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input onChange={this.onInputChange} value={event.title} name="title" placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input onChange={this.onInputChange} type="date" name="date" value={event.date} placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input onChange={this.onInputChange} name="city" value={event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input onChange={this.onInputChange} name="venue" value={event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input onChange={this.onInputChange} name="hostedBy" value={event.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">Submit</Button>
          <Button type="button" onClick={this.props.history.goBack}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return { event }
}

const mapDispatchToProps = (dispatch, actions) => ({
  createEvent: event => dispatch(createEvent(event)),
  updateEvent: event => dispatch(updateEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
