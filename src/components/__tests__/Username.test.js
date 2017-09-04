import React from 'react'
import { mount } from 'enzyme'
import Username from '../Username'

it('<Username /> renders without props', () => {
  const wrapper = mount(<Username />)
})

it('<Username /> renders with props', () => {
  const showModal = false
  const dispatch = jest.fn()
  const username = 'username'
  const emptyFeedback = ''
  const unavailableFeedback = 'username is not available'
  const requestUsernameIfValid = jest.fn()
  const inputEvent = { target: { value: 'user' }, key: '' }
  const enterEvent = { ...inputEvent, key: 'Enter' }

  const wrapper = mount(
    <Username
      showModal={showModal}
      dispatch={dispatch}
      username={username}
      usernameFeedback={emptyFeedback}
      requestUsernameIfValid={requestUsernameIfValid}
    />
  )
  // Show the Portal component
  expect(wrapper.find('Portal')).toHaveLength(0)
  wrapper.setProps({ showModal: true })
  expect(wrapper.find('Portal')).toHaveLength(1)

  // Check if input results in a dispatch to clear usernameFeedback
  expect(wrapper.props().dispatch).toHaveBeenCalledTimes(0)
  wrapper.instance().handleInputChange(inputEvent)
  expect(wrapper.props().dispatch).toHaveBeenCalledTimes(1)

  // Check if callbacks on 'Enter' and submit button make username request
  expect(wrapper.props().requestUsernameIfValid).toHaveBeenCalledTimes(0)
  wrapper.instance().handleEnterUsername(inputEvent)
  expect(wrapper.props().requestUsernameIfValid).toHaveBeenCalledTimes(0)
  wrapper.instance().handleEnterUsername(enterEvent)
  expect(wrapper.props().requestUsernameIfValid).toHaveBeenCalledTimes(1)
  wrapper.instance().handleSubmitUsername()
  expect(wrapper.props().requestUsernameIfValid).toHaveBeenCalledTimes(2)

  // Check inputElement focus
  wrapper.instance().inputElement.focus = jest.fn()
  expect(wrapper.instance().inputElement.focus).toHaveBeenCalledTimes(0)
  wrapper.instance().componentDidMount()
  expect(wrapper.instance().inputElement.focus).toHaveBeenCalledTimes(1)

  // Check if username with length > 20 changes validation state
  expect(wrapper.instance().getValidationState()).toBe(null)
  wrapper.setState({ input: '123456789012345678901'})
  expect(wrapper.instance().getValidationState()).toBe('error')
})
