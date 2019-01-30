import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import SettingsNav from './SettingsNav'

const SettingsDashboard = props => {
  const { children } = props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) return React.cloneElement(child);
    return child;
  });
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect from='/settings' to='/settings/basic' exact />
        </Switch>
      {childrenWithProps}
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  )
}

export default SettingsDashboard
