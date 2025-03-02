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

  const handleBlock = async (id) => {
    const confirmLogout = window.confirm("Are you sure you want to Block?");
    if(confirmLogout){
    try {
      await axios.put(`http://localhost:8000/api/users/block/${id}`);
      alert("User blocked successfully!");
      fetchUsers(); // Refresh the list after blocking
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("An error occurred while blocking the user.");
    }}
  };

  const handleUnblock = async (id) => {
    const confirmLogout = window.confirm("Are you sure you want to UnBlock?");
    if(confirmLogout){
    try {
      await axios.put(`http://localhost:8000/api/users/unblock/${id}`);
      alert("User unblocked successfully!");
      fetchUsers(); // Refresh the list after unblocking
    } catch (error) {
      console.error("Error unblocking user:", error);
      alert("An error occurred while unblocking the user.");
    }}
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${updatedUser._id}`, updatedUser);
      if (response.status === 200) {
        alert("User updated successfully!");
        fetchUsers(); // Refresh the list after update
        setShowEditModal(false); // Close the modal
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
              <th>Username</th>
              <th>User Role</th>
              <th>Company Name</th>
              <th>Status</th>
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
                  <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>
                      Update
                    </button>
                    {user.isBlocked ? (
                      <button className="btn btn-success btn-sm" onClick={() => handleUnblock(user._id)}>
                        Unblock
                      </button>
                    ) : (
                      <button className="btn btn-color btn-sm" onClick={() => handleBlock(user._id)}>
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No user data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
  const [updatedUser, setUpdatedUser] = useState(user || {});

  useEffect(() => {
    setUpdatedUser(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={updatedUser.firstName || ''} onChange={handleChange} />
            
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={updatedUser.lastName || ''} onChange={handleChange} />

            <label className="form-label">Designation</label>
            <input type="text" className="form-control" name="designation" value={updatedUser.designation || ''} onChange={handleChange} />

            <label className="form-label">Contact</label>
            <input type="text" className="form-control" name="contact" value={updatedUser.contact || ''} onChange={handleChange} />

            <label className="form-label">Username</label>
            <input type="text" className="form-control" name="username" value={updatedUser.username || ''} onChange={handleChange} />

            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" name="companyName" value={updatedUser.companyName || ''} onChange={handleChange} />

            <label className="form-label">User Role</label>
            <select className="form-control" name="selectedOption" value={updatedUser.selectedOption || ''} onChange={handleChange}>
              <option value="Admin">Admin</option>
              <option value="CompanyAdmin">Company Admin</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
