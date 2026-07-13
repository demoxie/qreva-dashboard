import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { useLogin, useForgotPassword, useResetPassword } from '../../store/features/auth/useAuth';
import { handleError } from '@/store/utils/handleError';
import { loginSchema, forgotPasswordSchema, resetPasswordSchema } from './schema';
import { getInputBorderColor, getFloatingLabelClasses } from './utils/inputHelpers';
import { inputStyles, buttonStyles, iconButtonStyles } from './utils/inputStyles';

const ForgotPasswordEmailForm = ({ onSent, onCancel }) => {
  const forgotPassword = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onTouched',
  });
  const email = watch('email');

  const onSubmit = async (data) => {
    try {
      const response = await forgotPassword.mutateAsync({ emailAddress: data.email });
      onSent({ email: data.email, temporaryId: response?.data?.temporaryId });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-[#808C91] font-general">
        Enter the email address linked to your admin account and we'll send you a one-time code to reset your password.
      </p>
      <div className="relative">
        <input
          type="email"
          id="forgotEmail"
          {...register('email')}
          disabled={forgotPassword.isPending}
          className={`${inputStyles.base} ${getInputBorderColor(errors.email, touchedFields.email, email)}`}
          placeholder=" "
        />
        <label htmlFor="forgotEmail" className={getFloatingLabelClasses(email)}>
          Email Address
        </label>
        {errors.email && touchedFields.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || forgotPassword.isPending}
        className={buttonStyles.primary(isValid, forgotPassword.isPending)}
      >
        {forgotPassword.isPending ? 'Sending code...' : 'Send Reset Code'}
      </Button>

      <button
        type="button"
        onClick={onCancel}
        disabled={forgotPassword.isPending}
        className={`${buttonStyles.link} w-full text-center`}
      >
        Back to login
      </button>
    </form>
  );
};

const ResetPasswordForm = ({ email, temporaryId, onSuccess, onCancel, onResend }) => {
  const resetPassword = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
  });
  const otp = watch('otp');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data) => {
    try {
      await resetPassword.mutateAsync({
        temporaryId,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      onSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-[#808C91] font-general">
        We sent a code to <span className="font-semibold text-[#1E1E1E]">{email}</span>. Enter it below with your new password.
      </p>

      <div className="relative">
        <input
          type="text"
          id="otp"
          {...register('otp')}
          disabled={resetPassword.isPending}
          className={`${inputStyles.base} ${getInputBorderColor(errors.otp, touchedFields.otp, otp)}`}
          placeholder=" "
        />
        <label htmlFor="otp" className={getFloatingLabelClasses(otp)}>
          Enter OTP
        </label>
        {errors.otp && touchedFields.otp && (
          <p className="text-xs text-red-500 mt-1">{errors.otp.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="newPassword"
          {...register('newPassword')}
          disabled={resetPassword.isPending}
          className={`${inputStyles.withIcon} ${getInputBorderColor(errors.newPassword, touchedFields.newPassword, newPassword)}`}
          placeholder=" "
        />
        <label htmlFor="newPassword" className={getFloatingLabelClasses(newPassword)}>
          New Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={resetPassword.isPending}
          className={iconButtonStyles}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.newPassword && touchedFields.newPassword && (
          <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          {...register('confirmPassword')}
          disabled={resetPassword.isPending}
          className={`${inputStyles.base} ${getInputBorderColor(errors.confirmPassword, touchedFields.confirmPassword, confirmPassword)}`}
          placeholder=" "
        />
        <label htmlFor="confirmPassword" className={getFloatingLabelClasses(confirmPassword)}>
          Confirm New Password
        </label>
        {errors.confirmPassword && touchedFields.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || resetPassword.isPending}
        className={buttonStyles.primary(isValid, resetPassword.isPending)}
      >
        {resetPassword.isPending ? 'Resetting password...' : 'Reset Password'}
      </Button>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onResend}
          disabled={resetPassword.isPending}
          className={buttonStyles.link}
        >
          Resend code
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={resetPassword.isPending}
          className={buttonStyles.link}
        >
          Back to login
        </button>
      </div>
    </form>
  );
};

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'forgot-email' | 'forgot-reset'
  const [resetContext, setResetContext] = useState(null);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      loginAs: 'admin',
    },
  });

  const email = watch('email');
  const password = watch('password');
  const loginAs = watch('loginAs');

  const onSubmit = async (data) => {
    try {
      const response = await login.mutateAsync({
        emailAddress: data.email,
        password: data.password,
        loginAs: data.loginAs,
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
        permissions: admin.permissions || [],
        mustChangePassword: mustChangePassword,
        status: admin.status,
      });

    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    setMode('forgot-email');
  };

  const handleForgotPasswordSent = (context) => {
    setResetContext(context);
    setMode('forgot-reset');
  };

  const handleResetSuccess = () => {
    setResetContext(null);
    setMode('login');
  };

  const handleCancelReset = () => {
    setResetContext(null);
    setMode('login');
  };

  const headerCopy = {
    login: {
      title: 'Sign in with your registered email',
      subtitle: 'Use your registered email to sign in to your dashboard',
    },
    'forgot-email': {
      title: 'Reset your password',
      subtitle: "We'll email you a one-time code to verify it's you",
    },
    'forgot-reset': {
      title: 'Enter your new password',
      subtitle: 'Check your inbox for the reset code',
    },
  }[mode];

  return (
    <div className="min-h-screen bg-[#F7FAFA] flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex w-full max-w-[220px] items-center justify-center gap-2">
        <div className="h-10 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>
        <span className="font-urbanist text-[32px] font-medium text-[#084059] sm:text-[36px]">Qreva</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-urbanist font-bold leading-[120%] tracking-tight text-[#1E1E1E]">
            {headerCopy.title}
          </CardTitle>
          <p className="text-sm text-center text-[#808C91] font-general leading-[145%]">
            {headerCopy.subtitle}
          </p>
        </CardHeader>

        <CardContent>
          {mode === 'forgot-email' && (
            <ForgotPasswordEmailForm onSent={handleForgotPasswordSent} onCancel={handleCancelReset} />
          )}

          {mode === 'forgot-reset' && (
            <ResetPasswordForm
              email={resetContext?.email}
              temporaryId={resetContext?.temporaryId}
              onSuccess={handleResetSuccess}
              onCancel={handleCancelReset}
              onResend={() => setMode('forgot-email')}
            />
          )}

          {mode === 'login' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <select
                id="loginAs"
                {...register('loginAs')}
                disabled={login.isPending}
                className={`${inputStyles.base} ${getInputBorderColor(
                  errors.loginAs,
                  touchedFields.loginAs,
                  loginAs
                )}`}
              >
                <option value="admin">Login as Admin</option>
                <option value="aggregator">Login as Aggregator</option>
                <option value="aggregator_manager">Login as Aggregator Manager</option>
              </select>
              {errors.loginAs && touchedFields.loginAs && (
                <p className="text-xs text-red-500 mt-1">{errors.loginAs.message}</p>
              )}
            </div>

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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
