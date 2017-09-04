import React from 'react'
import { mount } from 'enzyme'
import Messages from '../Messages'
import { createMessage } from '../../socketAPI'

it('<Messages /> renders without props', () => {
  mount(<Messages />)
})

it('<Messages /> renders empty array', () => {
  const messages = []
  mount(<Messages messages={messages} />)
})

it('<Messages /> renders sample general chat', () => {
  const messages = [
    {"from":"client1","body":"client1 has connected","messageType":"SERVER_MESSAGE"},
    {"from":"client2","body":"client2 has connected","messageType":"SERVER_MESSAGE"},
    {"from":"client1","body":"hello","messageType":"GENERAL_MESSAGE"},
    {"from":"client2","body":"hello","messageType":"GENERAL_MESSAGE"},
    {"from":"client1","body":"i'm client 1","messageType":"GENERAL_MESSAGE"},
    {"from":"client2","body":"i'm client 2","messageType":"GENERAL_MESSAGE"}
  ]
  const wrapper = mount(<Messages messages={messages} />)
  expect(wrapper.find('ul').children()).toHaveLength(messages.length)
})

it('<Messages /> renders sample private chat', () => {
  const messages = [
    {"from":"client1","body":"hello","messageType":"PRIVATE_MESSAGE","to":"client2"},
    {"from":"client2","body":"hello","messageType":"PRIVATE_MESSAGE","to":"client1"},
    {"from":"client1","body":"pm from client1","messageType":"PRIVATE_MESSAGE","to":"client2"},
    {"from":"client2","body":"pm from client2","messageType":"PRIVATE_MESSAGE","to":"client1"}
  ]
  const wrapper = mount(<Messages messages={messages} />)
  expect(wrapper.find('ul').children()).toHaveLength(messages.length)
})
