import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const LoginPage = ({ onLogin, ROLES }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  // Check if email is valid
  const isEmailValid = () => {
    return credentials.email && !validateEmail(credentials.email);
  };

  // Check if password is valid
  const isPasswordValid = () => {
    return credentials.password && !validatePassword(credentials.password);
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setCredentials({ ...credentials, email });
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setCredentials({ ...credentials, password });
    
    // Clear error when user starts typing
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  // Handle email blur (validate on blur)
  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true });
    const emailError = validateEmail(credentials.email);
    setErrors({ ...errors, email: emailError });
  };

  // Handle password blur
  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    const passwordError = validatePassword(credentials.password);
    setErrors({ ...errors, password: passwordError });
  };

  // Check if form is valid
  const isFormValid = () => {
    const emailError = validateEmail(credentials.email);
    const passwordError = validatePassword(credentials.password);
    return !emailError && !passwordError;
  };

  // Get border color based on validation state
  const getEmailBorderColor = () => {
    if (errors.email && touched.email) return 'border-red-500 focus:ring-red-500';
    if (isEmailValid() && touched.email) return 'border-green-500 focus:ring-green-500';
    return 'border-gray-300 focus:ring-orange-500';
  };

  const getPasswordBorderColor = () => {
    if (errors.password && touched.password) return 'border-red-500 focus:ring-red-500';
    if (isPasswordValid() && touched.password) return 'border-green-500 focus:ring-green-500';
    return 'border-gray-300 focus:ring-orange-500';
  };

  // Simulate backend authentication
  const authenticateUser = async (email, password) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // ============ MANUAL ROLE ASSIGNMENT (Simulating Backend Response) ============
    // TODO: Replace this with actual backend API call
    
    // Mock user database - Change the role here to test different user types
    const mockUsers = {
      'admin@qreva.com': { role: ROLES.ADMIN, name: 'Admin User' },
      'agent@qreva.com': { role: ROLES.AGENT, name: 'Agent User' },
      'aggregator@qreva.com': { role: ROLES.AGGREGATOR, name: 'Aggregator User' },
      'manager@qreva.com': { role: ROLES.AGGREGATORMANAGER, name: 'Manager User' },
    };

    // Default role if email not in mock database
    const defaultUser = { role: ROLES.ADMIN, name: 'Default User' };

    // Return user with role (simulating backend response)
    const user = mockUsers[email] || defaultUser;
    localStorage.setItem('userRole', user.role); // Store role in localStorage
    return {
      success: true,
      data: {
        email: email,
        username: user.name,
        role: user.role,
        token: 'mock-jwt-token-' + Date.now(), // Simulate JWT token
      },
      
    };
  };

  // Handle submit
  const handleSubmit = async () => {
    // Validate form
    const emailError = validateEmail(credentials.email);
    const passwordError = validatePassword(credentials.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate backend authentication
      const response = await authenticateUser(credentials.email, credentials.password);

      if (response.success) {
        // Call onLogin with user data from "backend"
        onLogin({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          token: response.data.token,
        });
      }
    } catch (error) {
      setErrors({ 
        email: '', 
        password: 'Invalid credentials. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password clicked');
    alert('Forgot password functionality will be implemented');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isFormValid()) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4 w-[152px]">
        <div className="h-10 flex items-center justify-center">
          <span className="text-white font-bold">
            <img src={logo} alt="Logo" className="w-10 h-10" />
          </span>
        </div>
        <span className="text-[36px] font-medium text-[#084059] font-urbanist">Qreva</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-urbanist font-bold leading-[120%] tracking-tight text-[#1E1E1E]">
            Sign in with your registered email
          </CardTitle>
          <p className="text-sm text-center text-[#808C91] font-general leading-[145%]">
            Use your registered email to sign in to your dashboard
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Email Input with Floating Label */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={credentials.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                onKeyPress={handleKeyPress}
                className={`
                  peer w-full h-14 px-4 pt-6 pb-2 
                  border-2 rounded-md 
                  outline-none transition-all
                  ${getEmailBorderColor()}
                  focus:border-2
                `}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`
                  absolute left-4 transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-600
                  ${credentials.email ? 'top-2 text-xs text-gray-600' : 'top-4 text-base text-gray-400'}
                `}
              >
                Email Address
              </label>
              {errors.email && touched.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input with Floating Label and Toggle */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={credentials.password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                onKeyPress={handleKeyPress}
                className={`
                  peer w-full h-14 px-4 pt-6 pb-2 pr-12
                  border-2 rounded-md 
                  outline-none transition-all
                  ${getPasswordBorderColor()}
                  focus:border-2
                `}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`
                  absolute left-4 transition-all duration-200 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-600
                  ${credentials.password ? 'top-2 text-xs text-gray-600' : 'top-4 text-base text-gray-400'}
                `}
              >
                Enter your password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && touched.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#B0B7C3] font-general underline font-semibold leading-[145%] hover:text-gray-600"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isLoading}
              className={`w-full h-12 text-base font-semibold transition-all ${
                isFormValid() && !isLoading
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </Button>

            {/* Development Helper - Remove in production */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 font-semibold mb-2"> Development Mode - Test Accounts:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Admin:</strong> admin@qreva.com (any password)</p>
                <p><strong>Agent:</strong> agent@qreva.com (any password)</p>
                <p><strong>Aggregator:</strong> aggregator@qreva.com (any password)</p>
                <p><strong>Manager:</strong> manager@qreva.com (any password)</p>
                <p className="text-blue-600 mt-2"> Any other email will login as Admin by default</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;