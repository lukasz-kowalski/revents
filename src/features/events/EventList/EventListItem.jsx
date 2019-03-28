import React from 'react'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'

export default class EventListItem extends React.Component {
  handleDeleteEvent = () => {
    this.props.deleteEvent(this.props.event.id)
  }

  render() {
    const { event } = this.props
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostedPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{event.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')}{' '}
            at {format(event.date.toDate(), 'HH:mm')} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee
                  key={attendee.name + 'index'}
                  attendee={attendee}
                />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as={Link}
            to={`/event/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
          <Button
            onClick={this.handleDeleteEvent}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
        </Segment>
      </Segment.Group>
    )
  }
}
