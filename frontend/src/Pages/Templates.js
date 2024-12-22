import React, {useState, useEffect} from 'react';
import Navbar from '../Components/Navbar/Navbar';
import template1 from '../Assets/templates/template1.png';
import template2 from '../Assets/templates/template2.png';
import template3 from '../Assets/templates/template3.png';
import template4 from '../Assets/templates/template4.png';
import { useNavigate } from 'react-router-dom';
import './CSS/Templates.css';
import ResumeBuilder from '../Pages/ResumeBuilder';
import Footer from '../Components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../redux/reducers/profileSlice';

const templatesData = [
  {
    id:1,
    image: template1,
    templateName: "Template 1"
  },
  {
    id:2,
    image: template2,
    templateName: "Template 2"
  },
  {
    id:3,
    image: template3,
    templateName: "Template 3"
  },
  {
    id:4,
    image: template4,
    templateName: "Template 4"
  },
]

const Templates = () => {

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile())
      .unwrap()
      .then(response => {
        console.log('Fetch profile response in ResumeBuilder:', response);
      })
      .catch(error => {
        console.error('Error fetching profile in ResumeBuilder:', error);
      });
  }, [dispatch]);

  const handleTemplateClick = (templateId) => {
    navigate(`/resume-builder/${templateId}`);
  };


  return (
    <div className='outer-container'>
        <h1 className='h1-header-style'>Browse Templates</h1>
        <br/><br/>
        <div className='templates-container'>
          {
            templatesData.map(template => {
              return (
                <div className='image-container' key={template.id} onClick={() => handleTemplateClick(template.id)}>
                  <img className="template-image" src={template.image} alt={template.templateName}/>
                </div>
              )
            })
          }
        </div>
        <br/><br/>

    </div>
  )
}

export default Templates;