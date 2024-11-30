import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import quizzes from '../data/quizzes';
import tutorials from '../data/tutorials';
import { useProgress } from '../context/ProgressContext';

function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { markQuizComplete } = useProgress();
  
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const quiz = quizzes.find(q => q.id === parseInt(quizId));
    if (quiz) {
      setCurrentQuiz(quiz);
    } else {
      navigate('/tutorial');
    }
  }, [quizId, navigate]);

  const handleContinueLearning = () => {
    if (!currentQuiz) return;
    
    const tutorial = tutorials.find(t => t.id === currentQuiz.tutorialId);
    if (!tutorial || !tutorial.sections || tutorial.sections.length === 0) {
      navigate('/tutorial');
      return;
    }

    // Navigate to the first section of the corresponding tutorial
    const section = tutorial.sections[0];
    const formattedTitle = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    navigate(`/tutorial/${tutorial.id}-${formattedTitle}`);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      markQuizComplete(currentQuiz.id);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (!currentQuiz) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  if (showResults) {
    const percentage = (score / currentQuiz.questions.length) * 100;
    const getGrade = () => {
      if (percentage >= 90) return { text: 'Excellent!', color: 'text-green-600' };
      if (percentage >= 70) return { text: 'Good Job!', color: 'text-blue-600' };
      if (percentage >= 50) return { text: 'Keep Practicing!', color: 'text-yellow-600' };
      return { text: 'Need More Practice', color: 'text-red-600' };
    };
    const grade = getGrade();

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentQuiz.title}</h2>
            <p className="text-lg text-gray-600">Quiz Complete!</p>
          </div>
          
          <div className="bg-gray-50 px-8 py-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${grade.color}`}>
                {grade.text}
              </div>
              <div className="text-6xl font-bold mb-4 text-gray-900">
                {score}/{currentQuiz.questions.length}
              </div>
              <div className="text-2xl text-gray-600 mb-8">
                {percentage}% Correct
              </div>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <button
                onClick={handleContinueLearning}
                className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <span>Continue Learning</span>
                <ArrowLongRightIcon className="w-6 h-6 ml-2" />
              </button>
              
              <button
                onClick={handleRetry}
                className="w-full px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuiz.title}</h2>
            <h3 className="text-xl text-gray-800 mb-8">{currentQuestion.question}</h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-gray-900'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50 text-gray-900'
                        : 'border-gray-200 bg-white text-gray-700'
                      : selectedAnswer === index
                      ? 'border-primary bg-blue-50 text-gray-900'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-blue-50'
                  }`}
                  disabled={isAnswered}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{option}</span>
                    {isAnswered && (
                      index === currentQuestion.correctAnswer ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : index === selectedAnswer ? (
                        <XCircleIcon className="w-6 h-6 text-red-500" />
                      ) : null
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {isAnswered && (
            <div className="border-t border-gray-100">
              <div className="px-6 py-6 bg-gray-50">
                <div className="flex items-start mb-4">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircleIcon className="w-6 h-6 text-red-500 mr-2 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <div className="font-semibold mb-2">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <span className="text-green-600">Correct!</span>
                      ) : (
                        <span className="text-red-600">Incorrect</span>
                      )}
                    </div>
                    <div className="text-gray-600">
                      {currentQuestion.explanation}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center"
                >
                  <span>{currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'Show Results'}</span>
                  <ArrowLongRightIcon className="w-6 h-6 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
