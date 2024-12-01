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
    if (!quizId) {
      // If no quizId provided, redirect to the first quiz
      const firstQuiz = quizzes[0];
      if (firstQuiz) {
        navigate(`/quiz/${firstQuiz.id}`);
      } else {
        navigate('/tutorial');
      }
      return;
    }

    // Find the current quiz
    const quiz = quizzes.find(q => q.id === parseInt(quizId, 10));
    if (quiz) {
      setCurrentQuiz(quiz);
    } else {
      navigate('/tutorial');
    }
  }, [quizId, navigate]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
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

  const handleNextTutorial = () => {
    const currentTutorialIndex = tutorials.findIndex(t => t.id === currentQuiz.tutorialId);
    if (currentTutorialIndex < tutorials.length - 1) {
      navigate(`/tutorial/${tutorials[currentTutorialIndex + 1].id}`);
    } else {
      navigate('/progress');
    }
  };

  if (!currentQuiz) return <div>Loading...</div>;

  if (showResults) {
    const passingScore = Math.ceil(currentQuiz.questions.length * 0.7);
    const passed = score >= passingScore;

    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-lg">
            Your score: {score} out of {currentQuiz.questions.length}
          </p>
          <div className="mt-4">
            {passed ? (
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                <span>Congratulations! You passed the quiz!</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircleIcon className="h-6 w-6 mr-2" />
                <span>You need {passingScore} correct answers to pass. Try again!</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          {!passed && (
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry Quiz
            </button>
          )}
          {passed && (
            <button
              onClick={handleNextTutorial}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            >
              Next Tutorial
              <ArrowLongRightIcon className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-800">{currentQuiz.title}</h2>
        <div className="text-gray-600 mb-6 text-lg">
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">{currentQuestion.question}</h3>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg transition-all duration-200 
                ${!isAnswered ? 'hover:bg-blue-50 hover:border-blue-300 transform hover:-translate-y-0.5' : ''}
                ${
                  selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-2 border-green-500 text-green-700'
                      : 'bg-red-50 border-2 border-red-500 text-red-700'
                    : 'bg-gray-50 border-2 border-gray-200 text-gray-700'
                }
                font-medium text-lg shadow-sm`}
              disabled={isAnswered}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center mr-3 text-base">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>
      </div>

      {isAnswered && (
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <div className={`flex items-center p-3 rounded-lg ${
            selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <>
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                <span className="font-medium">Correct!</span>
              </>
            ) : (
              <>
                <XCircleIcon className="h-6 w-6 mr-2" />
                <span className="font-medium">Incorrect. Try again!</span>
              </>
            )}
          </div>
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              transition-colors duration-200 flex items-center font-medium shadow-md"
          >
            {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
              <>
                Next Question
                <ArrowLongRightIcon className="h-5 w-5 ml-2" />
              </>
            ) : (
              'Show Results'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
