import React from 'react'
import { mount } from 'enzyme'
import Users from '../Users'

it('<Users /> renders without props', () => {
  mount(<Users />)
})

it('<Users /> renders with props', () => {
  const username = 'username'
  const chatTabs = ['client1', 'client2', 'client3']
  const userList = ['username', 'client1', 'client2', 'client3']
  const createToggleChatHandler = (user) => { () => {} }
  const wrapper = mount(
    <Users
      username={username}
      chatTabs={chatTabs}
      userList={userList}
      createToggleChatHandler={createToggleChatHandler}
    />
  )
  expect(wrapper.find('ul').children()).toHaveLength(userList.length)
})
