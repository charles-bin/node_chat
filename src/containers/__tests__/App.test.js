import React from 'react'
import { shallow, mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import App from '../App'

it('<App /> renders with default state', () => {
  const state = {
    receiveMessage: {
      General: []
    },
    username: '',
    userList: [],
    chatTabs: {
      tabs: {},
      currentTab: 'General'
    },
  }
  const store = createMockStore(state)
  const wrapper = mount(<App store={store} />)
})
