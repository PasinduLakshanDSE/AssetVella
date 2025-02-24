import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./users.css";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/getallUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch data when the component mounts
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/users/${id}`);
        if (response.status === 200) {
          alert("User deleted successfully!");
          fetchUsers(); // Refresh the list after deletion
        } else {
          alert("Failed to delete the user. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to edit
    setShowEditModal(true); // Show the edit modal
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${updatedUser._id}`, updatedUser);
      if (response.status === 200) {
        alert("User updated successfully!");
        fetchUsers(); // Refresh the list after update
        setShowEditModal(false); // Close the modal
      } else {
        alert("Failed to update the user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-bordered table-light">
          <thead className="bs">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Designation</th>
              <th>Contact</th>
              <th>User Name</th>
              <th>User Role</th>
              <th>Company Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.designation}</td>
                  <td>{user.contact}</td>
                  <td>{user.username}</td>
                  <td>{user.selectedOption}</td>
                  <td>{user.companyName}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No user data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Modal */}
        {showEditModal && editingUser && (
          <EditUserModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            user={editingUser}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

const EditUserModal = ({ show, onClose, user, onUpdate }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={updatedUser.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={updatedUser.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                value={updatedUser.designation}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                name="contact"
                value={updatedUser.contact}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={updatedUser.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">User Role</label>
              <select
                className="form-control"
                name="selectedOption"
                value={updatedUser.selectedOption}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="CompanyAdmin">Company Admin</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
