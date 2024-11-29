import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import tutorials from '../data/tutorials';
import { CheckCircleIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';

function Progress() {
  const navigate = useNavigate();
  const { progress, getTutorialProgress, getOverallProgress } = useProgress();
  const overallProgress = getOverallProgress();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">Your Learning Progress</h1>
        
        {/* Overall Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {overallProgress}% Complete
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${overallProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold">Started Learning</h3>
                <p className="text-sm text-gray-600">{formatDate(progress.startDate)}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <h3 className="font-semibold">Sections Completed</h3>
                <p className="text-sm text-gray-600">
                  {Object.keys(progress.completedSections).length} sections
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <h3 className="font-semibold">Last Active</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(progress.lastActive)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Progress */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tutorial Progress</h2>
          <div className="space-y-4">
            {tutorials.map((tutorial) => {
              const completedCount = getTutorialProgress(tutorial.id);
              const totalSections = tutorial.sections.length;
              const percentage = Math.round((completedCount / totalSections) * 100);

              return (
                <div
                  key={tutorial.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/tutorial/${tutorial.id}-${tutorial.sections[0].title.toLowerCase().replace(/\s+/g, '-')}`)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{tutorial.title}</h3>
                    <span className="text-sm text-gray-600">
                      {completedCount}/{totalSections} sections
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
