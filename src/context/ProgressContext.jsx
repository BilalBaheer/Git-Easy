import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem(`progress_${user?.uid}`);
    return savedProgress ? JSON.parse(savedProgress) : {
      completedSections: {},
      lastVisited: null,
      startDate: new Date().toISOString(),
      streak: 0,
      lastActive: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(`progress_${user.uid}`, JSON.stringify(progress));
    }
  }, [progress, user]);

  const markSectionComplete = useCallback((tutorialId, sectionIndex) => {
    setProgress(prev => {
      const key = `${tutorialId}-${sectionIndex}`;
      if (prev.completedSections[key]) {
        return prev;
      }
      return {
        ...prev,
        completedSections: {
          ...prev.completedSections,
          [key]: {
            completedAt: new Date().toISOString(),
            userId: user?.uid
          }
        }
      };
    });
  }, [user]);

  const updateLastVisited = useCallback((tutorialId, sectionIndex) => {
    setProgress(prev => {
      if (prev.lastVisited?.tutorialId === tutorialId && 
          prev.lastVisited?.sectionIndex === sectionIndex) {
        return prev;
      }
      return {
        ...prev,
        lastVisited: {
          tutorialId,
          sectionIndex,
          timestamp: new Date().toISOString()
        }
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
    // You might want to get the total number of sections from your tutorials data
    // This is a placeholder value
    const totalAvailableSections = 22; // 11 tutorials × 2 sections each
    return Math.round((totalSections / totalAvailableSections) * 100);
  }, [progress.completedSections]);

  const value = {
    progress,
    markSectionComplete,
    updateLastVisited,
    isSectionCompleted,
    getTutorialProgress,
    getOverallProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
