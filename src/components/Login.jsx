import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
    vendorType: '',
    coAdminType: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    { value: 'user', label: 'User', description: 'Regular user booking venues and services' },
    { value: 'vendor-hall', label: 'Vendor - Hall', description: 'Hall/venue owner managing bookings' },
    { value: 'vendor-services', label: 'Vendor - Services', description: 'Service provider managing offerings' },
    { value: 'master-admin', label: 'Master-Admin', description: 'System administrator with full access' },
    { value: 'manager', label: 'Manager', description: 'Business manager with oversight capabilities' }
  ]

  const vendorTypes = [
    { value: 'admin', label: 'Admin', description: 'Administrator with full access to vendor account' },
    { value: 'manager', label: 'Manager', description: 'Manager with oversight capabilities for vendor account' }
  ]

  const coAdminTypes = [
    { value: 'co-admin', label: 'Co-Admin', description: 'Co-administrator with administrative privileges' },
    { value: 'assistant-admin', label: 'Assistant Admin', description: 'Assistant administrator with limited administrative access' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Reset vendorType when role changes to non-vendor
    if (name === 'role' && !['vendor-hall', 'vendor-services'].includes(value)) {
      setFormData(prev => ({
        ...prev,
        vendorType: ''
      }))
    }
    // Reset coAdminType when role changes to non-master-admin
    if (name === 'role' && value !== 'master-admin') {
      setFormData(prev => ({
        ...prev,
        coAdminType: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    // Validate vendorType for vendor roles
    if (['vendor-hall', 'vendor-services'].includes(formData.role) && !formData.vendorType) {
      newErrors.vendorType = 'Please select your vendor type'
    }

    // Validate coAdminType for master-admin role
    if (formData.role === 'master-admin' && !formData.coAdminType) {
      newErrors.coAdminType = 'Please select your co-admin type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call - replace with actual authentication logic
      console.log('Login attempt:', formData)
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Handle successful login based on role
      switch (formData.role) {
        case 'user':
          console.log('User logged in successfully')
          break
        case 'vendor-hall':
          console.log('Vendor Hall logged in successfully', { vendorType: formData.vendorType })
          break
        case 'vendor-services':
          console.log('Vendor Services logged in successfully', { vendorType: formData.vendorType })
          break
        case 'master-admin':
          console.log('Master-Admin logged in successfully', { coAdminType: formData.coAdminType })
          break
        case 'manager':
          console.log('Manager logged in successfully')
          break
        default:
          console.log('Unknown role logged in')
      }
      
      // Reset form after successful login
      setFormData({
        email: '',
        password: '',
        role: 'user',
        vendorType: '',
        coAdminType: ''
      })
      
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={errors.role ? 'error' : ''}
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
            <div className="role-description">
              {roles.find(r => r.value === formData.role)?.description}
            </div>
          </div>

          {/* Conditional Vendor Type Field */}
          {['vendor-hall', 'vendor-services'].includes(formData.role) && (
            <div className="form-group">
              <label htmlFor="vendorType">Vendor Type</label>
              <select
                id="vendorType"
                name="vendorType"
                value={formData.vendorType}
                onChange={handleInputChange}
                className={errors.vendorType ? 'error' : ''}
              >
                <option value="">Select your vendor type</option>
                {vendorTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.vendorType && <span className="error-text">{errors.vendorType}</span>}
              <div className="role-description">
                {vendorTypes.find(t => t.value === formData.vendorType)?.description}
              </div>
            </div>
          )}

          {/* Conditional Co-Admin Type Field */}
          {formData.role === 'master-admin' && (
            <div className="form-group">
              <label htmlFor="coAdminType">Co-Admin Type</label>
              <select
                id="coAdminType"
                name="coAdminType"
                value={formData.coAdminType}
                onChange={handleInputChange}
                className={errors.coAdminType ? 'error' : ''}
              >
                <option value="">Select your co-admin type</option>
                {coAdminTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.coAdminType && <span className="error-text">{errors.coAdminType}</span>}
              <div className="role-description">
                {coAdminTypes.find(t => t.value === formData.coAdminType)?.description}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login