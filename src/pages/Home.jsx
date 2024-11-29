import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import tutorials from '../data/tutorials';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartLearning = () => {
    if (user) {
      const firstTutorial = tutorials[0];
      const firstSection = firstTutorial.sections[0];
      const sectionPath = firstSection.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/tutorial/${firstTutorial.id}-${sectionPath}`, { replace: true });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 md:pt-32 md:pb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Get Better at Git
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Transform your Git skills from beginner to expert with interactive tutorials, 
            real-world scenarios, and hands-on practice.
          </p>
          <div className="flex justify-center mb-16">
            <button
              onClick={handleStartLearning}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                       transform hover:scale-105 transition-all duration-200 shadow-lg 
                       text-lg font-semibold flex items-center justify-center"
            >
              {user ? "Start Your Journey" : "Get Started"} →
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Practice Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Interactive</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive Learning</h2>
            <p className="text-gray-600">
              Learn by doing with hands-on exercises and real-time feedback. Practice Git commands in a safe environment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Progress</h2>
            <p className="text-gray-600">
              Track your learning journey with detailed progress monitoring and achievement badges.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Real-World Scenarios</h2>
            <p className="text-gray-600">
              Practice with real-world Git scenarios and learn how to handle complex version control situations.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-10 mb-20 text-white">
          <h2 className="text-3xl font-bold mb-3">Pro Subscription</h2>
          <div className="flex justify-between items-start mb-8">
            <p className="text-gray-400 max-w-sm text-lg">
              Access all advanced Git tutorials, real-world scenarios, and premium features
            </p>
            <div className="text-right">
              <div className="text-5xl font-bold">$6</div>
              <div className="text-gray-400 text-lg">lifetime access</div>
            </div>
          </div>
          
          <button
            onClick={handleStartLearning}
            className="w-full bg-blue-600 text-white py-4 rounded-lg mb-10 hover:bg-blue-700 
                     transition-colors duration-200 font-semibold text-xl"
          >
            Join Now
          </button>

          <ul className="space-y-5">
            <li className="flex items-center space-x-4 text-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Unlimited access to all tutorials</span>
            </li>
            <li className="flex items-center space-x-4 text-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Interactive practice environments</span>
            </li>
            <li className="flex items-center space-x-4 text-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Advanced Git scenarios and solutions</span>
            </li>
            <li className="flex items-center space-x-4 text-lg">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Priority email support within 24h</span>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="text-center pb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Master Git?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers who have transformed their Git skills with our
            interactive platform.
          </p>
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors duration-200 text-lg font-medium"
          >
            Start Free Trial →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;