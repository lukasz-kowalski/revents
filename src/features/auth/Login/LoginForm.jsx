import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/common/form/TextInput'
import { login } from '../authActions'

export const LoginForm = props => (
  <Form error size='large' onSubmit={props.handleSubmit(props.login)}>
    <Segment>
      <Field name='email' component={TextInput} type='text' placeholder='Email address' />
      <Field name='password' component={TextInput} type='password' placeholder='password' />
      <Button fluid size='large' color='teal'>Login</Button> 
    </Segment>
  </Form>
)

const mapDispatchToProps = (dispatch, actions) => ({
  login: credentials => dispatch(login(credentials))
})

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm))
