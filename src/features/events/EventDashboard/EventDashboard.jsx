import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import { deleteEvent } from '../eventActions'

export class EventDashboard extends React.Component {
  handleDeleteEvent = eventId => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = (dispatch, actions) => ({
  deleteEvent: eventId => dispatch(deleteEvent(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)
