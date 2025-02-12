import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import '../styles/CreateJobPost.css';
import { useNavigate } from 'react-router-dom';

const CreateJobPost = ({ jobData = null, onSuccess }) => {
  const isEditMode = !!jobData;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    job_name: '',
    category: '',
    description: '',
    communication_level: 50,
    critical_think_level: 50,
    job_knowledge_level: 50,
    work_mode: '',
    salary: '',
    experience: ''
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (jobData) {
      setFormData(jobData);
    }
  }, [jobData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRangeChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'jobId') {
        setError(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isEditMode
        ? `http://localhost:5000/api/company/job`
        : 'http://localhost:5000/api/company/job';

      let response = null;

      const payload = {
        ...formData,
        companyId: JSON.parse(localStorage.getItem("job-connect")).userId
      }

      if (isEditMode) {
        response = await axios.put(endpoint, payload);
      } else {
        response = await axios.post(endpoint, payload);
      }


      if (response.data) {
        setShowModal(true);
        if (!isEditMode) {
          setFormData({
            job_name: '',
            category: '',
            description: '',
            communication_level: 50,
            critical_think_level: 50,
            job_knowledge_level: 50,
            work_mode: '',
            salary: '',
            experience: '',
          });

          navigate('/company/jobs')
        }
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError(isEditMode ? 'Failed to update job. Please try again.' : 'Failed to create job. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="create-job-container">
      <div className="form-card">
        <h1 className="form-title">
          {isEditMode ? 'Edit Job Posting' : 'Create New Job Posting'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="form-group">
                <label>Job Category</label>
                <select
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="ai-engineer">AI Engineer</option>
                  <option value="devops-engineer">DevOps Engineer</option>
                  <option value="ux-designer">UX Designer</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Job Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="job_name"
                  value={formData.job_name}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-4">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter job description"
              rows={4}
            />
          </div>

          <div className="skill-levels mb-4">
            <div className="form-group">
              <label>
                Expected Communication Level: {formData.communication_level}%
              </label>
              <input
                type="range"
                className="form-range custom-range"
                name="communication_level"
                min="0"
                max="100"
                value={formData.communication_level}
                onChange={handleRangeChange}
              />
            </div>

            <div className="form-group">
              <label>
                Expected Critical Thinking Level: {formData.critical_think_level}%
              </label>
              <input
                type="range"
                className="form-range custom-range"
                name="critical_think_level"
                min="0"
                max="100"
                value={formData.critical_think_level}
                onChange={handleRangeChange}
              />
            </div>

            <div className="form-group">
              <label>
                Expected Job Knowledge Level: {formData.job_knowledge_level}%
              </label>
              <input
                type="range"
                className="form-range custom-range"
                name="job_knowledge_level"
                min="0"
                max="100"
                value={formData.job_knowledge_level}
                onChange={handleRangeChange}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <div className="form-group">
                <label>Work Mode</label>
                <select
                  className="form-control"
                  name="work_mode"
                  value={formData.work_mode}
                  onChange={handleInputChange}
                >
                  <option value="">Select work mode</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Salary (USD)</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Enter salary range"
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label>Experience (Years)</label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Required experience"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-button"
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {isEditMode ? 'Updating Job...' : 'Creating Job...'}
              </span>
            ) : (
              isEditMode ? 'Update Job' : 'Create Job'
            )}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="success-title">Success!</h2>
            <p>Job has been {isEditMode ? 'updated' : 'created'} successfully!</p>
            <button
              className="btn btn-success"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJobPost;