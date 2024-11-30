import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import tutorials from '../data/tutorials';
import '../styles/Home.css';
import { CodeBracketIcon, AcademicCapIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-24 md:pt-32 md:pb-32 text-center">
            <div className="floating-element mb-8">
              <CodeBracketIcon className="h-24 w-24 mx-auto text-white opacity-90" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-shadow">
              Master Git Like a Pro
              <span className="block text-2xl md:text-3xl font-bold mt-4 text-blue-200">
                Interactive Learning Platform for Modern Developers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join over 10,000 developers who've mastered Git through our 
              revolutionary visual learning platform. Learn faster, understand better.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button
                onClick={handleStartLearning}
                className="cta-button px-10 py-5 text-white rounded-xl 
                         text-xl font-bold flex items-center space-x-3"
              >
                <span>{user ? "Continue Learning" : "Start Free Trial"}</span>
                <RocketLaunchIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="transform -translate-y-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Active Learners</div>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black text-blue-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Interactive Exercises</div>
            </div>
            <div className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-black text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Developers 
          <span className="text-blue-600"> Choose GitBetter</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="feature-card p-8 bg-white rounded-2xl shadow-lg transition-all duration-300">
            <div className="bg-blue-100 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visual Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Understand complex Git concepts through our interactive visualizations and animations.
            </p>
          </div>
          <div className="feature-card p-8 bg-white rounded-2xl shadow-lg transition-all duration-300">
            <div className="bg-blue-100 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Learn by Doing</h3>
            <p className="text-gray-600 leading-relaxed">
              Practice with real-world scenarios in our interactive terminal environment.
            </p>
          </div>
          <div className="feature-card p-8 bg-white rounded-2xl shadow-lg transition-all duration-300">
            <div className="bg-blue-100 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6">
              <RocketLaunchIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Feedback</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate feedback on your actions and learn from your mistakes in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 text-center transform hover:scale-[1.02] transition-all duration-300">
            <div className="inline-block bg-blue-100 rounded-full px-6 py-2 text-blue-600 font-semibold mb-8">
              LIFETIME ACCESS
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pro Access</h2>
            <div className="flex items-center justify-center mb-8">
              <span className="text-6xl font-black text-blue-600">$12</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <ul className="space-y-4 max-w-md mx-auto mb-10 text-left">
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Full Access to All Interactive Tutorials
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Advanced Git Visualization Tools
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Real-world Practice Environments
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Progress Tracking & Certificates
              </li>
            </ul>
            <button
              onClick={handleStartLearning}
              className="cta-button w-full py-5 rounded-xl text-white text-xl font-bold"
            >
              Get Lifetime Access
            </button>
            <p className="text-gray-500 mt-6 text-sm">30-day money-back guarantee</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          Loved by 
          <span className="text-blue-600"> Developers</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="testimonial-card p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://randomuser.me/api/portraits/women/32.jpg"
                alt="Sarah K."
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold text-gray-900">Sarah Kim</div>
                <div className="text-gray-500 text-sm">Senior Developer @ Google</div>
              </div>
            </div>
            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 leading-relaxed">
              "GitBetter's visual approach to teaching Git is revolutionary. I finally understand 
              rebasing and complex merging strategies!"
            </p>
          </div>
          <div className="testimonial-card p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://randomuser.me/api/portraits/men/46.jpg"
                alt="Mike R."
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold text-gray-900">Mike Rodriguez</div>
                <div className="text-gray-500 text-sm">Lead Engineer @ Microsoft</div>
              </div>
            </div>
            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 leading-relaxed">
              "The interactive exercises are brilliant. This platform has become our go-to 
              for onboarding new developers."
            </p>
          </div>
          <div className="testimonial-card p-8 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center mb-6">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Emma L."
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-4">
                <div className="font-bold text-gray-900">Emma Liu</div>
                <div className="text-gray-500 text-sm">Frontend Dev @ Netflix</div>
              </div>
            </div>
            <div className="text-yellow-400 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 leading-relaxed">
              "Best investment in my career! The visualization tools helped me understand 
              Git workflows that I struggled with for years."
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="hero-gradient text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Master Git?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their Git skills with our
            interactive platform. Start your journey today!
          </p>
          <button
            onClick={handleStartLearning}
            className="cta-button px-12 py-5 text-white rounded-xl 
                     text-xl font-bold inline-flex items-center space-x-3"
          >
            <span>{user ? "Continue Learning" : "Start Learning Now"}</span>
            <RocketLaunchIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;