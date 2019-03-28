import React from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react';
import { openModal } from '../../modals/modalActions'
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const actions = {
  openModal
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
})

class NavBar extends React.Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push('/')
  }

  render() {
    const { auth } = this.props
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
          {authenticated && <Menu.Item>
            <Button as={Link} to="/createevent" floated="right" positive inverted content="Create Event" />
          </Menu.Item>}
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} auth={auth} /> : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapStateToProps, actions)(NavBar)))
