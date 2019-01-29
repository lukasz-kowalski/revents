import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
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
    date: '2018-03-27T11:00:00+00:00',
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
    isOpen: false
    }

  handleFormOpen = () => { 
    this.setState(() => ({
      isOpen: true
    }))
  }

  handleCancel = () => {
    this.setState(() => ({
      isOpen: false
    }))
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={this.state.events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive content='Create Event' onClick={this.handleFormOpen} />
          {this.state.isOpen && <EventForm handleCancel={this.handleCancel} />}
        </Grid.Column>
      </Grid>
    )
  }
}
