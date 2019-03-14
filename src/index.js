import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import 'semantic-ui-css/semantic.min.css'
import configureStore from './app/store/configureStore'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css'
import App from './app/layout/App'
import * as serviceWorker from './serviceWorker'
import { loadEvents } from './features/events/eventActions'

const store = configureStore()
store.dispatch(loadEvents())

const root = document.getElementById('root')

let render = () => {
  ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr position='bottom-right' transitionIn='fadeIn' transitionOut='fadeOut' />
    <App />
  </Provider>, root)
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
