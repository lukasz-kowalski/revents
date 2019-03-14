import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import { startLogin } from '../authActions'

export const LoginForm = ({ handleSubmit, startLogin }) => (
  <Form error size='large' onSubmit={handleSubmit(startLogin)}>
    <Segment>
      <Field name='email' component={TextInput} type='text' placeholder='Email address' />
      <Field name='password' component={TextInput} type='password' placeholder='password' />
      <Button fluid size='large' color='teal'>Login</Button> 
    </Segment>
  </Form>
)

const mapDispatchToProps = (dispatch, actions) => ({
  startLogin: credentials => dispatch(startLogin(credentials))
})

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm))
