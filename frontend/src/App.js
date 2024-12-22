import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Templates from './Pages/Templates';
import ResumeBuilder from './Pages/ResumeBuilder';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/reducers/userSlice';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check auth status on mount
        const checkAuthStatus = async () => {
            try {
                await dispatch(fetchCurrentUser()).unwrap();
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        };

        checkAuthStatus();

        // Optional: Set up an interval to periodically check auth status
        const intervalId = setInterval(checkAuthStatus, 5 * 60 * 1000); // Check every 5 minutes

        return () => {
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, [dispatch]);

    return (
        <div className='app'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute
                                component={AdminDashboard}
                                roles={['ROLE_ADMIN']}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                component={Profile}
                                roles={['ROLE_USER', 'ROLE_ADMIN']}
                            />
                        }
                    />
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;