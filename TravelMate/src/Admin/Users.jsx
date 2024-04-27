import React, { useState, useEffect } from "react";
import Navbar from "../Admin/Navbar";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    number: "",
    role: "user" // Default role is user
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/totalusers")
      .then((response) => {
        const userData = response.data;
        setUsers(userData.allUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      });
  };

  const deleteUser = (userId) => {
    axios
      .delete(`/users/${userId}`)
      .then(() => {
        // If deletion is successful, fetch users again to update the user list
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Error deleting user");
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUserData({
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role // Set role value from user data
    });
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? (checked ? "admin" : "user") : value;
    setEditedUserData({
      ...editedUserData,
      [name]: newValue
    });
  };

  const saveEditedUser = () => {
    axios
      .put(`/users/${editingUser._id}`, editedUserData)
      .then(() => {
        // If update is successful, fetch users again to update the user list
        fetchUsers();
        setEditingUser(null);
        setEditedUserData({
          name: "",
          email: "",
          number: "",
          role: "user" // Reset role to user after editing
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Error updating user");
      });
  };

  return (
    <div className="p-9">
      <Navbar />
      <div>
        <h2 className="text-2xl underline font-semibold p-9 mb-4 text-center">
          Users registered in TravelMate{" "}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg border-r border-primary p-6 relative"
            >
              <p className="text-xl font-semibold mb-2">Name: {user.name}</p>
              <p className="text-gray-600 mb-2">Email: {user.email}</p>
              <p className="text-gray-600 mb-2">Number: {user.number}</p>
              <p className="text-gray-600">Admin: {user.role === "admin" ? "Yes" : "No"}</p>
              <div className="absolute bottom-4 right-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="number" className="block mb-1">
                  Number:
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={editedUserData.number}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-1 w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  id="role"
                  name="role"
                  checked={editedUserData.role === "admin"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="role">Admin</label>
              </div>
              <div className="text-right">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={saveEditedUser}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
