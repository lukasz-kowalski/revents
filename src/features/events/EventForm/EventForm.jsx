/* global google */

import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'
import cuid from 'cuid'
import TextInput from '../../../app/common/form/TextInput'
import SelectInput from '../../../app/common/form/SelectInput'
import TextArea from '../../../app/common/form/TextArea'
import DateInput from '../../../app/common/form/DateInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { startCreatingEvent, startUpdateEvent } from '../eventActions'

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks'},
  { key: 'culture', text: 'Culture', value: 'culture'},
  { key: 'film', text: 'Film', value: 'film'},
  { key: 'food', text: 'Food', value: 'food'},
  { key: 'music', text: 'Music', value: 'music'},
  { key: 'travel', text: 'Travel', value: 'travel'}
]

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters long' })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends React.Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState(() => ({ scriptLoaded: true }))

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState(() => ({
        cityLatLng: latLng
      })))
      .then(() => this.props.change('city', selectedCity))
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState(() => ({
        venueLatLng: latLng
      })))
      .then(() => this.props.change('venue', selectedVenue))
  }

  onFormSubmit = values => {
    values.date = moment(values.date).format()
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      this.props.startUpdateEvent(values)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }
      this.props.startCreatingEvent(newEvent)
      this.props.history.push('/events')
    }
  }

  handleClick = () => this.props.history.push('/events')

  render() {
    const { invalid, submitting, pristine } = this.props 
    return (
      <Grid>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyAxF70tJ49k9YoxNDGX1iV7hTjRraVOZP0&libraries=places'
          onLoad={this.handleScriptLoaded} 
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name='title' type='text' component={TextInput} placeholder='Give your event a name' />
              <Field name='category' component={SelectInput} placeholder='What is your event about' options={category} />
              <Field name='description' rows={3} component={TextArea} placeholder='Tell us about your event' />
              <Header sub color='teal' content='Event location details' />
              <Field name='city' type='text' component={PlaceInput} options={{ types: ['(cities)'] }} placeholder='Event city' onSelect={this.handleCitySelect} />
              {this.state.scriptLoaded &&
                <Field name='venue' type='text' component={PlaceInput} options={{ location: new google.maps.LatLng(this.state.cityLatLng), radius: 1000, types: ['establishment'] }}            p         placeholder='Event venue' onSelect={this.handleVenueSelect} />}
              <Field name='date' component={DateInput} dateFormat='YYYY-MM-DD HH:mm' timeFormat='HH:mm' showTimeSelect placeholder='Date and time of event' />
              <Button disabled={invalid || submitting || pristine} positive type="submit">Submit</Button>
              <Button type="button" onClick={this.handleClick}>Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id

  let event = {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return { initialValues: event }
}

const mapDispatchToProps = (dispatch, actions) => ({
  startCreatingEvent: event => dispatch(startCreatingEvent(event)),
  startUpdateEvent: event => dispatch(startUpdateEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm))
