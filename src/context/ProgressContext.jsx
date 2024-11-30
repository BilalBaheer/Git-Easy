import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(`progress_${user?.uid}`);
      return savedProgress ? JSON.parse(savedProgress) : {
        completedSections: {},
        completedQuizzes: {},
        lastVisited: null,
        startDate: new Date().toISOString(),
        streak: 0,
        lastActive: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error loading progress:', error);
      return {
        completedSections: {},
        completedQuizzes: {},
        lastVisited: null,
        startDate: new Date().toISOString(),
        streak: 0,
        lastActive: new Date().toISOString()
      };
    }
  });

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(`progress_${user.uid}`, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [progress, user]);

  const markSectionComplete = useCallback((tutorialId, sectionIndex) => {
    setProgress(prev => {
      const key = `${tutorialId}-${sectionIndex}`;
      if (prev.completedSections[key]) {
        return prev;
      }
      const now = new Date().toISOString();
      return {
        ...prev,
        completedSections: {
          ...prev.completedSections,
          [key]: {
            completedAt: now,
            userId: user?.uid
          }
        },
        lastActive: now
      };
    });
  }, [user]);

  const updateLastVisited = useCallback((tutorialId, sectionIndex) => {
    setProgress(prev => {
      if (prev.lastVisited?.tutorialId === tutorialId && 
          prev.lastVisited?.sectionIndex === sectionIndex) {
        return prev;
      }
      const now = new Date().toISOString();
      return {
        ...prev,
        lastVisited: {
          tutorialId,
          sectionIndex,
          timestamp: now
        },
        lastActive: now
      };
    });
  }, []);

  const isSectionCompleted = useCallback((tutorialId, sectionIndex) => {
    return Boolean(progress.completedSections[`${tutorialId}-${sectionIndex}`]);
  }, [progress.completedSections]);

  const getTutorialProgress = useCallback((tutorialId) => {
    const completedInTutorial = Object.keys(progress.completedSections)
      .filter(key => key.startsWith(`${tutorialId}-`)).length;
    return completedInTutorial;
  }, [progress.completedSections]);

  const getOverallProgress = useCallback(() => {
    const totalSections = Object.keys(progress.completedSections).length;
    const totalAvailableSections = 22; 
    return Math.round((totalSections / totalAvailableSections) * 100);
  }, [progress.completedSections]);

  const markQuizComplete = useCallback((quizId) => {
    setProgress(prev => {
      if (!prev.completedQuizzes) {
        prev.completedQuizzes = {};
      }
      if (prev.completedQuizzes[quizId]) {
        return prev;
      }
      const now = new Date().toISOString();
      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [quizId]: {
            completedAt: now,
            userId: user?.uid
          }
        },
        lastActive: now
      };
    });
  }, [user]);

  const isQuizCompleted = useCallback((quizId) => {
    return Boolean(progress.completedQuizzes?.[`quiz-${quizId}`]);
  }, [progress.completedQuizzes]);

  const value = {
    progress,
    markSectionComplete,
    updateLastVisited,
    isSectionCompleted,
    getTutorialProgress,
    getOverallProgress,
    markQuizComplete,
    isQuizCompleted
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
