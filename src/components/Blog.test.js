/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("<Blog />", () => {
  let container;
  let mockHandler;
  const blog = {
    title: "Some Big Title",
    author: "Best Author",
    url: "www.somecoolurl.com",
    likes: 1,
    user: {
      username: "Davorko",
      name: "Davor Komusanac",
      id: "6355eb9b602f12f0a4e3d4d2",
    },
    id: "636671b0b4e9da685ae7b60a",
  };
  const user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhdm9ya28iLCJpZCI6IjYzNTVlYjliNjAyZjEyZjBhNGUzZDRkMiIsImlhdCI6MTY2NzY1ODE0MywiZXhwIjoxNjY3NjYxNzQzfQ.IuwM-vV5AzeuDHeEK_AnBV3hRyPP-7ao7OqcOFyLTkc",
    username: "Davorko",
    name: "Davor Komusanac",
    id: "6355eb9b602f12f0a4e3d4d2",
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    container = render(
      <Blog initialBlog={blog} user={user} updateLikes={mockHandler} />
    ).container;
  });

  test("title and author are render by default, url and likes are not", () => {
    const minimizedDiv = container.querySelector(".hiddenBlogTest");
    expect(minimizedDiv).toHaveTextContent("Some Big Title");
    expect(minimizedDiv).toHaveTextContent("Best Author");
    expect(minimizedDiv).not.toHaveStyle("display: none");

    const maximizedDiv = container.querySelector(".expandedBlogTest");
    expect(maximizedDiv).toHaveStyle("display: none");
  });

  test("url and likes are shown when button to expand is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".hiddenBlogTest");
    expect(div).toHaveStyle("display: none");

    const maximizedDiv = container.querySelector(".expandedBlogTest");
    expect(maximizedDiv).not.toHaveStyle("display: none");
    expect(maximizedDiv).toHaveTextContent("www.somecoolurl.com");
    expect(maximizedDiv).toHaveTextContent("1");
  });

  test("if the like button is clicked twice, the event handler received as props is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByRole("button", { name: "like" });
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

test("<BlogForm /> updates state and calls onSubmit", async () => {
  const handleBlogCreationMock = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm handleCreateBlog={handleBlogCreationMock} />);

  const titleInput = screen.getByRole("textbox", { name: "Title" });
  const authorInput = screen.getByRole("textbox", { name: "Author" });
  const urlInput = screen.getByRole("textbox", { name: "Url" });
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "Titlee");
  await user.type(authorInput, "Authorr");
  await user.type(urlInput, "www.url.com");
  await user.click(sendButton);

  expect(handleBlogCreationMock.mock.calls).toHaveLength(1);
  expect(handleBlogCreationMock.mock.calls[0][0].title).toBe("Titlee");
});
