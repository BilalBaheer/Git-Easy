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

      const now = new Date();
      const lastActiveDate = new Date(prev.lastActive);
      const isNewDay = now.toDateString() !== lastActiveDate.toDateString();
      
      // Update streak
      let newStreak = prev.streak;
      if (isNewDay) {
        const daysSinceLastActive = Math.floor((now - lastActiveDate) / (1000 * 60 * 60 * 24));
        newStreak = daysSinceLastActive === 1 ? prev.streak + 1 : 1;
      }

      return {
        ...prev,
        completedSections: {
          ...prev.completedSections,
          [key]: now.toISOString()
        },
        lastActive: now.toISOString(),
        streak: newStreak
      };
    });
  }, []);

  const updateLastVisited = useCallback((tutorialId, sectionIndex) => {
    setProgress(prev => {
      const now = new Date();
      const lastActiveDate = new Date(prev.lastActive);
      const isNewDay = now.toDateString() !== lastActiveDate.toDateString();
      
      // Update streak
      let newStreak = prev.streak;
      if (isNewDay) {
        const daysSinceLastActive = Math.floor((now - lastActiveDate) / (1000 * 60 * 60 * 24));
        newStreak = daysSinceLastActive === 1 ? prev.streak + 1 : 1;
      }

      return {
        ...prev,
        lastVisited: {
          tutorialId,
          sectionIndex
        },
        lastActive: now.toISOString(),
        streak: newStreak
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

  const markQuizComplete = useCallback((quizId, score) => {
    setProgress(prev => {
      const now = new Date();
      const lastActiveDate = new Date(prev.lastActive);
      const isNewDay = now.toDateString() !== lastActiveDate.toDateString();
      
      // Update streak
      let newStreak = prev.streak;
      if (isNewDay) {
        const daysSinceLastActive = Math.floor((now - lastActiveDate) / (1000 * 60 * 60 * 24));
        newStreak = daysSinceLastActive === 1 ? prev.streak + 1 : 1;
      }

      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [quizId]: {
            completedAt: now.toISOString(),
            score
          }
        },
        lastActive: now.toISOString(),
        streak: newStreak
      };
    });
  }, []);

  const isQuizCompleted = useCallback((quizId) => {
    return Boolean(progress.completedQuizzes?.[quizId]);
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
