import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { useLogin } from '../../store/features/auth/useAuth';
import { handleError } from '@/store/utils/handleError';
import { loginSchema } from './schema';
import { getInputBorderColor, getFloatingLabelClasses } from './utils/inputHelpers';
import { inputStyles, buttonStyles, iconButtonStyles } from './utils/inputStyles';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await login.mutateAsync({
        emailAddress: data.email,
        password: data.password,
      });

      // Extract admin data from response
      const { token, admin, mustChangePassword } = response?.data;

      // Pass formatted user data to parent component
      onLogin({
        username: `${admin.firstName} ${admin.lastName}`,
        email: admin.emailAddress,
        role: admin.role,
        token: token,
        userId: admin._id,
        mustChangePassword: mustChangePassword,
        status: admin.status,
      });

    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    alert('Forgot password functionality will be implemented');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4 w-[152px]">
        <div className="h-10 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10" />
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email')}
                disabled={login.isPending}
                className={`${inputStyles.base} ${getInputBorderColor(
                  errors.email,
                  touchedFields.email,
                  email
                )}`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={getFloatingLabelClasses(email)}
              >
                Email Address
              </label>
              {errors.email && touchedFields.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                disabled={login.isPending}
                className={`${inputStyles.withIcon} ${getInputBorderColor(
                  errors.password,
                  touchedFields.password,
                  password
                )}`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={getFloatingLabelClasses(password)}
              >
                Enter your password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={login.isPending}
                className={iconButtonStyles}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && touchedFields.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={login.isPending}
                className={buttonStyles.link}
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={!isValid || login.isPending}
              className={buttonStyles.primary(isValid, login.isPending)}
            >
              {login.isPending ? (
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;