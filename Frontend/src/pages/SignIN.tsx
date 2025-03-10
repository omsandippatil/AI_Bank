import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Define the Timeout type to fix NodeJS.Timeout error
type Timeout = ReturnType<typeof setTimeout>;

const SCAN_LINES = 8;
const SCAN_DURATION = 2000;

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const scannerRef = useRef<HTMLDivElement>(null);
  // Fix the useRef initialization error by providing null as initialValue
  const scanIntervalRef = useRef<Timeout | undefined>(undefined);

  useEffect(() => {
    if (isFaceScanning && scannerRef.current) {
      const chart = echarts.init(scannerRef.current);
      const generateScanLines = () => {
        return Array.from({ length: SCAN_LINES }).map((_, index) => ({
          value: 100 / SCAN_LINES,
          itemStyle: {
            color: index % 2 === 0 ? '#4F46E5' : 'rgba(79, 70, 229, 0.3)'
          }
        }));
      };

      const option = {
        series: [
          {
            name: 'Scanner',
            type: 'pie',
            radius: ['80%', '90%'],
            animation: false,
            silent: true,
            data: generateScanLines(),
            label: { show: false },
            startAngle: scanProgress * 360,
          },
          {
            name: 'Progress',
            type: 'pie',
            radius: ['92%', '94%'],
            animation: false,
            silent: true,
            data: [
              { value: scanProgress * 100, itemStyle: { color: '#4F46E5' } },
              { value: 100 - (scanProgress * 100), itemStyle: { color: '#E5E7EB' } }
            ],
            label: { show: false }
          }
        ]
      };
      chart.setOption(option);
      return () => chart.dispose();
    }
  }, [isFaceScanning, scanProgress]);

  useEffect(() => {
    if (isFaceScanning) {
      setScanProgress(0);
      scanIntervalRef.current = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + (1 / (SCAN_DURATION / 100));
          if (next >= 1) {
            if (scanIntervalRef.current) {
              clearInterval(scanIntervalRef.current);
            }
            return 1;
          }
          return next;
        });
      }, 100);
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
      setScanProgress(0);
    }
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isFaceScanning]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFaceScanning && !phone) {
      alert('Please complete face authentication and enter phone number');
      return;
    }
    if (!phone) {
      alert('Please enter phone number');
      return;
    }
    if (!isFaceScanning) {
      alert('Please complete face authentication');
      return;
    }
    // Handle form submission
    console.log('Form submitted successfully');
  };

  const toggleFaceScanning = () => {
    setIsFaceScanning(!isFaceScanning);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800' : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-purple-50'}`}>
      <div className="w-[1440px] min-h-[1024px] flex">
        {/* Left Section - Hero Image */}
        <div className="w-[40%] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent z-10"></div>
          <img
            src="https://public.readdy.ai/ai/img_res/7555ef7ce3c21c98328e3c629f8be1b6.jpg"
            alt="Banking Illustration"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="text-white space-y-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <h2 className="text-2xl font-bold">Next Generation Banking</h2>
              <p className="text-gray-200">Secure • Fast • Innovative</p>
            </div>
          </div>
        </div>
        {/* Right Section - Auth Form */}
        <div className={`w-[60%] backdrop-blur-xl p-16 flex flex-col justify-center relative ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/70'} before:absolute before:inset-0 before:bg-gradient-to-br ${isDarkMode ? 'before:from-indigo-900/10 before:to-purple-900/10' : 'before:from-indigo-100/30 before:to-purple-100/30'} before:pointer-events-none`}>
          <div className="max-w-md mx-auto w-full">
            {/* Theme Toggle */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-3 !rounded-button backdrop-blur-sm transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50' : 'bg-white/50 text-gray-600 hover:bg-white/70'}`}
              >
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </div>
            {/* Logo */}
            <div className="mb-12 relative">
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl"></div>
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent relative">
                NexusBank
                <span className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/20 via-blue-500/20 to-purple-500/20 blur-sm"></span>
              </h1>
              <p className={`mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Experience the future of banking</p>
            </div>
            {/* Auth Tabs */}
            <div className="flex mb-8 space-x-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 py-3 text-center transition-all duration-300 hover:shadow-lg ${isLogin ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white' : 'bg-gray-100/70 hover:bg-gray-200/70 text-gray-600'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 py-3 text-center transition-all ${!isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                Sign Up
              </button>
            </div>
            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                <div className="relative">
                  <i className="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 !rounded-button transition-all duration-300 border-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-gray-700/50 border-gray-600/50 text-gray-200 placeholder-gray-400 hover:bg-gray-700/70'
                        : 'bg-white/50 border-gray-200/50 text-gray-900 placeholder-gray-500 hover:bg-white/70'
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                <div className="relative">
                  <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 !rounded-button focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>
              {/* Face Scanner */}
              {isFaceScanning && (
                <div className="py-8">
                  <div ref={scannerRef} className="w-48 h-48 mx-auto mb-4"></div>
                  <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {scanProgress >= 1 ? 'Face scan complete!' : 'Looking for your face...'}
                  </p>
                  <div className="mt-2 text-center text-sm text-indigo-600">
                    {Math.round(scanProgress * 100)}% complete
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 !rounded-button" />
                  <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white py-3 !rounded-button hover:from-indigo-500 hover:via-indigo-400 hover:to-purple-400 transition-all duration-300 cursor-pointer whitespace-nowrap hover:shadow-lg hover:shadow-indigo-500/25 relative overflow-hidden group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform group-hover:translate-y-full">
                  {isLogin ? 'Login' : 'Create Account'}
                </span>
                <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 transform -translate-y-full group-hover:translate-y-0">
                  {isLogin ? 'Welcome Back' : 'Join Now'}
                </span>
                {isLogin ? 'Login' : 'Create Account'}
              </button>
              <div className="mt-6">
                <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Face authentication is required</div>
                <button
                  type="button"
                  onClick={toggleFaceScanning}
                  className={`w-full py-3 !rounded-button flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                    isFaceScanning 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-2 border-green-500/30' 
                    : 'bg-gray-100/50 text-gray-700 hover:bg-gray-200/50 border-2 border-gray-200/50'
                  }`}
                >
                  <i className={`fas fa-user-circle ${isFaceScanning ? 'text-green-600' : ''}`}></i>
                  <span>{isFaceScanning ? 'Scanning...' : 'Start Face Authentication'}</span>
                </button>
              </div>
            </form>
            <p className={`mt-8 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;