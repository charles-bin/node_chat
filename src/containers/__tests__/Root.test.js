import React from 'react'
import { shallow } from 'enzyme'
import Root from '../Root'

it('<Root /> shallow render without props', () => {
  const wrapper = shallow(<Root />)
})
