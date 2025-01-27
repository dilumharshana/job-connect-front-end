import React, { useState, useEffect } from 'react'; 
import { Formik, Form, Field, FieldArray } from 'formik'; 
import * as Yup from 'yup'; 
import '../styles/CreateJobPost.css'; 

const  initialValues = { 
    jobName:'',
    companyName:'',
    yearsOfExperience:"",
    jobLocation:'',
    salary:'',
    skills:'',
    qualifications: [''],
  };

const CreateJobPost = ({isEditMode = false,  }) => {
  
  const validationSchema = Yup.object({
    jobName: Yup.string().required('Job name is required'),
    companyName: Yup.string().required('Company name is required'),
    yearsOfExperience: Yup.number()
      .integer('Years of experience must be an integer')
      .positive('Years of experience must be a positive number')
      .required('Years of experience is required'),
    jobLocation: Yup.string().required('Job location is required'),
    salary: Yup.number()
      .positive('Salary must be a positive number')
      .required('Salary is required'),
    skills: Yup.string().required('Skills are required'),
    qualifications: Yup.array()
      .of(Yup.string().required('Qualification is required'))
      .min(1, 'At least one qualification is required'),
  });

  // Handle form submission (Create or Edit)
  const handleFormSubmit = async (values) => {
    try {
      // Pass data to the parent component or API call
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="create-job-post">
      <h1>{isEditMode ? 'Update Job' : 'Create a New Job'}</h1>

      <Formik
        initialValues={{
          jobName: initialValues.jobName || '',
          companyName: initialValues.companyName || '',
          yearsOfExperience: initialValues.yearsOfExperience || '',
          jobLocation: initialValues.jobLocation || '',
          salary: initialValues.salary || '',
          skills: initialValues.skills || '',
          qualifications: initialValues.qualifications || [''],  // Default to an empty array with one qualification
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="jobName">Job Name</label>
              <Field name="jobName" type="text" />
              {errors.jobName && touched.jobName && (
                <div className="error">{errors.jobName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <Field name="companyName" type="text" />
              {errors.companyName && touched.companyName && (
                <div className="error">{errors.companyName}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="yearsOfExperience">Years of Experience</label>
              <Field name="yearsOfExperience" type="number" />
              {errors.yearsOfExperience && touched.yearsOfExperience && (
                <div className="error">{errors.yearsOfExperience}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jobLocation">Job Location</label>
              <Field name="jobLocation" type="text" />
              {errors.jobLocation && touched.jobLocation && (
                <div className="error">{errors.jobLocation}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <Field name="salary" type="number" />
              {errors.salary && touched.salary && (
                <div className="error">{errors.salary}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <Field name="skills" type="text" />
              {errors.skills && touched.skills && (
                <div className="error">{errors.skills}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="qualifications">Qualifications</label>
              <FieldArray name="qualifications">
                {({ insert, remove, push }) => (
                  <div>
                    {values.qualifications && values.qualifications.length > 0 ? (
                      values.qualifications.map((qualification, index) => (
                        <div key={index} className="qualification-item">
                          <Field
                            name={`qualifications[${index}]`}
                            type="text"
                            placeholder="Enter qualification"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className="remove-button"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))
                    ) : null}
                    <button
                      type="button"
                      className="add-qualification-button"
                      onClick={() => push('')}
                    >
                      Add New Qualification
                    </button>
                    {errors.qualifications && touched.qualifications && (
                      <div className="error">{errors.qualifications}</div>
                    )}
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="create-button">
              {isEditMode ? 'Update Job' : 'Create Job'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateJobPost;
