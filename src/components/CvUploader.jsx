import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Check, ChevronLeft, ChevronRight, Download, Heart, SkipForward, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/CvUploader.css";

const CvUploader = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processingReport, setProcessingReport] = useState(false);
    const [skillQuestions, setSkillQuestions] = useState([]);
    const [experienceQuestions, setExperienceQuestions] = useState([]);
    const [cvData, setCvData] = useState(null);
    const [currentSection, setCurrentSection] = useState('upload');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({
        experience: {},
        skills: {}
    });
    const [showModal, setShowModal] = useState(false)
    const [report, setReport] = useState(null);
    const { state } = useLocation()
    const navigate = useNavigate()

    const jobData = state?.jobData || false

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8080/upload', formData);
            console.log(response?.data?.data);
            const quizData = JSON.parse(response?.data?.data?.quiz);

            setExperienceQuestions(quizData?.experienceQuiz);
            setSkillQuestions(quizData?.skillQuiz);
            setCvData(response?.data?.data?.cvData);
            setCurrentSection('experience');
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentQuestions = () => {
        return currentSection === 'experience' ? experienceQuestions : skillQuestions;
    };

    const handleAnswerChange = (answer) => {
        const section = currentSection;
        setAnswers(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [currentQuestionIndex]: answer
            }
        }));
    };

    const handleSkip = () => {
        const section = currentSection;
        setAnswers(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [currentQuestionIndex]: 'SKIPPED'
            }
        }));
        handleNext();
    };

    const handleNext = () => {
        const currentQuestions = getCurrentQuestions();
        const section = currentSection;
        const answer = answers[section][currentQuestionIndex];

        // if (!answer && !window.confirm('You haven\'t answered this question. Are you sure you want to continue?')) {
        //     return;
        // }

        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (section === 'experience') {
            setCurrentSection('skills');
            setCurrentQuestionIndex(0);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (currentSection === 'skills') {
            setCurrentSection('experience');
            setCurrentQuestionIndex(experienceQuestions.length - 1);
        }
    };

    const handleSubmit = async () => {
        setProcessingReport(true);
        try {
            const response = await axios.post('http://127.0.0.1:8080/submit-answers', {
                answers: {
                    experience: answers.experience,
                    skills: answers.skills
                },
            });
            setReport(JSON.parse(response?.data?.data));
            setCurrentSection('report');
        } catch (error) {
            console.error('Error submitting answers:', error);
        } finally {
            setProcessingReport(false);
        }
    };

    const downloadReport = async () => {
        const reportElement = document.getElementById('report-section');
        const canvas = await html2canvas(reportElement);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('interview-report.pdf');
    };

    const handleApplyJob = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/applicant/apply', {
                companyId: jobData?.company,
                jobId: jobData?.id,
                applicantId: JSON.parse(localStorage.getItem('job-connect')).userId,
                communication_level: report?.ratings?.communication,
                job_knowledge_level: report?.ratings?.critical_thinking,
                critical_thinking_level: report?.ratings?.jobRelatedKnowledge,
                cv_data: cvData
            });

            if (response?.data) {
                setShowModal(true)
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
        } finally {
            setProcessingReport(false);
        }
    }

    return (
        <div className="cv-uploader-container">

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">

                        <p className="success-title">Sent, Good luck !</p>

                        <button
                            className="modal-done-button"
                            onClick={() => { setShowModal(false); navigate('/applicant/job-market') }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )
            }

            <div className="cv-uploader-card">
                {currentSection === 'upload' && (
                    <div className="upload-section">
                        <h1 className="section-title">Upload Your CV</h1>
                        <p className="section-description">
                            Let's analyze your CV and prepare for your dream job interview
                        </p>

                        <label className="file-upload-label">
                            <div className="upload-icon">
                                <Upload />
                            </div>
                            <span className="file-name">
                                {file ? file.name : "Drop your CV here or click to browse"}
                            </span>
                            <input
                                type="file"
                                className="file-input"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".pdf,.doc,.docx"
                            />
                        </label>

                        <button
                            className={`upload-button ${loading ? 'loading' : ''}`}
                            onClick={handleUpload}
                            disabled={!file || loading}
                        >
                            {loading ? (
                                <div className="loader">
                                    <div className="loader-spinner"></div>
                                    <span>Processing your CV...</span>
                                </div>
                            ) : (
                                "Start Interview"
                            )}
                        </button>
                    </div>
                )}

                {(currentSection === 'experience' || currentSection === 'skills') && (
                    <div className="question-section">
                        <div className="section-indicator">
                            <span className={`indicator ${currentSection === 'experience' ? 'active' : ''}`}>
                                Experience
                            </span>
                            <div className="indicator-divider"></div>
                            <span className={`indicator ${currentSection === 'skills' ? 'active' : ''}`}>
                                Skills
                            </span>
                        </div>

                        <h2 className="section-title">
                            Question {currentQuestionIndex + 1} of {getCurrentQuestions().length}
                        </h2>

                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${(((currentSection === 'skills' ? experienceQuestions.length : 0) + currentQuestionIndex + 1) /
                                        (experienceQuestions.length + skillQuestions.length)) * 100}%`
                                }}
                            ></div>
                        </div>

                        <div className="question-box">
                            <p>{getCurrentQuestions()[currentQuestionIndex]}</p>
                        </div>

                        <textarea
                            className="answer-input"
                            value={answers[currentSection][currentQuestionIndex] || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Type your answer here..."
                        />

                        <div className="navigation-controls">
                            <button
                                className="nav-button skip"
                                onClick={handleSkip}
                            >
                                <SkipForward />
                                <span>Skip</span>
                            </button>

                            <div className="main-controls">
                                <button
                                    className={`nav-button prev ${currentQuestionIndex === 0 && currentSection === 'experience' ? 'disabled' : ''}`}
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0 && currentSection === 'experience'}
                                >
                                    <ChevronLeft />
                                    <span>Previous</span>
                                </button>
                            </div>
                        </div>

                        <div className='quiz-next-button-container'>
                            <button
                                className="nav-button next mt-4"
                                onClick={handleNext}
                            >
                                <span>
                                    {currentQuestionIndex === getCurrentQuestions().length - 1 && currentSection === 'skills'
                                        ? 'Submit'
                                        : 'Next'
                                    }
                                </span>
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}

                {currentSection === 'report' && report !== null && (
                    <div id="report-section" className="report-section">
                        {processingReport ? (
                            <div className="processing-report">
                                <div className="processing-spinner"></div>
                                <p>Generating your interview report...</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="report-title">Interview Report</h2>

                                <div className="report-card">
                                    <h3>Performance Ratings</h3>
                                    {Object.entries(report?.ratings || {}).map(([key, value]) => (
                                        <div key={key} className="rating-item">
                                            <div className="rating-header">
                                                <span>{key.replace('_', ' ')}</span>
                                                <span>{value}%</span>
                                            </div>
                                            <div className="rating-bar">
                                                <div
                                                    className="rating-fill"
                                                    style={{ width: `${value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="report-card">
                                    <h3>Suggestions for Improvement</h3>
                                    <ul className="suggestion-list">
                                        {report?.suggestions.map((suggestion, index) => (
                                            <li key={index} className="suggestion-item">
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="report-card">
                                    <h3>Areas for Improvement</h3>
                                    <ul className="improvement-list">
                                        {report?.improvements.map((improvement, index) => (
                                            <li key={index} className="improvement-item">
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {jobData && <button
                                    className="download-button"
                                    onClick={handleApplyJob}
                                >
                                    <span>Submit interview results</span>
                                </button>}

                                <button
                                    className="download-button mt-2"
                                    onClick={downloadReport}
                                >
                                    <Download />
                                    <span>Download Report</span>
                                </button>
                            </>
                        )}
                    </div>
                )}


            </div>
        </div >
    );
};

export default CvUploader;