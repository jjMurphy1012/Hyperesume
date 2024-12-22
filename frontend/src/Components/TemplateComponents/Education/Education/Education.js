import React, { useState } from 'react';
import { CreateNewEducation } from '../CreateNewEducation/CreateNewEducation';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';
import './Education.css';
import deleteBtn from '../../../../Assets/icons/deleteBtn.png';
import addButton from '../../../../Assets/icons/addButton.png';

const Education = ({ education = [], setUserData }) => {
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState(null);
    const [editingData, setEditingData] = useState({});

    // Ensure we're working with an array
    const educationList = Array.isArray(education) ? education : [];

    const handleDeleteEducation = (indexToDelete) => {
        const updatedEducation = educationList.filter((_, index) => index !== indexToDelete);
        setUserData({ education: updatedEducation }); // Modified this line
    };

    const handleEdit = (index, edu) => {
        setCurrentlyEditing(index);
        setEditingData(edu);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();

        const trimmedData = {
            school: editingData.school?.trim() || '',
            degree: editingData.degree?.trim() || '',
            graduationDate: editingData.graduationDate?.trim() || '',
        };

        if (!trimmedData.school || !trimmedData.degree || !trimmedData.graduationDate) {
            alert('Please fill in all fields');
            return;
        }

        const updatedEducation = educationList.map((edu, index) =>
            index === currentlyEditing ? trimmedData : edu
        );
        
        setUserData({ education: updatedEducation });
        setCurrentlyEditing(null);
        setEditingData({});
    };

    const handleAddEducation = (newEducation) => {
        console.log('Before update - education list:', educationList);
        console.log('New education to add:', newEducation);
        const updatedEducation = [...educationList, newEducation];
        console.log('After update - updated education:', updatedEducation);
        setUserData({ education: updatedEducation });
        setShowEducationForm(false);
    };

    return (
        <div style={{ marginBottom: '24px' }}>
            <h2>Education</h2>
            <div style={{ marginTop: '8px' }}>
                <div>
                    {educationList.map((edu, index) => (
                        <div className="each-item" key={index} style={{marginBottom: "10px"}}>
                            {currentlyEditing === index ? (
                                <form onSubmit={handleSaveEdit} className="edit-education-form">
                                    <div className="school-grad">
                                        <AutoWidthInput
                                            className="input-styling"
                                            type="text"
                                            name="school"
                                            value={editingData.school || ''}
                                            onChange={handleEditInputChange}
                                            placeholder="School, Location"
                                        />
                                        <AutoWidthInput
                                            className="input-styling"
                                            type="text"
                                            name="graduationDate"
                                            value={editingData.graduationDate || ''}
                                            onChange={handleEditInputChange}
                                            placeholder="Graduation Date"
                                        />
                                    </div>
                                    <AutoWidthInput
                                        className="input-styling"
                                        type="text"
                                        name="degree"
                                        value={editingData.degree || ''}
                                        onChange={handleEditInputChange}
                                        placeholder="Degree"
                                    />
                                    <div className="form-buttons">
                                        <button type="submit" className="saveBtn">
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="cancelBtn"
                                            onClick={() => {
                                                setCurrentlyEditing(null);
                                                setEditingData({});
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div onClick={() => handleEdit(index, edu)}>
                                    <div className="school-grad">
                                        <div className="school">
                                            {edu.school}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteEducation(index);
                                                }}
                                                className="delete-btn"
                                            >
                                                <img src={deleteBtn} alt="Delete" />
                                            </button>
                                        </div>
                                        <div className="edu-grad-date">
                                            {edu.graduationDate}
                                        </div>
                                    </div>
                                    <div className="edu-degree">{edu.degree}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {showEducationForm && (
                    <CreateNewEducation
                        onSave={handleAddEducation}
                        onCancel={() => setShowEducationForm(false)}
                    />
                )}
            </div>
            <br/>
            <div className="button-container">
                {!showEducationForm && (
                    <button
                        type="button"
                        className="add-items-btn"
                        onClick={() => setShowEducationForm(true)}
                    >
                        <img className="add-button" src={addButton} alt="Add" />
                        Add Education
                    </button>
                )}
            </div>
        </div>
    );
};

export default Education;