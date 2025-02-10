import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ApplicantRegistration from './components/ApplicantRegistration';
import CompanyDashboard from './components/CompanyDashboard';
import CompanyRegistration from './components/CompanyRegistration';
import CreateJobPost from './components/CreateJobPost';
import CvUploader from './components/CvUploader';
import HomePage from './components/HomePage';
import ApplicantLogin from './components/ApplicantLogin';
import { CompanyAnalytics } from './components/CompanyAnalyrics';
import { CompanyJobs } from './components/CompanyJobs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/register" element={<CompanyRegistration />} />
        <Route path="/user-login" element={<ApplicantLogin />} />
        <Route path="/applicant/register" element={<ApplicantRegistration />} />
        <Route path="/company/create-job" element={<CreateJobPost />} />
        <Route path="company" element={<CompanyDashboard />}>
          <Route path='dashboard' element={<CompanyAnalytics />} />
          <Route path='jobs' element={<CompanyJobs />} />
        </Route>
        <Route path="/user/upload-cv" element={<CvUploader />} />
      </Routes>
    </Router>
  )
}

export default App
