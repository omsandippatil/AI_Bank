import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, ScanFace, Bot, Shield, Send, X, User, Twitter, Linkedin, Facebook, Instagram, Scan, ChevronRight, BarChart3, CreditCard, ArrowRight, Eye, AlertTriangle, Lock, FileText } from 'lucide-react';
import '../styles/Home.css'; 

interface ChatMessage {
  isUser: boolean;
  message: string;
}

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showFaceAuth, setShowFaceAuth] = useState<boolean>(false);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { isUser: false, message: "Hello! Welcome to FutureBank. How can I assist you with your banking needs today?" }
  ]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#151515';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  }, [isDark]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage: ChatMessage = {
      isUser: true,
      message: messageInput.trim()
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        isUser: false,
        message: `I understand you're asking about "${messageInput.trim()}". Our AI-powered system can help you with account management, transactions, investment advice, and security concerns. How can I assist you further?`
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleFaceAuth = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setTimeout(() => {
        setShowFaceAuth(false);
      }, 1000);
    }, 3000);
  };

  return (
    <div className="font-inter bg-white dark:bg-dark dark:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-white/90 dark:bg-black/80">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="font-['Pacifico'] text-2xl text-primary dark:text-white logo">FutureBank</div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors dark:text-white nav-link">Products</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors dark:text-white nav-link">Features</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors dark:text-white nav-link">About</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors dark:text-white nav-link">Contact</a>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsDark(!isDark)} 
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors dark:text-white theme-toggle"
              >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button 
                onClick={() => setShowFaceAuth(true)}
                className="flex items-center space-x-2 button-primary text-white px-4 py-2 rounded-lg"
              >
                <ScanFace size={20} />
                <span>Face Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-['Space_Grotesk'] font-bold text-6xl leading-tight hero-title bg-clip-text text-transparent mb-6">
                Future of Banking is Here
              </h1>
              <p className="text-gray-600 text-xl mb-8 dark:text-gray-300">
                Experience the next generation of banking with AI-powered security and face recognition technology.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <button className="button-primary text-white px-8 py-4 rounded-lg whitespace-nowrap">
                  Get Started
                </button>
                <button className="button-secondary px-8 py-4 rounded-lg whitespace-nowrap">
                  Learn More
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                  <Shield className="text-green-600" size={24} />
                </div>
                <p className="text-green-600 font-medium">100% Secure with AI Fraud Protection</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Banking Interface"
                className="w-full h-auto floating-image rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-lighter p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Lock className="text-primary" size={20} />
                  <span className="text-sm font-medium">Advanced AI Security</span>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-white dark:bg-dark-lighter p-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Scan className="text-secondary" size={20} />
                  <span className="text-sm font-medium">Biometric Auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-lighter">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Space_Grotesk'] font-bold text-4xl mb-4">AI-Powered Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">Experience the future of banking with our cutting-edge AI technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2d2d2d]">
              <div className="feature-icon w-16 h-16 flex items-center justify-center bg-blue-100 rounded-2xl mb-6">
                <Bot className="text-primary" size={32} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-xl mb-4">AI Assistant</h3>
              <p className="text-gray-600 mb-6 dark:text-gray-300">Navigate and manage your accounts hands-free with our advanced AI banking assistant.</p>
              <a href="#" className="text-primary font-medium hover:underline flex items-center">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2d2d2d]">
              <div className="feature-icon w-16 h-16 flex items-center justify-center bg-purple-100 rounded-2xl mb-6">
                <ScanFace className="text-accent" size={32} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-xl mb-4">Face Authentication</h3>
              <p className="text-gray-600 mb-6 dark:text-gray-300">Secure your account with advanced biometric authentication technology.</p>
              <a href="#" className="text-primary font-medium hover:underline flex items-center">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            <div className="feature-card bg-white p-8 rounded-2xl shadow-lg dark:bg-[#2d2d2d]">
              <div className="feature-icon w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-2xl mb-6">
                <Shield className="text-warning" size={32} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-xl mb-4">Smart Security</h3>
              <p className="text-gray-600 mb-6 dark:text-gray-300">AI-powered fraud detection and prevention system for maximum security.</p>
              <a href="#" className="text-primary font-medium hover:underline flex items-center">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/api/placeholder/600/400" 
                alt="AI Analytics" 
                className="w-full h-auto rounded-3xl shadow-2xl" 
              />
            </div>
            <div>
              <h2 className="font-['Space_Grotesk'] font-bold text-4xl mb-6">Smart Financial Analytics</h2>
              <p className="text-gray-600 text-lg mb-8 dark:text-gray-300">
                Our AI-powered analytics provide real-time insights into your financial health, helping you make better decisions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 list-item">
                  <div className="w-6 h-6 flex items-center justify-center text-primary checkmark">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Predictive spending analysis</span>
                </li>
                <li className="flex items-center space-x-3 list-item">
                  <div className="w-6 h-6 flex items-center justify-center text-primary checkmark">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Investment recommendations</span>
                </li>
                <li className="flex items-center space-x-3 list-item">
                  <div className="w-6 h-6 flex items-center justify-center text-primary checkmark">
                    <Check size={20} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Real-time market insights</span>
                </li>
              </ul>
              <button className="mt-8 flex items-center space-x-2 button-primary text-white px-6 py-3 rounded-lg">
                <BarChart3 size={20} />
                <span>Try Smart Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-lighter">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Space_Grotesk'] font-bold text-4xl mb-4">Banking Services Reimagined</h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">Discover how our AI-powered services transform traditional banking</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card bg-white p-6 rounded-xl shadow-lg dark:bg-[#2d2d2d] text-center">
              <div className="feature-icon w-12 h-12 mx-auto flex items-center justify-center bg-blue-100 rounded-xl mb-4">
                <CreditCard className="text-primary" size={24} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2">Smart Cards</h3>
              <p className="text-gray-600 text-sm dark:text-gray-300">Cards that adapt to your spending habits and provide enhanced security.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-xl shadow-lg dark:bg-[#2d2d2d] text-center">
              <div className="feature-icon w-12 h-12 mx-auto flex items-center justify-center bg-purple-100 rounded-xl mb-4">
                <BarChart3 className="text-accent" size={24} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2">Wealth Management</h3>
              <p className="text-gray-600 text-sm dark:text-gray-300">AI-driven investment strategies customized to your goals.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-xl shadow-lg dark:bg-[#2d2d2d] text-center">
              <div className="feature-icon w-12 h-12 mx-auto flex items-center justify-center bg-green-100 rounded-xl mb-4">
                <Shield className="text-success" size={24} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2">Fraud Protection</h3>
              <p className="text-gray-600 text-sm dark:text-gray-300">Real-time monitoring and instant alerts for suspicious activities.</p>
            </div>
            <div className="feature-card bg-white p-6 rounded-xl shadow-lg dark:bg-[#2d2d2d] text-center">
              <div className="feature-icon w-12 h-12 mx-auto flex items-center justify-center bg-yellow-100 rounded-xl mb-4">
                <FileText className="text-warning" size={24} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-lg mb-2">Smart Contracts</h3>
              <p className="text-gray-600 text-sm dark:text-gray-300">Automated and secure document processing with blockchain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 cta-section text-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Space_Grotesk'] font-bold text-4xl mb-6">Ready to Experience the Future?</h2>
            <p className="text-gray-200 mb-8">Join thousands of users who have already transformed their banking experience</p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-opacity-90 transition-colors whitespace-nowrap hover:shadow-lg hover:transform hover:scale-105 flex items-center space-x-2 mx-auto">
              <span>Open Account Now</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="font-['Pacifico'] text-2xl mb-6">logo</div>
              <p className="text-gray-400">Revolutionizing banking with AI technology</p>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold mb-6">Products</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Personal Banking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Banking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Space_Grotesk'] font-semibold mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 FutureBank. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <button 
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-lg animate-[pulse_2s_infinite] flex items-center justify-center hover:bg-opacity-90 transition-colors"
      >
        <Bot size={28} />
      </button>

      {/* Face Auth Modal */}
      {showFaceAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 dark:bg-[#2d2d2d]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                <ScanFace className="text-primary" size={48} />
              </div>
              <h3 className="font-['Space_Grotesk'] font-semibold text-2xl mb-4">Face Authentication</h3>
              <p className="text-gray-600 mb-8 dark:text-gray-300">Please position your face within the frame</p>
              <div className="w-48 h-48 mx-auto border-4 border-primary rounded-full mb-8"></div>
              <button 
                onClick={() => setShowFaceAuth(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative dark:bg-[#2d2d2d]">
            <button 
              onClick={() => setShowChatbot(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col h-[500px]">
              <div className="flex items-center space-x-3 pb-4 border-b dark:border-gray-700">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {messages.map((msg, index) => (
                  msg.isUser ? (
                    <div key={index} className="flex items-start justify-end space-x-2">
                      <div className="bg-primary text-white rounded-2xl rounded-tr-none p-3 max-w-[80%]">
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="text-gray-600" size={16} />
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="text-white" size={16} />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[80%] dark:bg-gray-700">
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  )
                ))}
              </div>
              <div className="border-t pt-4 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Type your message..." 
                  />
                  <button 
                    onClick={sendMessage}
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;