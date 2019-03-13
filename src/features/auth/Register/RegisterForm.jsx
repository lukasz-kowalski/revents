import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'

export const RegisterForm = () => (
  <Form error size='large'>
    <Segment>
      <Field name='displayName' component={TextInput} type='text' placeholder='Known as' />
      <Field name='email' component={TextInput} type='text' placeholder='Email' />
      <Field name='password' component={TextInput} type='password' placeholder='password' />
      <Button fluid size='large' color='teal'>Register</Button> 
    </Segment>
  </Form>
)

export default reduxForm({ form: 'registerForm' })(RegisterForm)
