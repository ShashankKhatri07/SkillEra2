
import React, { useState } from 'react';
import { UserRole, NewUser } from '../types';

interface AuthPageProps {
  role: UserRole;
  onLogin: (admissionNumber: string) => void;
  onSignUp: (newUserData: NewUser) => void;
  onAdminLogin: (email: string, pass: string) => void;
}

const InputField: React.FC<{ label: string; type: string; placeholder: string; id: string; required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, type, placeholder, id, required = true, value, onChange }) => (
  <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input 
          type={type} 
          id={id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 placeholder-gray-400" 
          placeholder={placeholder} 
          required={required} 
          value={value}
          onChange={onChange}
      />
  </div>
);

const AuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const backgroundImageUrl = 'https://www.apsjodhpur.com/webdata/slider/6bdb8d0d5f3b595d3b341654b2a03f28.png';
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md border border-indigo-500/20 rounded-2xl shadow-lg shadow-indigo-500/10 p-8">
            {children}
        </div>
      </div>
    );
};

const AuthPage: React.FC<AuthPageProps> = ({ role, onLogin, onSignUp, onAdminLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Form State
  const [username, setUsername] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [classNum, setClassNum] = useState('');
  const [section, setSection] = useState('');
  const [schoolEmailPrefix, setSchoolEmailPrefix] = useState('');
  const [phone, setPhone] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [password, setPassword] = useState('');
  // Admin form state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === UserRole.ADMIN) {
      onAdminLogin(adminEmail, adminPassword);
      return;
    }

    if (isLogin) {
      onLogin(admissionNumber);
    } else {
      const newUserData: NewUser = {
        username,
        admissionNumber,
        class: classNum,
        section,
        schoolEmail: `${schoolEmailPrefix}@apsjodhpur.com`,
        phone,
        personalEmail,
      };
      onSignUp(newUserData);
    }
  };

  // Admin Login View
  if (role === UserRole.ADMIN) {
    return (
        <AuthContainer>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                Admin Portal
            </h2>
            <p className="text-center text-gray-600 mb-6">
                Please log in to continue.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <InputField label="Email" type="email" placeholder="admin@apsjodhpur.com" id="login-email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                <InputField label="Password" type="password" placeholder="••••••••" id="login-password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                <button 
                    type="submit" 
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </AuthContainer>
    );
  }

  // Student Login/Signup View
  return (
    <AuthContainer>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Student Portal
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isLogin ? 'Welcome back!' : 'Create your account'}
        </p>

        <div className="flex border-b border-gray-200 mb-6">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`w-1/2 py-3 text-sm font-medium transition-colors duration-300 ${isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={`w-1/2 py-3 text-sm font-medium transition-colors duration-300 ${!isLogin ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <InputField label="Admission Number" type="text" placeholder="S12345" id="login-admission" value={admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)} />
              <InputField label="Password" type="password" placeholder="••••••••" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </>
          ) : (
            <>
              <InputField label="Username" type="text" placeholder="Alex Doe" id="signup-username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <InputField label="Admission Number" type="text" placeholder="S12345" id="signup-admission" value={admissionNumber} onChange={(e) => setAdmissionNumber(e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Class" type="text" placeholder="10" id="signup-class" value={classNum} onChange={(e) => setClassNum(e.target.value)} />
                <InputField label="Section" type="text" placeholder="A" id="signup-section" value={section} onChange={(e) => setSection(e.target.value)} />
              </div>
              
              <div>
                  <label htmlFor="signup-school-email" className="block mb-2 text-sm font-medium text-gray-700">School Email</label>
                  <div className="flex">
                      <input 
                          type="text" 
                          id="signup-school-email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 placeholder-gray-400" 
                          placeholder="admission.number" 
                          required 
                          value={schoolEmailPrefix}
                          onChange={(e) => setSchoolEmailPrefix(e.target.value)}
                      />
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                          @apsjodhpur.com
                      </span>
                  </div>
              </div>

              <InputField label="Phone Number" type="tel" placeholder="9876543210" id="signup-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <InputField label="Personal Email (Optional)" type="email" placeholder="example@gmail.com" id="signup-personal-email" required={false} value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} />
              <InputField label="Password" type="password" placeholder="••••••••" id="signup-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </>
          )}

          <button 
            type="submit" 
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors duration-300"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
    </AuthContainer>
  );
};

export default AuthPage;