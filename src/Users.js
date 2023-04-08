import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./reducers/allUsersReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(({ allUsers }) => allUsers.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {allUsers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
