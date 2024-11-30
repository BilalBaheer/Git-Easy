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
              Master Git in Hours, Not Months      
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Join thousands of developers who've mastered Git through our interactive platform.
            Visual learning, hands-on practice, and real-world scenarios.
          </p>
          <div className="flex flex-col items-center gap-6 mb-16">
            <button
              onClick={handleStartLearning}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                       transform hover:scale-105 transition-all duration-200 shadow-lg 
                       text-lg font-semibold flex items-center justify-center w-64"
            >
              {user ? "Start Learning Now" : "Try For Free"} →
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600">3K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Hand On Exercises</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-blue-600">92%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Developers Choose GitBetter</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-blue-600 text-xl font-semibold mb-3">📊 Interactive Visualizer</div>
                <p className="text-gray-600">See Git concepts come to life with our unique branch visualization tool</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-blue-600 text-xl font-semibold mb-3">🎯 Practice Mode</div>
                <p className="text-gray-600">Learn by doing with hands-on exercises and real-world scenarios</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-blue-600 text-xl font-semibold mb-3">🎓 Structured Learning</div>
                <p className="text-gray-600">Follow our proven curriculum from basics to advanced Git concepts</p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Pro Access</h2>
              <div className="text-5xl font-bold text-white mb-2">$12</div>
              <div className="text-gray-400 mb-8">Lifetime Access</div>
              <ul className="text-left space-y-4 max-w-md mx-auto mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Full Access to All Tutorials
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Interactive Git Visualizer
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Practice Environments
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Full Access to Git Terminal
                </li>
              </ul>
              <button
                onClick={handleStartLearning}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                         transform hover:scale-105 transition-all duration-200 shadow-lg 
                         text-lg font-semibold w-full max-w-md"
              >
                Get Lifetime Access
              </button>
              {/* <p className="text-gray-400 mt-4 text-sm">30-day money-back guarantee</p> */}
            </div>
          </div>

          {/* Testimonials */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400">★★★★★</div>
                </div>
                <p className="text-gray-600 mb-4">"Finally understood Git branching thanks to the visual learning approach. Best investment in my dev journey!"</p>
                <div className="text-gray-700 font-medium">- Sarah K.</div>
                <div className="text-gray-500 text-sm">Full Stack Developer</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400">★★★★★</div>
                </div>
                <p className="text-gray-600 mb-4">"The interactive practice mode is amazing. I learned more in a week than I did in months of reading docs."</p>
                <div className="text-gray-700 font-medium">- Mike R.</div>
                <div className="text-gray-500 text-sm">Software Engineer</div>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400">★★★★★</div>
                </div>
                <p className="text-gray-600 mb-4">"Worth every penny! The visualizer helped me understand complex Git workflows easily."</p>
                <div className="text-gray-700 font-medium">- Imran M.</div>
                <div className="text-gray-500 text-sm">Frontend Developer</div>
              </div>
            </div>
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
              Join Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;