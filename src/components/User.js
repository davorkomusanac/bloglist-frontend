/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../reducers/allUsersReducer";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [user, errorMessage] = useSelector(({ allUsers }) => [
    allUsers.singleUser,
    allUsers.errorMessage,
  ]);

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [id]);

  if (errorMessage) return <div>{errorMessage}</div>;

  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
