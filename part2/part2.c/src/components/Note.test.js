import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import Note from './Note'
import { prettyDOM } from '@testing-library/dom'
test ('renders contain' , () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  const component = render(
    <Note note = {note}/>
  )
  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))
  //component.debug()
  // method1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  //method2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()
  //method3
  const div = component.container.querySelector('.note') //css渲染组建的特定元素
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})


test('clicking the button calls event handler once', () => {   //   实现点击按钮后的测试
  const note = {
    content:' Component testting is done with react_testing-library',
    important: true
  }

  const mockHandler = jest.fn()
  const component = render(
    <Note note = {note} toggleImportance = {mockHandler}/>
  )
  const button = component.getByText('make not important')
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(1)
  //expect(mockhandler.mock.calls).tohaveLength(1)
})