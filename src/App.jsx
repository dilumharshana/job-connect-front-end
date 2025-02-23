import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApplicantRegistration from './components/ApplicantRegistration';
import CompanyDashboard from './components/CompanyDashboard';
import ApplicantDashboard from './components/ApplicantDashboard';
import CompanyRegistration from './components/CompanyRegistration';
import CvUploader from './components/CvUploader';
import HomePage from './components/HomePage';
import ApplicantLogin from './components/ApplicantLogin';
import { CompanyAnalytics } from './components/CompanyAnalytics';
import { CompanyJobs } from './components/CompanyJobs';
import CreateJobPost from './components/CreateJobPost'
import { JobMarket } from './components/JobMarket';
import ViewJob from './components/ViewJob';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/company/register" element={<CompanyRegistration />} />
        <Route path="/user-login" element={<ApplicantLogin />} />
        <Route path="/applicant/register" element={<ApplicantRegistration />} />
        <Route path="/create-job" element={<CreateJobPost />} />
        <Route path="company" element={<CompanyDashboard />}>
          <Route path='dashboard' element={<CompanyAnalytics />} />
          <Route path='jobs' element={<CompanyJobs />} />
        </Route>
        <Route path="applicant" element={<ApplicantDashboard />}>
          <Route path='job-market' element={<JobMarket />} />
          <Route path='jobs' element={<CompanyJobs />} />
          <Route path='apply' element={<ViewJob />} />
        </Route>
        <Route path="upload-cv" element={<CvUploader />} />
      </Routes>
    </Router>
  )
}

export default App
