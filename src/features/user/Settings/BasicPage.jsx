import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import DateInput from '../../../app/common/form/DateInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import TextInput from '../../../app/common/form/TextInput'
import RadioButton from '../../../app/common/form/RadioButton'
import { updateProfile } from '../userActions'

class BasicPage extends React.Component {
  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form onSubmit={handleSubmit(updateProfile)}>
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known as'
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field
              name='gender'
              type='radio'
              value='male'
              label='Male'
              component={RadioButton}
            />
            <Field
              name='gender'
              type='radio'
              value='female'
              label='Female'
              component={RadioButton}
            />
          </Form.Group>
          <Field
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of birth'
            dateFormat='YYYY-MM-DD'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={moment().subtract(18, 'years')}
          />
          <Field
            width={8}
            name='city'
            component={PlaceInput}
            options={{ types: ['(cities)'] }}
            placeholder='Home town'
            label='Female'
          />
          <Divider />
          <Button disabled={pristine || submitting} size='large' positive content='Update profile' />
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = state => ({
  initialValues: state.firebase.profile
})

const mapDispatchToProps = {
  updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(BasicPage))
