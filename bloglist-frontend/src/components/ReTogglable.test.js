import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import ReTogglable from "./RecombinationTogglable";
import Blog from './Blog'
describe("<ReTogglable/>", () => {
  // let compoent
  // compoent.render(
  //     <ReTogglable  buttonLabel = 'view'>
  //         <div className = 'testDiv'></div>
  //     </ReTogglable>
  // )

  test("check the url and the likes", () => {
    const blog = {
      title: "Doubt is the key to knowledge.",
      author: "huijun",
      url: "http://haha.com",
      likes: "30",
    };
    let compoent = render(
      <Blog blog={blog}></Blog>,
     
    )
        expect(compoent.container).toHaveTextContent('Doubt is the key to knowledge.')

    compoent = render(
        <ReTogglable buttonLabel="view">
        <div className="testDiv" />
      </ReTogglable>
    )   
    const button = compoent.getByText('view')
    fireEvent.click(button)

    const div = compoent.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})
