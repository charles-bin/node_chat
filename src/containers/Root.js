import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'

const store = configureStore()

// To debug redux store from console
window.store = store

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
