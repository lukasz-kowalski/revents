import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import SocialLogin from '../SocialLogin/SocialLogin'
import { startLogin, socialLogin } from '../authActions'

export const LoginForm = ({ handleSubmit, startLogin, socialLogin, error }) => (
  <Form size='large' onSubmit={handleSubmit(startLogin)}>
    <Segment>
      <Field name='email' component={TextInput} type='text' placeholder='Email address' />
      <Field name='password' component={TextInput} type='password' placeholder='password' />
      {error && <Label basic color='red'>{error}</Label>}
      <Button fluid size='large' color='teal'>Login</Button>
      <Divider horizontal>
        Or
      </Divider>
      <SocialLogin socialLogin={socialLogin} />
    </Segment>
  </Form>
)

const mapDispatchToProps = dispatch => ({
  startLogin: credentials => dispatch(startLogin(credentials)),
  socialLogin: selectedProvider => dispatch(socialLogin(selectedProvider))
})

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm))
