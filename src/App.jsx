import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import CompanyRegistration from './components/CompanyRegistration'
import ApplicantRegistration from './components/ApplicantRegistration'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateJobPost from './components/CreateJobPost';
import CompanyDashboard from './components/CompanyDashboard';
import axios from 'axios';
import CvUploader from './components/CvUploader';

function App() {
  const [file, setFile] = useState(null)
  const [quiz, setQuiz] = useState([])

  const handleSubmitCv = async () => {
    const formData = new FormData();
    formData.append("file", file); // Add the file to FormData

    try {
      // Send POST request to the Flask backend
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setQuiz(JSON.parse(response.data?.data))
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file
  };
  return (

    // <>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleSubmitCv}>submit</button>

    //   {
    //     // eslint-disable-next-line react/jsx-key
    //     quiz?.map((q, index) => (<div>
    //       {index}  {q}
    //     </div>))
    //   }
    // </>

    // In your App.js or routing configuration
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/register" element={<CompanyRegistration />} />
        <Route path="/applicant/register" element={<ApplicantRegistration />} />
        <Route path="/company/create-job" element={<CreateJobPost />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/user/upload-cv" element={<CvUploader />} />
      </Routes>
    </Router>
  )
}

export default App
