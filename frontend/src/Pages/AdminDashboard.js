// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchAllUsers, 
    updateUser, 
    deleteUser,
    validateAdminAccess,
    selectAllUsers,
    selectAdminStatus,
    selectAdminError,
    selectIsAdminValidated,
    selectAdminInfo 
} from '../redux/reducers/adminSlice'
import './CSS/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);
    const status = useSelector(selectAdminStatus);
    const error = useSelector(selectAdminError);
    const isAdminValidated = useSelector(selectIsAdminValidated);
    const adminInfo = useSelector(selectAdminInfo);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: '',
        role: '',
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
    });

    useEffect(() => {
        dispatch(validateAdminAccess())
            .unwrap()
            .then(() => {
                dispatch(fetchAllUsers());
            })
            .catch((error) => {
                console.error('Admin validation failed:', error);
                navigate('/login');
            });
    }, [dispatch, navigate]);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllUsers());
        }
    }, [status, dispatch]);

    useEffect(() => {
        // Show Redux error in the UI if it exists
        if (error) {
            setErrorMessage(error);
            setTimeout(() => setErrorMessage(''), 3000);
        }
    }, [error]);

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setEditFormData({
            username: user.username,
            role: user.role,
            profile: {
                firstName: user.profile?.firstName || '',
                lastName: user.profile?.lastName || '',
                email: user.profile?.email || '',
                phone: user.profile?.phone || ''
            }
        });
    };

    if (!isAdminValidated || status === 'loading') {
        return (
            <div className="admin-container">
                <h1>Admin Dashboard</h1>
                <p>Loading...</p>
            </div>
        );
    }

    if (!adminInfo?.role?.includes('ROLE_ADMIN')) {
        navigate('/login');
        return null;
    }

    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditFormData({
            username: '',
            role: '',
            profile: {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        });
    };

    const handleInputChange = (e, field, isProfile = false) => {
        if (isProfile) {
            setEditFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [field]: e.target.value
                }
            }));
        } else {
            setEditFormData(prev => ({
                ...prev,
                [field]: e.target.value
            }));
        }
    };

    const handleSaveEdit = (userId) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editFormData.profile.email)) {
            setErrorMessage('Please enter a valid email address');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        dispatch(updateUser({ userId, userData: editFormData }))
            .unwrap()
            .then(() => {
                setSuccessMessage('User updated successfully');
                setEditingUser(null);
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    const handleDelete = (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        dispatch(deleteUser(userId))
            .unwrap()
            .then(() => {
                setSuccessMessage('User successfully deleted');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    const handleRoleChange = (userId, newRole) => {
        const adminCount = users.filter(user => user.role === 'ROLE_ADMIN').length;
        const targetUser = users.find(user => user.id === userId);

        if (adminCount === 1 && targetUser.role === 'ROLE_ADMIN' && newRole === 'ROLE_USER') {
            setErrorMessage('Cannot remove the last admin role');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        const updatedUserData = {
            ...targetUser,
            role: newRole
        };

        dispatch(updateUser({ userId, userData: updatedUserData }))
            .unwrap()
            .then(() => {
                setSuccessMessage(`Role updated successfully for ${targetUser.username}`);
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    const renderUserRow = (user) => {
        if (editingUser === user.id) {
            return (
                <tr key={user.id} className="editing-row">
                    <td>
                        <input
                            type="text"
                            value={editFormData.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <select
                            value={editFormData.role}
                            onChange={(e) => handleInputChange(e, 'role')}
                            className="role-select"
                        >
                            <option value="ROLE_USER">ROLE_USER</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editFormData.profile.firstName}
                            onChange={(e) => handleInputChange(e, 'firstName', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editFormData.profile.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="email"
                            value={editFormData.profile.email}
                            onChange={(e) => handleInputChange(e, 'email', true)}
                            className="edit-input"
                        />
                    </td>
                    <td>
                        <input
                            type="tel"
                            value={editFormData.profile.phone}
                            onChange={(e) => handleInputChange(e, 'phone', true)}
                            className="edit-input"
                        />
                    </td>
                    <td className="action-column">
                        <button onClick={() => handleSaveEdit(user.id)} className="save-button">Save</button>
                        <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                    </td>
                </tr>
            );
        }

        return (
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                    <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="role-select"
                    >
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    </select>
                </td>
                <td>{user.profile?.firstName || ''}</td>
                <td>{user.profile?.lastName || ''}</td>
                <td>{user.profile?.email || ''}</td>
                <td>{user.profile?.phone || ''}</td>
                <td className="action-column">
                    <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
                </td>
            </tr>
        );
    };

    if (status === 'loading') {
        return (
            <>
                <div className="admin-container">
                    <h1>Admin Dashboard</h1>
                    <p>Loading users...</p>
                </div>
            </>
        );
    }

    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <p>Welcome, {adminInfo?.username || 'Admin'}!</p>

            <h2>Manage Users</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="admin-info">
                <p>Logged in as: {adminInfo?.username}</p>
                <p>Role: {adminInfo?.role}</p>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => renderUserRow(user))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="7" className="empty-message">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;