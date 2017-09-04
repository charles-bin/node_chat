import React from 'react'
import { mount } from 'enzyme'
import Input from '../Input'

it('<Input /> renders without props', () => {
  mount(<Input />)
})

it('<Input /> renders with props', () => {
  const wrapper = mount(
    <Input
      id="componentId"
      type="text"
      placeholder="placeholder"
      onKeyPress={() => {}}
      inputRef={() => {}}
    />
  )
  expect(wrapper.find('input')).toHaveLength(1)
})
