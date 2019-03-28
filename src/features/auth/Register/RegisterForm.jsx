import React from 'react'
import { connect } from 'react-redux'
import { combineValidators, isRequired } from 'revalidate'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { startRegisterUser } from '../authActions'
import TextInput from '../../../app/common/form/TextInput'
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})

export const RegisterForm = ({ handleSubmit, startRegisterUser, error, invalid, submitting }) => (
  <Form error size='large' onSubmit={handleSubmit(startRegisterUser)}>
    <Segment>
      <Field name='displayName' component={TextInput} type='text' placeholder='Known as' />
      <Field name='email' component={TextInput} type='text' placeholder='Email' />
      <Field name='password' component={TextInput} type='password' placeholder='password' />
      {error && <Label basic color='red'>{error}</Label>}
      <Button disabled={invalid || submitting} fluid size='large' color='teal'>Register</Button> 
      <Divider horizontal>
        Or
      </Divider>
      <SocialLogin />
    </Segment>
  </Form>
)

const mapDispatchToProps = {
  startRegisterUser
}

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'registerForm', validate })(RegisterForm))
