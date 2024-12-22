import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectProfile, 
  saveProfile, 
  selectSaveStatus,
  selectSaveError,
  selectLoading
} from '../../../redux/reducers/profileSlice';
import Education from '../../TemplateComponents/Education/Education/Education';
import Experience from '../../TemplateComponents/Experience/Experience/Experience';
import Projects from '../../TemplateComponents/Projects/Projects/Projects';
import Certifications from '../../TemplateComponents/Certifications/Certifications/Certifications';
import Skills from '../../TemplateComponents/Skills/Skills/Skills';
import PreviewMode from './PreviewMode/PreviewMode';
import "./Template4.css";

const Template4 = () => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const saveStatus = useSelector(selectSaveStatus);
    const saveError = useSelector(selectSaveError);
    const isLoading = useSelector(selectLoading);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const resumeRef = useRef(null);

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

    useEffect(() => {
        console.log('Profile data:', profile);
        if (profile) {
            const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
            console.log('Setting full name:', fullName);
            
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

    const handleSaveTemplate = async () => {
        if (!profile) return;

        try {
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
                    <button onClick={handlePrint} className="saveBtn">
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
                    <PreviewMode userData={userData} />
                ) : (
                    <div className="resume-template template4" key={userData.name}>
                        <br/><br/>
                        <header className="template4-header">
                            <div className="name-title-template4">
                                <h1 className="name">{userData.name}</h1>
                            </div>
                            <div className="contact-info">
                                <span>{userData.phone}</span>
                                <span>{userData.email}</span>
                                <span>{userData.address}</span>
                            </div>
                        </header>

                        <main className="template4-content">
                            <section className="experience-section">
                                <Experience 
                                    experience={userData.experience}
                                    setUserData={(newData) => handleSectionUpdate('experience', newData)}
                                />
                            </section>

                            <section className="education-section">
                                <Education 
                                    education={userData.education}
                                    setUserData={(newData) => handleSectionUpdate('education', newData)}
                                />
                            </section>

                            <section className="projects-section">
                                <Projects 
                                    projects={userData.projects}
                                    setUserData={(newData) => handleSectionUpdate('projects', newData)}
                                />
                            </section>

                            <div className="two-column-section">
                                <section className="skills-section">
                                    <Skills 
                                        skills={userData.skills}
                                        setUserData={(newData) => handleSectionUpdate('skills', newData)}
                                    />
                                </section>

                                <section className="certifications-section">
                                    <Certifications 
                                        certifications={userData.certifications}
                                        setUserData={(newData) => handleSectionUpdate('certifications', newData)}
                                    />
                                </section>
                            </div>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template4;