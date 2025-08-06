import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const AuthenticationPage = () => {
  const [loginType, setLoginType] = useState('user');
  const [formMode, setFormMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    keepSignedIn: false,
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { score, text: 'Weak', color: '#ef4444' };
    if (score <= 3) return { score, text: 'Medium', color: '#f59e0b' };
    return { score, text: 'Strong', color: '#10b981' };
  };

  const validateForm = () => {
    const newErrors = {};

    if (formMode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formMode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formMode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Please accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Form submitted:', { loginType, formMode, formData });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Icon components as inline SVGs
  const ArrowLeftIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const TriangleIcon = () => (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2l10 18H2L12 2z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  const LoaderIcon = () => (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            <ArrowLeftIcon />
          </button>
          </Link>
          
          <div className="flex items-center gap-2">
           
            <span className="text-xl font-bold text-gray-900">LoanPredict</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Authentication Card */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Login Type Tabs */}
            <div className="flex border-b  border-gray-200">
              <button
                onClick={() => setLoginType('user')}
                className={`flex-1 cursor-pointer py-4 px-6 text-sm font-medium transition-colors ${
                  loginType === 'user'
                    ? 'text-green-500 cursor-pointer border-b-2 border-green-500 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                User Login
              </button>
              <button
                onClick={() => setLoginType('employee')}
                className={`flex-1 cursor-pointer py-4 px-6 text-sm font-medium transition-colors ${
                  loginType === 'employee'
                    ? 'text-green-500 cursor-pointer border-b-2 border-green-500 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Employee Login
              </button>
            </div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center space-y-2 mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {loginType === 'user' ? 'User' : 'Employee'} {formMode === 'login' ? 'Login' : 'Sign Up'}
                </h1>
                <p className="text-gray-600">
                  {formMode === 'login' 
                    ? `Welcome back. Enter your ${loginType} credentials to access your account`
                    : `Create your ${loginType} account to get started`
                  }
                </p>
              </div>

              {/* Form Mode Toggle */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setFormMode('login')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      formMode === 'login'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setFormMode('signup')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      formMode === 'signup'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                  {/* Full Name Field (Sign Up Only) */}
                  {formMode === 'signup' && (
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium text-gray-900">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName}</p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-gray-900">
                        Password
                      </label>
                      {formMode === 'login' && (
                        <button
                          type="button"
                          className="text-sm cursor-pointer text-green-500 hover:text-green-700 transition-colors"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full h-12 px-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>

                    {/* Password Strength Indicator (Sign Up Only) */}
                    {formMode === 'signup' && formData.password && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(passwordStrength.score / 5) * 100}%`,
                                backgroundColor: passwordStrength.color
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {passwordStrength.text}
                          </span>
                        </div>
                      </div>
                    )}

                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field (Sign Up Only) */}
                  {formMode === 'signup' && (
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-900">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full h-12 px-3 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}

                  {/* Keep me signed in / Terms */}
                  <div className="space-y-3">
                    {formMode === 'login' ? (
                      <div className="flex items-center  space-x-2">
                        <input
                          id="keep-signed-in"
                          type="checkbox"
                          checked={formData.keepSignedIn}
                          onChange={(e) => handleInputChange('keepSignedIn', e.target.checked)}
                          className="w-4 h-4 rounded-full text-green-600 border-gray-300 focus:ring-green-500 appearance-none border-2 checked:bg-green-600 checked:border-none"
                        />
                        <label
                          htmlFor="keep-signed-in"
                          className="text-sm text-gray-900 cursor-pointer"
                        >
                          Keep me signed in
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <input
                            id="accept-terms"
                            type="checkbox"
                            checked={formData.acceptTerms}
                            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                            className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 ${
                              errors.acceptTerms ? 'border-red-500' : ''
                            }`}
                          />
                          <label
                            htmlFor="accept-terms"
                            className="text-sm text-gray-900 cursor-pointer leading-relaxed"
                          >
                            I agree to the{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                              Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                        {errors.acceptTerms && (
                          <p className="text-sm text-red-500 ml-6">
                            {errors.acceptTerms}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 text-base font-semibold bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <LoaderIcon />
                        <span className="ml-2">
                          {formMode === 'login' ? 'Signing in...' : 'Creating account...'}
                        </span>
                      </>
                    ) : (
                      formMode === 'login' ? 'Continue' : 'Create Account'
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    or {formMode === 'login' ? 'sign in' : 'sign up'} with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button className="h-12 border cursor-pointer border-gray-300 rounded-md hover:bg-emerald-50 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Google</span>
                </button>

                <button className="h-12 border cursor-pointer border-gray-300 rounded-md hover:bg-emerald-50 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.13997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Apple</span>
                </button>

                <button className="h-12 cursor-pointer border border-gray-300 rounded-md hover:bg-emerald-50 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
              </div>

              {/* Footer Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {formMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => setFormMode(formMode === 'login' ? 'signup' : 'login')}
                    className="text-emerald-600 hover:emerald-700 font-medium transition-colors cursor-pointer"
                  >
                    {formMode === 'login' ? 'Sign up here' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
