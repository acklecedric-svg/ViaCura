/**
 * @krisspy-file
 * @type page
 * @name "LoginScreen"
 * @title "Login Screen"
 * @description "User authentication interface with role-based login"
 * @routes ["/login"]
 * @flowName "authentication"
 * @layout "AuthLayout"
 */

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Fingerprint, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | 'mfa' | 'admin' | null>(null);
  const [authMethod, setAuthMethod] = useState<'email' | 'biometric' | 'sms'>('email');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    { id: 'doctor', label: 'Doctor/Driver', icon: '👨‍⚕️', description: 'Doctor/Driver Cockpit' },
    { id: 'mfa', label: 'MFA Assistant', icon: '👩‍⚕️', description: 'Medical Field Assistant' },
    { id: 'patient', label: 'Patient', icon: '👤', description: 'Patient App' },
    { id: 'admin', label: 'Admin', icon: '⚙️', description: 'Admin Backend' },
  ];

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !selectedRole) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    // Mock authentication
    const dashboards: Record<string, string> = {
      doctor: '/doctor/dashboard',
      mfa: '/mfa/dashboard',
      patient: '/patient/home',
      admin: '/admin/dashboard',
    };

    navigate(dashboards[selectedRole]);
  };

  const handleBiometricAuth = () => {
    setError('');
    if (!selectedRole) {
      setError('Bitte wählen Sie eine Rolle');
      return;
    }

    // Mock biometric authentication
    const dashboards: Record<string, string> = {
      doctor: '/doctor/dashboard',
      mfa: '/mfa/dashboard',
      patient: '/patient/home',
      admin: '/admin/dashboard',
    };

    navigate(dashboards[selectedRole]);
  };

  const handleSmsOtp = () => {
    setError('');
    if (!phoneOtp) {
      setError('Bitte geben Sie den OTP ein');
      return;
    }

    const dashboards: Record<string, string> = {
      doctor: '/doctor/dashboard',
      mfa: '/mfa/dashboard',
      patient: '/patient/home',
      admin: '/admin/dashboard',
    };

    if (selectedRole) {
      navigate(dashboards[selectedRole]);
    }
  };

  return (
    <div className="w-full space-y-2xl">
      {/* Title Section */}
      <div className="text-center space-y-md">
        <h2 className="text-3xl font-bold text-primary">Willkommen zurück</h2>
        <p className="text-secondary">Melden Sie sich bei ViaCura+ an</p>
      </div>

      {/* Auth Method Selector */}
      <div className="flex gap-md justify-center">
        <button
          onClick={() => {
            setAuthMethod('email');
            setError('');
          }}
          className={`flex items-center gap-sm px-lg py-md rounded-lg transition-all ${
            authMethod === 'email'
              ? 'bg-blue text-white'
              : 'bg-tertiary text-secondary hover:bg-primary'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Email</span>
        </button>
        <button
          onClick={() => {
            setAuthMethod('biometric');
            setError('');
          }}
          className={`flex items-center gap-sm px-lg py-md rounded-lg transition-all ${
            authMethod === 'biometric'
              ? 'bg-blue text-white'
              : 'bg-tertiary text-secondary hover:bg-primary'
          }`}
        >
          <Fingerprint className="w-4 h-4" />
          <span className="text-sm">Biometrie</span>
        </button>
        <button
          onClick={() => {
            setAuthMethod('sms');
            setError('');
          }}
          className={`flex items-center gap-sm px-lg py-md rounded-lg transition-all ${
            authMethod === 'sms'
              ? 'bg-blue text-white'
              : 'bg-tertiary text-secondary hover:bg-primary'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span className="text-sm">SMS OTP</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-lg p-md flex gap-md">
          <div className="text-danger text-sm">{error}</div>
        </div>
      )}

      {/* Role Selection */}
      <div className="space-y-md">
        <label className="block text-sm font-semibold text-primary">Rolle wählen</label>
        <div className="grid grid-cols-2 gap-md">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id as any);
                setError('');
              }}
              className={`p-md rounded-lg transition-all border-2 ${
                selectedRole === role.id
                  ? 'border-blue bg-blue/10 text-primary'
                  : 'border-tertiary bg-tertiary text-secondary hover:border-blue/50'
              }`}
            >
              <div className="text-2xl mb-sm">{role.icon}</div>
              <div className="font-medium text-sm">{role.label}</div>
              <div className="text-xs text-secondary">{role.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Email/Password Form */}
      {authMethod === 'email' && (
        <form onSubmit={handleEmailLogin} className="space-y-lg">
          <div>
            <label className="block text-sm font-medium mb-md text-primary">Email oder Telefon</label>
            <div className="relative">
              <Mail className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
              <input
                type="text"
                placeholder="email@example.com oder +49..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-md text-primary">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ihr Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-xl pr-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-md top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Anmelden
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/reset-password')}
              className="text-blue hover:text-blue-hover text-sm transition-colors"
            >
              Passwort vergessen?
            </button>
          </div>
        </form>
      )}

      {/* Biometric Authentication */}
      {authMethod === 'biometric' && (
        <div className="space-y-lg">
          <div className="flex flex-col items-center py-2xl gap-lg">
            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center">
              <Fingerprint className="w-8 h-8 text-blue" />
            </div>
            <p className="text-secondary text-center">
              Verwenden Sie Ihren Fingerabdruck oder Gesichtserkennung zur Anmeldung
            </p>
          </div>
          <button
            onClick={handleBiometricAuth}
            className="btn btn-primary w-full"
          >
            Biometrie starten
          </button>
        </div>
      )}

      {/* SMS OTP */}
      {authMethod === 'sms' && (
        <div className="space-y-lg">
          {!otpStep ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-md text-primary">Telefonnummer</label>
                <div className="relative">
                  <Smartphone className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+49..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-xl"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  if (email) {
                    setOtpStep(true);
                    setError('');
                  } else {
                    setError('Bitte geben Sie eine Telefonnummer ein');
                  }
                }}
                className="btn btn-primary w-full"
              >
                OTP senden
              </button>
            </>
          ) : (
            <>
              <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg p-md text-center">
                <p className="text-sm text-secondary">
                  OTP wurde an <span className="text-primary font-medium">{email}</span> gesendet
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-md text-primary">6-stelliger Code</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value.slice(0, 6))}
                  maxLength={6}
                  className="input text-center text-2xl tracking-widest"
                />
              </div>
              <button
                onClick={handleSmsOtp}
                className="btn btn-primary w-full"
              >
                Verifizieren
              </button>
              <button
                onClick={() => {
                  setOtpStep(false);
                  setPhoneOtp('');
                  setError('');
                }}
                className="btn btn-ghost w-full"
              >
                Zurück
              </button>
            </>
          )}
        </div>
      )}

      {/* Sign Up Link */}
      <div className="text-center pt-md">
        <p className="text-secondary text-sm">
          Kein Konto?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue hover:text-blue-hover transition-colors font-medium"
          >
            Hier registrieren
          </button>
        </p>
      </div>
    </div>
  );
}
