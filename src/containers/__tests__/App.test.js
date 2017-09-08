import React from 'react'
import { shallow, mount } from 'enzyme'
import { createMockStore } from 'redux-test-utils'
import {
  createMessage,
  GENERAL_MESSAGE,
  PRIVATE_MESSAGE
} from '../../socketAPI'
import App from '../App'

it('<App /> renders with default state', () => {
  const state = {
    receiveMessage: {
      General: []
    },
    username: '',
    usernameFeedback: '',
    userList: [],
    chatTabs: {
      tabs: {},
      currentTab: 'General'
    },
  }
  document.getElementById = jest.fn().mockReturnValue({
    getElementsByClassName: jest.fn().mockReturnValue([{ scrollHeight: 0 }])
  })
  const store = createMockStore(state)
  const wrapper = mount(<App store={store} />)
  wrapper.find('App').node.componentDidUpdate()
})

it('<App /> handles direct username and send message requests', () => {
  const state = {
    receiveSocket: {
      emit: jest.fn()
    },
    receiveMessage: {
      General: []
    },
    username: 'user1',
    usernameFeedback: '',
    userList: ['user1', 'user2'],
    chatTabs: {
      tabs: { user2: 0 },
      currentTab: 'General'
    },
  }
  document.getElementById = jest.fn().mockReturnValue({
    getElementsByClassName: jest.fn().mockReturnValue([{ scrollHeight: 0 }])
  })
  const generalMessage = { target: { value: 'general' }, key: 'Enter' }
  const store = createMockStore(state)
  let wrapper = mount(<App store={store} />)
  wrapper.find('App').node.requestUsernameIfValid('user1')
  wrapper.find('App').node.handleSendMessage(generalMessage)

  // Send a private message
  const privateMessage = { target: { value: 'private' }, key: 'Enter' }
  const switchTab = createMockStore({...state, chatTabs: {...state.chatTabs, currentTab: 'user2'}})
  wrapper = mount(<App store={switchTab} />)
  wrapper.find('App').node.handleSendMessage(privateMessage)

  // Try to send an empty message
  const emptyMessage = { target: { value: '' }, key: 'Enter' }
  wrapper.find('App').node.handleSendMessage(emptyMessage)

  // Request username with an undefined socket
  const socketless = createMockStore({...state, receiveSocket: null})
  wrapper = mount(<App store={socketless} />)
  wrapper.find('App').node.requestUsernameIfValid('user1')
  wrapper.find('App').node.requestUsernameIfValid('123456789012345678901')
})

it('<App /> renders with populated props', () => {
  const state = {
    receiveMessage: {
      General: [
        [...Array(10).keys()].map(i => {
          return createMessage('user1', i, GENERAL_MESSAGE)
        })
      ],
      'user2': [
        createMessage('user2', 'from user2', PRIVATE_MESSAGE, 'user1'),
      ]
    },
    username: 'user1',
    usernameFeedback: '',
    userList: [
      'user1',
      'user2',
      'user3',
      'user4',
    ],
    chatTabs: {
      tabs: {
        'user2': 1,
        'user3': 0,
      },
      currentTab: 'user2'
    },
  }
  const store = createMockStore(state)
  let wrapper = mount(<App store={store} />)

  // Check if unread private messages badge is displayed correctly
  expect(wrapper.find('#message-tabs-tab-user2').find('.badge').text()).toEqual('1')

  // Remove open chat tab
  wrapper.find('App').node.createToggleChatHandler('user2')()
  // Open existing chat tab
  wrapper.find('App').node.createToggleChatHandler('user3')()
  // Create new chat tab from users panel
  wrapper.find('App').node.createToggleChatHandler('user4')()
  // Select existing tab
  wrapper.find('App').node.handleTabSelect('user3')

  // Open a tab without messages
  const noMessageTab = createMockStore({...state, chatTabs: {...state.chatTabs, currentTab: 'user3'}})
  wrapper = mount(<App store={noMessageTab} />)
  // Remove a tab that is not adjacent to the 'General' tab
  wrapper.find('App').node.createToggleChatHandler('user3')()

  // Check document scroll to bottom and input element focus
  document.getElementById = jest.fn().mockReturnValue({
    getElementsByClassName: jest.fn().mockReturnValue([{ scrollHeight: 0 }])
  })
  window.setTimeout = f => { f() }
  wrapper.find('App').node.componentDidUpdate()
})
