import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Container, Menu, Button } from 'semantic-ui-react';
import { openModal } from '../../modals/modalActions'
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { logout } from '../../auth/authActions'

const actions = {
  openModal,
  logout
}

const mapStateToProps = state => ({
  auth: state.auth
})

class NavBar extends React.Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const { auth } = this.props
    const authenticated = auth.authenticated
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
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} currentUser={auth.currentUser} /> : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(connect(mapStateToProps, actions)(NavBar))
