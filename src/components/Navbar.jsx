import { Link, NavLink } from 'react-router-dom';
import { BookOpenIcon, BeakerIcon, ChartBarIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.59,2.6C11.37,1.81 12.63,1.81 13.41,2.6L21.4,10.59C22.19,11.37 22.19,12.63 21.4,13.41L13.41,21.4C12.63,22.19 11.37,22.19 10.59,21.4L2.6,13.41C1.81,12.63 1.81,11.37 2.6,10.59Z" />
            </svg>
            <span className="text-xl font-bold text-gray-800">GitBetter</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <NavLink 
                  to="/tutorial" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  <BookOpenIcon className="w-5 h-5" />
                  <span>Learn</span>
                </NavLink>
                
                <NavLink 
                  to="/practice" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  <BeakerIcon className="w-5 h-5" />
                  <span>Practice</span>
                </NavLink>
                
                <NavLink 
                  to="/progress" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  <ChartBarIcon className="w-5 h-5" />
                  <span>Progress</span>
                </NavLink>
                
                <NavLink 
                  to="/quiz" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  <AcademicCapIcon className="w-5 h-5" />
                  <span>Quiz</span>
                </NavLink>

                <NavLink 
                  to="/visualizer" 
                  className={({ isActive }) => 
                    `flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  }
                >
                  <CodeBracketIcon className="w-5 h-5" />
                  <span>Visualizer</span>
                </NavLink>

                {/* User Profile and Logout */}
                <div className="flex items-center ml-6 pl-6 border-l border-gray-200">
                  <span className="text-gray-700 font-medium mr-4">{user.email}</span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
