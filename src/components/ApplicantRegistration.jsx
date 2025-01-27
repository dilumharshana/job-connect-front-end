// ApplicantRegistration.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {registerApplicant} from '../services/ApplicantService'
import '../styles/ApplicantRegistration.css';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
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

const ApplicantRegistration = () => {
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { confirmPassword, ...applicantData } = values;
      await registerApplicant(applicantData);
      resetForm();
      alert('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      alert('Error during registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="applicant-registration-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Join our platform to find your dream job</p>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="auth-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  placeholder="Create a password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="auth-footer">
                Already have an account? <a href="/login">Sign in</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplicantRegistration;