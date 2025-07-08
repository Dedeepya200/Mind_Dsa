import { useState, useEffect } from 'react';
import { ProblemData, Problem } from '../types';

export const useProblems = () => {
  const [problems, setProblems] = useState<ProblemData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const response = await fetch('/problems.json');
        if (!response.ok) {
          throw new Error('Failed to load problems');
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load problems');
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const getRandomProblems = (topics: string[], excludeTitles: string[], count: number = 3): Problem[] => {
    const availableProblems: Problem[] = [];
    
    topics.forEach(topic => {
      if (problems[topic]) {
        problems[topic].forEach(problem => {
          if (!excludeTitles.includes(problem.title)) {
            availableProblems.push(problem);
          }
        });
      }
    });

    // Shuffle and take requested count
    const shuffled = availableProblems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return { problems, loading, error, getRandomProblems };
};