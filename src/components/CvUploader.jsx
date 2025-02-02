import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import "../styles/cvUploader.css";

const CvUploader = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processingReport, setProcessingReport] = useState(false);
    const [experienceQuestions, setExperienceQuestions] = useState([]);
    const [skillQuestions, setSkillQuestions] = useState([]);
    const [currentSection, setCurrentSection] = useState('upload');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({
        experience: {},
        skills: {}
    });
    const [report, setReport] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData);
            const data = JSON.parse(response?.data?.data);
            setExperienceQuestions(data.experienceQuiz);
            setSkillQuestions(data.skillQuiz);
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
            const response = await axios.post('http://127.0.0.1:5000/submit-answers', {
                answers: {
                    experience: answers.experience,
                    skills: answers.skills
                }
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


    console.log("report =>", report);


    return (
        <div className="cv-uploader-container">
            <div className="cv-uploader-card">
                {currentSection === 'upload' && (
                    <div className="upload-section">
                        <h1 className="section-title">Upload Your CV</h1>
                        <p className="section-description">
                            Let's analyze your CV and prepare for your interview
                        </p>

                        <div className="upload-controls">
                            <label className="file-upload-label">
                                <div className="upload-icon">
                                    <i className="bi bi-cloud-upload"></i>
                                </div>
                                <span className="file-name">
                                    {file ? file.name : "Choose your CV or drag it here"}
                                </span>
                                <input
                                    type="file"
                                    className="file-input"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                            </label>

                            <button
                                className={`upload-button ${loading ? 'loading' : ''} ${!file ? 'disabled' : ''}`}
                                onClick={handleUpload}
                                disabled={!file || loading}
                            >
                                {loading ? (
                                    <div className="upload-loader">
                                        <div className="loader-spinner"></div>
                                        <span>Analyzing your CV...</span>
                                    </div>
                                ) : (
                                    "Start Interview"
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {(currentSection === 'experience' || currentSection === 'skills') && (
                    <div className="question-section">
                        <div className="section-indicator">
                            <span className={`indicator ${currentSection === 'experience' ? 'active' : ''}`}>
                                Experience
                            </span>
                            <span className="indicator-divider"></span>
                            <span className={`indicator ${currentSection === 'skills' ? 'active' : ''}`}>
                                Skills
                            </span>
                        </div>

                        <h2 className="question-header">
                            Question {currentQuestionIndex + 1} of {getCurrentQuestions().length}
                        </h2>

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
                                Skip Question
                            </button>

                            <div className="main-controls">
                                <button
                                    className={`nav-button prev ${currentQuestionIndex === 0 && currentSection === 'experience' ? 'disabled' : ''}`}
                                    onClick={handlePrevious}
                                    disabled={currentQuestionIndex === 0 && currentSection === 'experience'}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                    Previous
                                </button>

                                <button
                                    className="nav-button next"
                                    onClick={handleNext}
                                >
                                    {currentQuestionIndex === getCurrentQuestions().length - 1 && currentSection === 'skills' ?
                                        'Submit' : 'Next'}
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>

                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${(((currentSection === 'skills' ? experienceQuestions.length : 0) + currentQuestionIndex + 1) /
                                        (experienceQuestions.length + skillQuestions.length)) * 100}%`
                                }}
                            ></div>
                        </div>
                    </div>
                )}

                {currentSection === 'report' && report !== null && (
                    <div id="report-section" className="report-section">
                        {processingReport ? (
                            <div className="processing-report">
                                <div className="loader-spinner"></div>
                                <p>Generating your interview report?...</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="report-title">Interview Report</h2>

                                <div className="report-card ratings">
                                    <h3>Performance Ratings</h3>
                                    <div className="rating-item">
                                        <div className="rating-header">
                                            <span>Communication</span>
                                            <span>{report?.ratings.communication}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <div
                                                className="rating-fill"
                                                style={{ width: `${report?.ratings.communication}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="rating-item">
                                        <div className="rating-header">
                                            <span>Critical Thinking</span>
                                            <span>{report?.ratings.critical_thinking}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <div
                                                className="rating-fill"
                                                style={{ width: `${report?.ratings.critical_thinking}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="rating-item">
                                        <div className="rating-header">
                                            <span>Experience</span>
                                            <span>{report?.ratings.experience}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <div
                                                className="rating-fill"
                                                style={{ width: `${report?.ratings.experience}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="report-card suggestions">
                                    <h3>Suggestions for Improvement</h3>
                                    <ul className="suggestion-list">
                                        {report?.suggestions.map((suggestion, index) => (
                                            <li key={index} className="suggestion-item">
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="report-card improvements">
                                    <h3>Areas for Improvement</h3>
                                    <ul className="improvement-list">
                                        {report?.improvements.map((improvement, index) => (
                                            <li key={index} className="improvement-item">
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="download-button" onClick={downloadReport}>
                                    <i className="bi bi-download"></i>
                                    Download Report
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CvUploader;