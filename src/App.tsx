import React, { useState, useEffect } from 'react';
import { Brain, Calendar, Sparkles, LogOut } from 'lucide-react';
import { Mood, EnergyLevel, Problem, SolvedProblem, SessionLog as SessionLogType } from './types';
import { useProblems } from './hooks/useProblems';
import { useLocalStorage } from './hooks/useLocalStorage';
import LoginForm from './components/LoginForm';
import MoodSelector from './components/MoodSelector';
import EnergySelector from './components/EnergySelector';
import TopicSelector from './components/TopicSelector';
import ProblemCard from './components/ProblemCard';
import SessionLog from './components/SessionLog';
import MotivationalQuote from './components/MotivationalQuote';

function App() {
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>('current-user', null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [recommendedProblems, setRecommendedProblems] = useLocalStorage<Problem[]>('recommended-problems', []);
  const [problemsGenerated, setProblemsGenerated] = useLocalStorage<boolean>('problems-generated', false);
  const [solvedProblems, setSolvedProblems] = useLocalStorage<SolvedProblem[]>('solved-problems', []);
  const [sessionLogs, setSessionLogs] = useLocalStorage<SessionLogType[]>('session-logs', []);
  
  const { problems, loading, error, getRandomProblems } = useProblems();

  // Generate stable problems only when all selections are made and problems haven't been generated yet
  useEffect(() => {
    if (selectedMood && selectedEnergy && selectedTopic && !loading && Object.keys(problems).length > 0 && !problemsGenerated) {
      const solvedTitles = solvedProblems.map(p => p.title);
      const newProblems = getRandomProblems([selectedTopic], solvedTitles, 3);
      setRecommendedProblems(newProblems);
      setProblemsGenerated(true);
    }
  }, [selectedMood, selectedEnergy, selectedTopic, problems, loading, solvedProblems, getRandomProblems, problemsGenerated, setRecommendedProblems, setProblemsGenerated]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    resetSession();
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleEnergySelect = (energy: EnergyLevel) => {
    setSelectedEnergy(energy);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleMarkSolved = (problem: Problem, topic: string) => {
    const newSolvedProblem: SolvedProblem = {
      title: problem.title,
      topic,
      link: problem.leetcode_link,
      date: new Date().toISOString(),
      mood: selectedMood!,
      energy: selectedEnergy!
    };

    const newSessionLog: SessionLogType = {
      mood: selectedMood!,
      energy: selectedEnergy!,
      timestamp: new Date().toISOString(),
      problemTitle: problem.title,
      topic
    };

    setSolvedProblems(prev => [...prev, newSolvedProblem]);
    setSessionLogs(prev => [...prev, newSessionLog]);

    // Remove solved problem from recommendations and get a new one
    const updatedRecommendations = recommendedProblems.filter(p => p.title !== problem.title);

    if (selectedTopic) {
      const solvedTitles = [...solvedProblems.map(p => p.title), problem.title];
      const newProblems = getRandomProblems([selectedTopic], solvedTitles, 1);
      if (newProblems.length > 0) {
        setRecommendedProblems([...updatedRecommendations, ...newProblems]);
      } else {
        setRecommendedProblems(updatedRecommendations);
      }
    } else {
      setRecommendedProblems(updatedRecommendations);
    }
  };

  const resetSession = () => {
    setSelectedMood(null);
    setSelectedEnergy(null);
    setSelectedTopic(null);
    setRecommendedProblems([]);
    setProblemsGenerated(false);
  };

  // Show login form if user is not logged in
  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading Problems</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">
                MindDSA - Welcome, {currentUser}!
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
              {(selectedMood || selectedEnergy || selectedTopic) && (
                <button
                  onClick={resetSession}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  New Session
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mood-Aware Coding Scheduler
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let your current mood guide your DSA practice. Choose problems that match your mental state for optimal learning.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mood, Energy, and Topic Selection */}
          <div className="space-y-6">
            <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
            {selectedMood && (
              <EnergySelector selectedEnergy={selectedEnergy} onEnergySelect={handleEnergySelect} />
            )}
            {selectedMood && selectedEnergy && (
              <TopicSelector selectedTopic={selectedTopic} onTopicSelect={handleTopicSelect} />
            )}
          </div>

          {/* Middle Column - Problems and Quote */}
          <div className="space-y-6">
            {selectedMood && selectedEnergy && selectedTopic && (
              <>
                <MotivationalQuote mood={selectedMood} energy={selectedEnergy} />
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-yellow-500" size={24} />
                    <h3 className="text-2xl font-bold text-gray-800">
                      Recommended Problems
                    </h3>
                  </div>
                  
                  {recommendedProblems.length > 0 ? (
                    <div className="space-y-4">
                      {recommendedProblems.map((problem, index) => {
                        return (
                          <ProblemCard
                            key={`${problem.title}-${index}`}
                            problem={problem}
                            topic={selectedTopic}
                            onMarkSolved={handleMarkSolved}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No new problems available for the selected topic.
                      </p>
                      <p className="text-sm text-gray-400">
                        You've solved all available problems! Try a different topic or check back later.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Session Log */}
          <div>
            <SessionLog sessions={sessionLogs} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Made with ❤️ for mindful coding practice
            </p>
            <p className="text-sm">
              Your mood matters. Your progress matters. You matter.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;