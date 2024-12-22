import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectProfile, 
  saveProfile, 
  selectSaveStatus,
  selectSaveError,
  selectLoading
} from '../../../redux/reducers/profileSlice';
import './template1.css';
import Education from '../../TemplateComponents/Education/Education/Education';
import Experience from '../../TemplateComponents/Experience/Experience/Experience';
import Skills from '../../TemplateComponents/Skills/Skills/Skills';
import Projects from '../../TemplateComponents/Projects/Projects/Projects';
import Certifications from '../../TemplateComponents/Certifications/Certifications/Certifications';
import PreviewMode from './PreviewMode/PreviewMode';

const Template1 = () => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const saveStatus = useSelector(selectSaveStatus);
    const saveError = useSelector(selectSaveError);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const isLoading = useSelector(selectLoading);
    const resumeRef = useRef(null);
    
    // Initialize local state with profile data
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        education: [],
        experience: [],
        skills: {},
        projects: [],
        certifications: []
    });

    // Update local state when profile data changes
    // Modify the useEffect to properly handle the name
    useEffect(() => {
        console.log('Profile data:', profile);
        if (profile) {
            const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
            console.log('Setting full name:', fullName);
            
            // Force a complete state update
            setUserData({
                name: fullName,
                email: profile.email || '',
                phone: profile.phone || '',
                address: profile.address || '',
                education: profile.education || [],
                experience: profile.experience || [],
                skills: profile.skills || {},
                projects: profile.projects || [],
                certifications: profile.certifications || []
            });
        }
    }, [profile]);



    useEffect(() => {
        console.log('Name in userData changed:', userData.name);
    }, [userData.name]);

    const handleSaveTemplate = async () => {
        if (!profile) return;

        try {
            // Safely split name or use existing firstName/lastName
            let firstName = profile.firstName;
            let lastName = profile.lastName;
            
            if (userData.name) {
                const nameParts = userData.name.split(' ');
                firstName = nameParts[0] || profile.firstName || '';
                lastName = nameParts.slice(1).join(' ') || profile.lastName || '';
            }

            const updatedProfile = {
                ...profile,
                firstName,
                lastName,
                email: userData.email || profile.email,
                phone: userData.phone || profile.phone,
                address: userData.address || profile.address,
                education: userData.education,
                experience: userData.experience,
                skills: userData.skills,
                projects: userData.projects,
                certifications: userData.certifications
            };

            await dispatch(saveProfile(updatedProfile)).unwrap();
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    const handleSectionUpdate = (sectionName, newData) => {
        setUserData(prevData => ({
            ...prevData,
            [sectionName]: Array.isArray(newData) ? newData : newData[sectionName] || newData
        }));
    };

    

    const resumeSections = useMemo(() => [
        { title: 'Education', data: userData.education },
        { title: 'Experience', data: userData.experience },
        { title: 'Skills', data: userData.skills },
        { title: 'Projects', data: userData.projects },
        { title: 'Certifications', data: userData.certifications }
    ], [
        userData.education,
        userData.experience,
        userData.skills,
        userData.projects,
        userData.certifications
    ]);

    const handlePrint = () => {
        const printContent = resumeRef.current;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="template-container">
            <div className="template-actions">
                <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="saveBtn"
                >
                    {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
                <button
                    onClick={handleSaveTemplate}
                    className="saveBtn"
                    disabled={saveStatus === 'loading'}
                >
                    {saveStatus === 'loading' ? 'Saving...' : 'Save Template'}
                </button>
                {isPreviewMode && (
                    <button
                        onClick={handlePrint}
                        className="saveBtn"
                    >
                        Print Resume
                    </button>
                )}
                {saveStatus === 'succeeded' && (
                    <div className="save-status success">Template saved successfully!</div>
                )}
                {saveStatus === 'failed' && (
                    <div className="save-status error">Error saving template: {saveError}</div>
                )}
            </div>

            <div className="resume-container" ref={resumeRef}>
                {isPreviewMode ? (
                    <PreviewMode 
                        userData={userData}
                    />
                ) : (
                    <div className="resume-template" key={userData.name}>
                    <div className='template1-header'>
                        <h1>{userData.name}</h1>
                        <p>
                            {userData.email} 
                            {userData.phone && <>&nbsp;|&nbsp; {userData.phone}</>}
                            {userData.address && <>&nbsp;|&nbsp; {userData.address}</>}
                        </p>
                    </div>

                        <Education 
                            education={userData.education}
                            setUserData={(newData) => handleSectionUpdate('education', newData)}
                        />
                        <Skills 
                            skills={userData.skills}
                            setUserData={(newData) => handleSectionUpdate('skills', newData)}
                        />
                        <Experience 
                            experience={userData.experience}
                            setUserData={(newData) => handleSectionUpdate('experience', newData)}
                        />
                        <Projects 
                            projects={userData.projects}
                            setUserData={(newData) => handleSectionUpdate('projects', newData)}
                        />
                        <Certifications 
                            certifications={userData.certifications}
                            setUserData={(newData) => handleSectionUpdate('certifications', newData)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template1;