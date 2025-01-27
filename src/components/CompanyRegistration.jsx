// CompanyRegistration.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createCompanyProfile } from '../services/CompanyService';
import '../styles/CompanyRegistration.css'

const validationSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const CompanyRegistration = () => {
  return (
    <div className="modern-registration-container">
      <div className="registration-left">
        <div className="content-wrapper">
          <div className="brand-section">
            <h1>JobConnect</h1>
            <p className="brand-tagline">Where Great Companies Find Great Talent</p>
          </div>
          <div className="illustration-wrapper">
            <div className="floating-card">
              <div className="card-icon">🚀</div>
              <div className="card-text">Join 10,000+ companies already hiring</div>
            </div>
            <div className="floating-card delay-1">
              <div className="card-icon">📈</div>
              <div className="card-text">Access to AI-powered matching</div>
            </div>
            <div className="floating-card delay-2">
              <div className="card-icon">🎯</div>
              <div className="card-text">Smart analytics dashboard</div>
            </div>
          </div>
        </div>
      </div>

      <div className="registration-right">
        <div className="form-container">
          <h2>Create Company Account</h2>
          <p className="form-subtitle">Start hiring the best talent today</p>

          <Formik
            initialValues={{
              companyName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await createCompanyProfile(values);
                alert('Registration successful!');
              } catch (error) {
                alert('Registration failed. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="modern-form">
                <div className="form-group">
                  <label className="floating-label">Company Name</label>
                  <Field
                    type="text"
                    name="companyName"
                    className={`modern-input ${touched.companyName && errors.companyName ? 'has-error' : ''}`}
                    placeholder="Enter company name"
                  />
                  <ErrorMessage name="companyName" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="floating-label">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    className={`modern-input ${touched.email && errors.email ? 'has-error' : ''}`}
                    placeholder="Enter email address"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="floating-label">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className={`modern-input ${touched.password && errors.password ? 'has-error' : ''}`}
                    placeholder="Create password"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="floating-label">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className={`modern-input ${touched.confirmPassword && errors.confirmPassword ? 'has-error' : ''}`}
                    placeholder="Confirm password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="form-footer">
            <p>Already have an account? <a href="/login">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;