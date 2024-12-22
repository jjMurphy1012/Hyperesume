import React, { useState } from 'react';
import './CreateNewEducation.css';
import AutoWidthInput from '../../../AutoWidthInput/AutoWidthInput';

export const CreateNewEducation = ({ onSave, onCancel }) => {
    const [educationData, setEducationData] = useState({
        school: '',
        degree: '',
        graduationDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const trimmedData = {
            school: educationData.school.trim(),
            degree: educationData.degree.trim(),
            graduationDate: educationData.graduationDate.trim(),
        };

        if (!trimmedData.school || !trimmedData.degree || !trimmedData.graduationDate) {
            alert('Please fill in all fields');
            return;
        }

        onSave(trimmedData);
    };

    return (
        <form onSubmit={handleSubmit} className="new-education-form each-item">
            <div className='school-grad'>
                <AutoWidthInput
                    className="input-styling"
                    type="text"
                    name="school"
                    value={educationData.school}
                    onChange={handleInputChange}
                    placeholder="School, Location"
                />
                <AutoWidthInput
                    className="input-styling"
                    type="text"
                    name="graduationDate"
                    value={educationData.graduationDate}
                    onChange={handleInputChange}
                    placeholder="Graduation Date"
                />
            </div>

            <AutoWidthInput
                className="input-styling"
                type="text"
                name="degree"
                value={educationData.degree}
                onChange={handleInputChange}
                placeholder="Degree"
            />

            <div className="form-buttons">
                <button type="submit" className='saveBtn'>
                    Save
                </button>
                <button type="button" className='cancelBtn' onClick={onCancel}>
                    Cancel
                </button>
            </div>
            <br/>
        </form>
    );
};