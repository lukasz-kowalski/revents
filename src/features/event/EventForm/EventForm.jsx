import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

export default class EventForm extends React.Component {
  state = {
    event: emptyEvent
  }

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState(() => ({
        event: this.props.selectedEvent
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedEvent !== nextProps.selectedEvent) {
      this.setState(() => ({
        event: nextProps.selectedEvent || emptyEvent
      }))
    }
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
    this.state.event.id ? this.props.updateEvent(this.state.event) : this.props.createEvent(this.state.event)
  }

  render() {
    const { handleCancel } = this.props
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
          <Button type="button" onClick={handleCancel}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}
