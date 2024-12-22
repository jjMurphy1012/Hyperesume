import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar/Navbar';
import Education from '../Components/TemplateComponents/Education/Education/Education';
import Experience from '../Components/TemplateComponents/Experience/Experience/Experience';
import Skills from '../Components/TemplateComponents/Skills/Skills/Skills';
import Projects from '../Components/TemplateComponents/Projects/Projects/Projects';
import Certifications from '../Components/TemplateComponents/Certifications/Certifications/Certifications';
import './CSS/Profile.css';
import Footer from '../Components/Footer/Footer';
import {
  fetchProfile,
  saveProfile,
  selectProfile,
  selectLoading,
  selectError,
  selectSaveStatus
} from '../redux/reducers/profileSlice';

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePhone = (phone) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phone);
};

const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]*$/.test(name);
};

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const saveStatus = useSelector(selectSaveStatus);
    
    const [localProfile, setLocalProfile] = useState({
      education: [],
      skills: {},
      experience: [],
      projects: [],
      certifications: []
    });
  
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      fullName: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: ''
    });
  
    useEffect(() => {
      console.log('Dispatching fetchProfile');
      dispatch(fetchProfile())
        .unwrap()
        .then(response => {
          console.log('Fetch profile response:', response);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }, [dispatch]);
  
    useEffect(() => {
      if (profile) {
        console.log('Updating local state with profile:', profile);
        setLocalProfile({
          education: Array.isArray(profile.education) ? profile.education : [],
          skills: profile.skills || {},
          experience: Array.isArray(profile.experience) ? profile.experience : [],
          projects: Array.isArray(profile.projects) ? profile.projects : [],
          certifications: Array.isArray(profile.certifications) ? profile.certifications : []
        });
        
        setFormData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
          phone: profile.phone || '',
          fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
        });
      }
    }, [profile]);
  
    const handleSaveProfile = async () => {
        // Reset errors
        setErrors({
            fullName: '',
            email: '',
            phone: ''
        });

        let hasErrors = false;
        const newErrors = {};

        // Validate full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Name is required';
            hasErrors = true;
        } else if (!validateName(formData.fullName)) {
            newErrors.fullName = 'Please enter a valid name (letters and spaces only)';
            hasErrors = true;
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            hasErrors = true;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            hasErrors = true;
        }

        // Validate phone
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            hasErrors = true;
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const updatedProfile = {
                ...profile,
                ...formData,
                ...localProfile,
                userId: profile.userId
            };
            
            console.log('Saving profile with data:', updatedProfile);
            const resultAction = await dispatch(saveProfile(updatedProfile)).unwrap();
            console.log('Save profile response:', resultAction);
            
        } catch (error) {
            console.error('Error during profile save:', error);
            alert('An error occurred while saving. Please try again.');
        }
    };

    const handleProfileChange = (e, field) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [field]: ''
        }));
    };
  
    const handleSectionUpdate = (sectionName, newData) => {
      console.log('Updating section:', sectionName, 'with data:', newData);
      setLocalProfile(prev => ({
        ...prev,
        [sectionName]: newData[sectionName] || newData
      }));
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!profile) {
      return <div>No profile data available</div>;
    }

  return (
    <>
      <h1 className="h1-header-style">User Profile</h1>
      <div className="profile-container">
        <div className="profile-header-actions">
          <button
            className={`save-profile-button ${saveStatus === 'loading' ? 'saving' : ''}`}
            onClick={handleSaveProfile}
            disabled={saveStatus === 'loading'}
          >
            {saveStatus === 'loading' ? 'Saving...' : 'Save Profile'}
          </button>
          
          {saveStatus === 'succeeded' && (
            <div className="save-status success">Profile saved successfully!</div>
          )}
          {saveStatus === 'failed' && (
            <div className="save-status error">Error saving profile. Please try again.</div>
          )}
        </div>

        <div className="basic-info-section">
            <div className="form-group">
                <label>Name</label>
                <input
                    value={formData.fullName}
                    onChange={(e) => {
                        handleProfileChange(e, 'fullName');
                        const value = e.target.value;
                        if (value && !validateName(value)) {
                            setErrors(prev => ({
                                ...prev,
                                fullName: 'Please enter a valid name (letters and spaces only)'
                            }));
                        }
                    }}
                    onBlur={(e) => {
                        const nameParts = e.target.value.trim().split(' ');
                        setFormData((prev) => ({
                            ...prev,
                            firstName: nameParts[0] || '',
                            lastName: nameParts.slice(1).join(' ') || '',
                            fullName: e.target.value,
                        }));
                    }}
                    className={errors.fullName ? 'error-input' : ''}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    value={formData.email}
                    onChange={(e) => {
                        handleProfileChange(e, 'email');
                        const value = e.target.value;
                        if (value && !validateEmail(value)) {
                            setErrors(prev => ({
                                ...prev,
                                email: 'Please enter a valid email address'
                            }));
                        }
                    }}
                    className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
                <label>Phone</label>
                <input
                    value={formData.phone}
                    onChange={(e) => {
                        handleProfileChange(e, 'phone');
                        const value = e.target.value;
                        if (value && !validatePhone(value)) {
                            setErrors(prev => ({
                                ...prev,
                                phone: 'Please enter a valid 10-digit phone number'
                            }));
                        }
                    }}
                    className={errors.phone ? 'error-input' : ''}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
        </div>

        <Education
            education={localProfile.education}
            setUserData={(updatedData) => {
                console.log('Received education update:', updatedData);
                if (updatedData.education) {
                    handleSectionUpdate('education', updatedData.education);
                }
            }}
        />
        <Skills
          skills={localProfile.skills}
          setUserData={(updatedSkills) => {
            handleSectionUpdate('skills', updatedSkills);
          }}
        />
        <Experience
          experience={localProfile.experience}
          setUserData={(updatedExperience) => {
            handleSectionUpdate('experience', updatedExperience);
          }}
        />
        <Projects
          projects={localProfile.projects}
          setUserData={(updatedProjects) => {
            handleSectionUpdate('projects', updatedProjects);
          }}
        />
        <Certifications
          certifications={localProfile.certifications}
          setUserData={(updatedCertifications) => {
            handleSectionUpdate('certifications', updatedCertifications);
          }}
        />
      </div>
    </>
  );
};

export default Profile;