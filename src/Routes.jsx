import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import HomePage from './features/home/HomePage'
import EventDashboard from './features/events/EventDashboard/EventDashboard'
import EventDetailedPage from './features/events/EventDetailed/EventDetailedPage'
import PeopleDashboard from './features/user/PeopleDashboard/PeopleDashboard'
import UserDetailed from './features/user/UserDetailed/UserDetailedPage'
import SettingsDashboard from './features/user/Settings/SettingsDashboard'
import EventForm from './features/events/EventForm/EventForm'
import NavBar from './features/nav/NavBar/NavBar'

const Routes = () => (
  <BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path='/' component={HomePage} exact />
      </Switch>

      <Route path='/(.+)' render={() => (
        <React.Fragment>
          <NavBar />
          <Container className="main">
            <Switch>
              <Route path='/events' component={EventDashboard} />
              <Route path='/event/:id' component={EventDetailedPage} />
              <Route path='/people' component={PeopleDashboard} />
              <Route path='/profile/:id' component={UserDetailed} />
              <Route path='/createevent' component={EventForm} />
              <Route path='/settings' component={SettingsDashboard} />
            </Switch>
          </Container>
        </React.Fragment>
        )}
      />
    </React.Fragment>
  </BrowserRouter>
)

export default Routes