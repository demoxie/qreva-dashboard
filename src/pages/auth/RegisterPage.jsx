import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Mail, ShieldAlert } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const refToken = searchParams.get('ref') || '';
  const role = searchParams.get('role') || '';
  const hasValidInvite = role.toLowerCase() === 'aggregator' && refToken.length > 0;

  useEffect(() => {
    if (!hasValidInvite) return;
    sessionStorage.setItem('aggregatorInviteRef', refToken);
    sessionStorage.setItem('aggregatorInviteRole', role);
  }, [hasValidInvite, refToken, role]);

  return (
    <div className="min-h-screen bg-[#F7FAFA] flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-4 w-[152px]">
        <div className="h-10 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-10 h-10" />
        </div>
        <span className="text-[36px] font-medium text-[#084059] font-urbanist">Qreva</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg border border-[#E8EBED] shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          {hasValidInvite ? (
            <CheckCircle2 size={22} className="text-[#FF5B04]" />
          ) : (
            <ShieldAlert size={22} className="text-[#E85304]" />
          )}
          <h1 className="text-2xl font-urbanist font-bold text-[#1E1E1E]">
            Aggregator Invite
          </h1>
        </div>

        {hasValidInvite ? (
          <>
            <p className="text-sm text-[#505C61] font-general leading-relaxed mb-4">
              Your invite link is valid. Use the login details sent to your email to sign in.
              If your account requires it, you will be asked to change your password immediately after login.
            </p>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#FFF4EE] border border-[#FFCCB1] mb-5">
              <Mail size={18} className="text-[#FF5B04] mt-0.5 shrink-0" />
              <p className="text-xs text-[#B54103] font-general leading-relaxed">
                Check the invited email address for your temporary credentials before continuing.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full h-12 rounded-lg bg-[#FF5B04] text-white font-general font-semibold hover:bg-[#E54F03] transition-colors"
            >
              Continue to Login
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm text-[#505C61] font-general leading-relaxed mb-5">
              This invite link is missing a valid referral token or aggregator role.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full h-12 rounded-lg bg-[#FF5B04] text-white font-general font-semibold hover:bg-[#E54F03] transition-colors"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
