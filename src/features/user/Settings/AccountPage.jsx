import React from 'react'
import { connect } from 'react-redux'
import { updatePassword } from '../../auth/authActions'
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { combineValidators, matchesField, isRequired, composeValidators } from 'revalidate'
import TextInput from '../../../app/common/form/TextInput'
import { stat } from 'fs';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Please enter a password' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('newPassword1')({ message: 'Passwords do not match' })
  )()
})

const AccountPage = ({ error, invalid, submitting, handleSubmit, updatePassword, providerId }) => (
  <Segment>
    <Header dividing size='large' content='Account' />
    {providerId && providerId === 'password' && (
      <div>
        <Header color='teal' sub content='Change password' />
        <p>Use this form to update your account setting</p>
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            width={8}
            name='newPassword1'
            type='password'
            pointing='left'
            inline={true}
            component={TextInput}
            basic={true}
            placeholder='New password'
          />
          <Field
            width={8}
            name='newPassword2'
            type='password'
            inline={true}
            basic={true}
            pointing='left'
            component={TextInput}
            placeholder='Confirm password'
          />
          {error && <Label basic color='red'>{error}</Label>}
          <Divider />
          <Button disabled={invalid || submitting} size='large' positive content='Update password' />
        </Form>
      </div>
    )}

    {providerId && providerId === 'facebook.com' && (
      <div>
        <Header color='teal' sub content='Facebook account' />
        <p>Please visit Facebook to update your account settings</p>
        <Button type='button' color='facebook'>
          <Icon name='facebook' />
          Go to Facebook
        </Button>
      </div>
    )}

    {providerId && providerId === 'google.com' && (
      <div>
        <Header color='teal' sub content='Google account' />
        <p>Please visit Google to update your account settings</p>
        <Button type='button' color='google plus'>
          <Icon name='google plus' />
          Go to Google
        </Button>
      </div>
    )}
  </Segment>
)

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId
})

const mapDispatchToProps = {
  updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'account', validate })(AccountPage))
