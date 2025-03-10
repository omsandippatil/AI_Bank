import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TextQuery.css';

const SupportRequestForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    description: ''
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);
  const [charCount, setCharCount] = useState(0);

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update character count for description
    if (name === 'description') {
      setCharCount(value.length);
    }
    
    // Clear related error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Indian phone number validation
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Indian phone number';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description is too short (minimum 20 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Using axios to call the API route instead of direct function import
      const response = await axios.post('/workspaces/AI_Bank/Backend/routes/textQuery.js', formData);
      const result = response.data;
      
      setSubmitResult(result);
      
      if (result.success) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          subject: '',
          description: ''
        });
        setCharCount(0);
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      setSubmitResult({
        success: false,
        analysis: {
          solution: 'An unexpected error occurred. Please try again later.'
        }
      });
    } finally {
      setLoading(false);
      // Scroll to results
      if (document.getElementById('result-section')) {
        document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="support-container">
      <div className="support-card">
        <div className="support-header">
          <h2>Customer Support</h2>
          <p>Please fill out the form below to submit your support request.</p>
        </div>

        <form className="support-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
              disabled={loading}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
                disabled={loading}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
                placeholder="+91 or 10-digit number"
                disabled={loading}
              />
              {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is your request about?"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description <span className="required">*</span>
              <span className="char-count">{charCount} characters</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Please describe your issue in detail..."
              rows="5"
              disabled={loading}
            ></textarea>
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span> Processing...
              </span>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      </div>

      {submitResult && (
        <div 
          id="result-section" 
          className={`result-card ${submitResult.success ? 'success' : 'error'}`}
        >
          <div className="result-header">
            <div className={`result-icon ${submitResult.success ? 'success-icon' : 'error-icon'}`}>
              {submitResult.success ? '✓' : '!'}
            </div>
            <h3>{submitResult.success ? 'Request Submitted Successfully' : 'Submission Error'}</h3>
          </div>

          <div className="result-body">
            {submitResult.success ? (
              <>
                <p className="ticket-info">
                  Your ticket ID: <strong>{submitResult.ticketId}</strong>
                </p>
                
                <div className="analysis-info">
                  <p>We've analyzed your request:</p>
                  <ul>
                    <li><span>Category:</span> {submitResult.analysis.category}</li>
                    <li><span>Priority:</span> {submitResult.analysis.priority}</li>
                    <li>
                      <span>Department:</span> {submitResult.analysis.department}
                    </li>
                  </ul>
                  
                  <div className="solution-box">
                    <h4>Our Solution</h4>
                    <p>{submitResult.analysis.solution}</p>
                  </div>
                  
                  {submitResult.callInitiated && (
                    <div className="call-info">
                      <p>
                        <strong>We're calling you!</strong> A support representative is 
                        attempting to reach you at your provided phone number.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="error-details">
                <p>{submitResult.analysis?.solution || 'Please try again later.'}</p>
              </div>
            )}
          </div>
          
          {submitResult.success && (
            <div className="result-footer">
              <p>Thank you for contacting us. We'll keep you updated on your request status.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportRequestForm;