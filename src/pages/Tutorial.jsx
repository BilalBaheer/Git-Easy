import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import tutorials from '../data/tutorials';
import quizzes from '../data/quizzes';
import { useProgress } from '../context/ProgressContext';

const formatSectionPath = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

function Tutorial() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { markSectionComplete, isSectionCompleted, updateLastVisited } = useProgress();
  
  const [tutorial, setTutorial] = useState(null);
  const [tutorialSection, setTutorialSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tutorialList] = useState(tutorials);
  const [quiz, setQuiz] = useState(null);

  const loadSection = useCallback(async () => {
    if (!section) {
      // If no section specified, redirect to the first tutorial's first section
      const firstTutorial = tutorials[0];
      if (firstTutorial && firstTutorial.sections.length > 0) {
        const firstSection = firstTutorial.sections[0];
        const path = `${firstTutorial.id}-${formatSectionPath(firstSection.title)}`;
        navigate(`/tutorial/${path}`);
      } else {
        setError(new Error('No tutorials available'));
      }
      setLoading(false);
      return;
    }

    try {
      const [tutorialId, ...sectionParts] = section.split('-');
      const parsedTutorialId = parseInt(tutorialId);
      const currentTutorial = tutorials.find(t => t.id === parsedTutorialId);

      if (!currentTutorial) {
        setError(new Error(`Tutorial ${parsedTutorialId} not found`));
        setLoading(false);
        return;
      }

      const sectionPath = sectionParts.join('-');
      const currentSection = currentTutorial.sections.find(
        s => formatSectionPath(s.title) === sectionPath
      );

      if (!currentSection) {
        // If section not found, redirect to first section of the tutorial
        const firstSection = currentTutorial.sections[0];
        if (firstSection) {
          const path = `${currentTutorial.id}-${formatSectionPath(firstSection.title)}`;
          navigate(`/tutorial/${path}`);
        } else {
          setError(new Error('No sections available in this tutorial'));
        }
        setLoading(false);
        return;
      }

      setTutorial(currentTutorial);
      setTutorialSection(currentSection);
      setQuiz(quizzes.find(q => q.tutorialId === currentTutorial.id));
      updateLastVisited(currentTutorial.id, currentTutorial.sections.indexOf(currentSection));
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [section, navigate, updateLastVisited]);

  useEffect(() => {
    if (tutorial) {
      const relatedQuiz = quizzes.find(q => q.tutorialId === tutorial.id);
      setQuiz(relatedQuiz);
    }
  }, [tutorial]);

  // Handle initial redirect
  useEffect(() => {
    if (!section) {
      const firstTutorial = tutorials[0];
      const firstSection = firstTutorial.sections[0];
      const path = `${firstTutorial.id}-${formatSectionPath(firstSection.title)}`;
      navigate(`/tutorial/${path}`, { replace: true });
    }
  }, [section, navigate]);

  // Handle section loading
  useEffect(() => {
    setLoading(true);
    loadSection();
  }, [loadSection]);

  const getNextSection = useCallback(() => {
    if (!tutorial || !tutorialSection) return null;

    const currentIndex = tutorial.sections.indexOf(tutorialSection);
    
    // If there's a next section in the current tutorial
    if (currentIndex < tutorial.sections.length - 1) {
      return {
        tutorialId: tutorial.id,
        section: tutorial.sections[currentIndex + 1]
      };
    }
    
    // If we need to move to the next tutorial
    const nextTutorialIndex = tutorials.findIndex(t => t.id === tutorial.id) + 1;
    if (nextTutorialIndex < tutorials.length) {
      const nextTutorial = tutorials[nextTutorialIndex];
      return {
        tutorialId: nextTutorial.id,
        section: nextTutorial.sections[0]
      };
    }
    
    return null;
  }, [tutorial, tutorialSection]);

  const handleNext = useCallback(() => {
    const next = getNextSection();
    if (next) {
      navigate(`/tutorial/${next.tutorialId}-${formatSectionPath(next.section.title)}`);
    }
  }, [getNextSection, navigate]);

  if (loading && !tutorial) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">
          {error.message}
        </div>
      </div>
    );
  }

  if (!tutorial || !tutorialSection) {
    return null;
  }

  const currentIndex = tutorial.sections.indexOf(tutorialSection);
  const prevSection = currentIndex > 0 ? tutorial.sections[currentIndex - 1] : null;
  const nextSection = getNextSection();

  return (
    <div className="flex h-screen">
      {/* Tutorial Navigation Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Tutorials</h2>
          <div className="space-y-6">
            {tutorialList.map((t) => (
              <div key={t.id} className="space-y-3">
                <div className="font-semibold text-gray-800 text-lg border-b border-gray-200 pb-2">
                  {t.title}
                </div>
                <div className="space-y-2">
                  {t.sections.map((s, index) => {
                    const isCurrentSection = tutorial?.id === t.id && tutorialSection?.title === s.title;
                    const isCompleted = isSectionCompleted(t.id, index);
                    return (
                      <button
                        key={`${t.id}-${index}`}
                        onClick={() => navigate(`/tutorial/${t.id}-${formatSectionPath(s.title)}`)}
                        className={`
                          w-full text-left px-4 py-3 rounded-lg
                          transition-all duration-200 ease-in-out
                          flex items-center justify-between
                          ${isCurrentSection 
                            ? 'bg-blue-500 text-white shadow-md transform scale-102' 
                            : isCompleted
                              ? 'bg-green-50 hover:bg-green-100'
                              : 'bg-gray-800 hover:bg-gray-700 text-white'}
                          ${isCompleted ? 'font-medium' : ''}
                          group relative
                        `}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`
                            w-2 h-2 rounded-full flex-shrink-0
                            ${isCurrentSection ? 'bg-white' : ''}
                            ${isCompleted ? 'bg-green-500' : 'bg-blue-400'}
                          `}></div>
                          <span className={`text-sm ${
                            isCurrentSection 
                              ? 'text-white' 
                              : isCompleted
                                ? 'text-gray-700'
                                : 'text-gray-100'
                          }`}>
                            {s.title}
                          </span>
                        </div>
                        {isCompleted ? (
                          <CheckCircleIcon 
                            className={`h-5 w-5 flex-shrink-0
                              ${isCurrentSection ? 'text-white' : 'text-green-500'}
                              opacity-90 group-hover:opacity-100`} 
                          />
                        ) : (
                          <div className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full 
                              ${isCurrentSection ? 'bg-white' : 'bg-blue-400'}`}>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl text-gray-700">{tutorialSection.title}</h2>
              {isSectionCompleted(tutorial.id, currentIndex) && (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              )}
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Content</h3>
              <div className="whitespace-pre-wrap">{tutorialSection.content}</div>
            </div>

            {tutorialSection.example && (
              <div className="bg-gray-50 p-6 rounded-lg mt-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Example</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                  <code>{tutorialSection.example}</code>
                </pre>
              </div>
            )}

            {tutorialSection.practice && (
              <div className="bg-blue-50 p-6 rounded-lg mt-6 border border-blue-100">
                <h3 className="text-lg font-semibold mb-4">Practice</h3>
                <p>{tutorialSection.practice}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8 space-x-4">
            <div>
              {prevSection ? (
                <button
                  onClick={() => navigate(`/tutorial/${tutorial.id}-${formatSectionPath(prevSection.title)}`)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-2" />
                  Previous: {prevSection.title}
                </button>
              ) : (
                <div></div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {!isSectionCompleted(tutorial.id, currentIndex) && (
                <button
                  onClick={() => {
                    markSectionComplete(tutorial.id, currentIndex);
                    if (nextSection) {
                      handleNext();
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm"
                >
                  Complete & Continue
                </button>
              )}
              
              {quiz && currentIndex === tutorial.sections.length - 1 && (
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Take Quiz
                </Link>
              )}
              
              <button
                onClick={handleNext}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm
                  ${nextSection 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                disabled={!nextSection}
              >
                {nextSection ? `Next: ${nextSection.section.title}` : 'No More Sections'}
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
