import React from 'react'
import { Header, Segment, Sticky } from 'semantic-ui-react'

const EventActivity = () => (
  <Sticky offset={100}>
    <Header attached='top' content='Recent activity' />
    <Segment attached>
      <p>Recent activity</p>
    </Segment>
  </Sticky>
)

export default EventActivity
