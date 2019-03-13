import React from 'react'
import { Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import LoginForm from '../../features/auth/Login/LoginForm'
import { closeModal } from './modalActions'

const actions = { closeModal }

export class LoginModal extends React.Component {
  render() {
    return (
      <Modal size='mini' open={true} onClose={this.props.closeModal}>
        <Modal.Header>Login to Re-vents</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null, actions)(LoginModal)
