import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { useProgress } from '../context/ProgressContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${API_URL}/api/quiz/${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        setCurrentQuiz(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again later.');
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleAnswerSelect = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
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
    const currentTutorialIndex = currentQuiz.tutorials.findIndex(t => t.id === currentQuiz.tutorialId);
    if (currentTutorialIndex < currentQuiz.tutorials.length - 1) {
      navigate(`/tutorial/${currentQuiz.tutorials[currentTutorialIndex + 1].id}`);
    } else {
      navigate('/progress');
    }
  };

  if (!currentQuiz) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{currentQuiz.title}</h2>
        <div className="text-gray-600 mb-4">
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full p-3 text-left rounded border ${
                selectedAnswer === answer
                  ? answer === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'hover:bg-gray-50 border-gray-300'
              } ${isAnswered ? 'cursor-default' : 'hover:border-gray-400'}`}
              disabled={isAnswered}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      {isAnswered && (
        <div className="flex justify-between items-center">
          <div className={`flex items-center ${
            selectedAnswer === currentQuestion.correctAnswer ? 'text-green-600' : 'text-red-600'
          }`}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <>
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                <span>Correct!</span>
              </>
            ) : (
              <>
                <XCircleIcon className="h-6 w-6 mr-2" />
                <span>Incorrect. The correct answer is: {currentQuestion.correctAnswer}</span>
              </>
            )}
          </div>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
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
