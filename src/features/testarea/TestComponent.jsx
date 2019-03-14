import React from 'react'
import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { incrementAsync, decrementAsync } from './testActions'
import { openModal } from '../modals/modalActions'

export class TestComponent extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  state = {
    address: '',
    scriptLoaded: false
  }

  handleScriptLoad = () => this.setState(() => ({ scriptLoaded: true }))

  handleFormSubmit = event => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = address => this.setState(() => ({ address }))

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    
    const { incrementAsync, decrementAsync, data, openModal, loading } = this.props
    return (
      <div>
        <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyAxF70tJ49k9YoxNDGX1iV7hTjRraVOZP0&libraries=places'
          onLoad={this.handleScriptLoad} 
        />
        <h1>{data}</h1>
        <Button onClick={incrementAsync} color='green' content='Increment' loading={loading} />
        <Button onClick={decrementAsync} color='red' content='Decrement' loading={loading} />
        <Button onClick={() => openModal('TestModal', { data: 43 })} color='teal' content='Open Modal' />
        <br /><br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.test.loading
})

const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
  openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)
