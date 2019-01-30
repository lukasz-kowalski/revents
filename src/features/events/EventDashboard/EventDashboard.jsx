import React from 'react'
import cuid from 'cuid'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente in officia eaque ab vel, minus fuga voluptate asperiores veritatis numquam!',
    city: 'London, UK',
    venue: "Tower of London, St Katherine's & Wapping, London",
    hostedBy: 'Bob',
    hostedPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Stefan',
        photoURL: 'https://randomuser.me/api/portraits/men/25.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to the Colloseum',
    date: '2018-03-27',
    category: 'culture',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente in officia eaque ab vel, minus fuga voluptate asperiores veritatis numquam!',
    city: 'London, UK',
    venue: "Tower of London, St Katherine's & Wapping, London",
    hostedBy: 'Bob',
    hostedPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'c',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'd',
        name: 'Stefan',
        photoURL: 'https://randomuser.me/api/portraits/men/25.jpg'
      }
    ]
  }
]

export default class EventDashboard extends React.Component {
    state = {
    events: events,
    isOpen: false,
    selectedEvent: null
    }

  handleFormOpen = () => { 
    this.setState(() => ({
      selectedEvent: null,
      isOpen: true
    }))
  }

  handleCancel = () => {
    this.setState(() => ({
      isOpen: false
    }))
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid()
    newEvent.hostedPhotoURL = '/assets/user.png'
    const updatedEvents = [...this.state.events, newEvent]
    this.setState(() => ({
      events: updatedEvents,
      isOpen: false
    }))
  }

  handleUpdateEvent = updatedEvent => {
    this.setState(() => ({
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent }
        }
        return event
      }),
      isOpen: false,
      selectedEvent: null
    }))
  }

  handleDeleteEvent = eventId => {
    this.setState(() => ({
      events: this.state.events.filter(event => event.id !== eventId),
      selectedEvent: null,
      isOpen: false
    }))
  }

  handleOpenEvent = eventToOpen => {
    this.setState(() => ({
      selectedEvent: eventToOpen,
      isOpen: true
    }))
  }

  render() {
    const { selectedEvent } = this.state
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive content='Create Event' onClick={this.handleFormOpen} />
          {this.state.isOpen && <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} handleCancel={this.handleCancel} createEvent={this.handleCreateEvent} />}
        </Grid.Column>
      </Grid>
    )
  }
}
