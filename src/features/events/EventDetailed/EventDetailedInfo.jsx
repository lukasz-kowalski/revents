import React from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react'

const EventDetailedInfo = props => (
  <Segment.Group>
    <Segment attached='top'>
      <Grid>
        <Grid.Column width={1}>
          <Icon size='large' color='teal' name='info' />
        </Grid.Column>
        <Grid.Column width={15}>
          <p>{props.event.description}</p>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign='middle'>
        <Grid.Column width={1}>
          <Icon name='calendar' size='large' color='teal' />
        </Grid.Column>
        <Grid.Column width={15}>
          <span>{props.event.date}</span>
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment attached>
      <Grid verticalAlign='middle'>
      <Grid.Column width={1}>
        <Icon name='marker' size='large' color='teal' />
      </Grid.Column>
        <Grid.Column width={11}>
          <span>{props.event.venue}</span>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button color='teal' size='tiny' content='Show Map' />
        </Grid.Column>
      </Grid>
    </Segment>
  </Segment.Group>
)

export default EventDetailedInfo
