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
import { CompanyJobs } from './components/AppliedJobs';
import CreateJobPost from './components/CreateJobPost'
import { JobMarket } from './components/JobMarket';
import ViewJob from './components/ViewJob';
import { ApplicantJobs } from './components/ApplicantJobs';
import ApplicationStatus from './components/ApplicationStatus';
import ApplicantSettings from './components/ApplicationSettings';

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
          <Route path='jobs' element={<CompanyJobs type="company" />} />
        </Route>
        <Route path="applicant" element={<ApplicantDashboard />}>
          <Route path='job-market' element={<JobMarket />} />
          <Route path='applied-jobs' element={<ApplicantJobs />} />
          <Route path='apply' element={<ViewJob />} />
          <Route path='applied-jobs' element={<ApplicantJobs />} />
          <Route path='application-status' element={<ApplicationStatus />} />
          <Route path='settings' element={<ApplicantSettings />} />
        </Route>
        <Route path="upload-cv" element={<CvUploader />} />
      </Routes>
    </Router>
  )
}

export default App
