import React from 'react'
import Script from 'react-load-script'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { incrementCounter, decrementCounter } from './testActions'

const Marker = () => <Icon name='marker' size='big' color='red' />

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
    
    const { incrementCounter, decrementCounter, data } = this.props
    return (
      <div>
        {/* <Script
          url='https://maps.googleapis.com/maps/api/js?key=AIzaSyAxF70tJ49k9YoxNDGX1iV7hTjRraVOZP0&libraries=places'
          onLoad={this.handleScriptLoad} 
        /> */}
        <h1>{data}</h1>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
        <br /><br />
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
          <button type='submit'>Submit</button>
        </form>
        <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAxF70tJ49k9YoxNDGX1iV7hTjRraVOZP0' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)
