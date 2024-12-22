import React, { useState } from 'react';
import './Login.css';
import errorIcon from '../../Assets/tooltip-warning-error-icon.png';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUserStatus, selectUserError } from '../../redux/reducers/userSlice';
import Navbar from '../Navbar/Navbar';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(selectUserStatus);
    const error = useSelector(selectUserError);

    const validateUsername = (value) => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!value) {
            setUsernameError('Username is required');
            return false;
        }
        if (!usernameRegex.test(value)) {
            setUsernameError('Only letters, numbers, and underscores are allowed');
            return false;
        }
        if (value.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            return false;
        }
        setUsernameError('');
        return true;
    };

    const validatePassword = (value) => {
        if (!value) {
            setPasswordError('Password is required');
            return false;
        }
        if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);
    
        if (!isUsernameValid || !isPasswordValid) {
            return;
        }

        const resultAction = await dispatch(loginUser({ username, password }));
        
        if (loginUser.fulfilled.match(resultAction)) {
            const role = resultAction.payload.role;
            switch (role) {
                case 'ROLE_ADMIN':
                    navigate('/admin');
                    break;
                case 'ROLE_USER':
                    navigate('/profile');
                    break;
                default:
                    console.error('Unknown role:', role);
                    navigate('/login?error');
            }
        }
    };


    return (
        <>
            <div className='parent-container-auth'>
                <div className="login-container" style={{marginTop: "2rem"}}>
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className={`form-group ${usernameError ? 'error' : ''}`}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className="form-input"
                                placeholder="Enter username"
                            />
                            {usernameError && <div className="tooltip"><img src={errorIcon} alt="error" />{usernameError}</div>}
                        </div>
                        <div className={`form-group ${passwordError ? 'error' : ''}`}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="form-input"
                                placeholder="Enter your password"
                            />
                            {passwordError && <div className="tooltip"><img src={errorIcon} alt="error" />{passwordError}</div>}
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={!!usernameError || !!passwordError || status === 'loading'}
                        >
                            {status === 'loading' ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="signup-text">
                        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
