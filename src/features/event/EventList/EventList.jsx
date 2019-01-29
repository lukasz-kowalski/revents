import React from 'react'
import EventListItem from './EventListItem'

export default class EventList extends React.Component {
  render() {
    const { events } = this.props
    return (
      <div>
        <h1>Event List</h1>
        {events.map(event => <EventListItem key={event.id} event={event} />)}
      </div>
    )
  }
}