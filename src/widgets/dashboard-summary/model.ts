export const MOCK_SUMMARY = {
  totalBoards: 3,
  totalBoardsChange: "+1 from last month",
  completedTasks: 12,
  completedTasksChange: "15% increase",
  activeGoals: 24,
  activeGoalsChange: "Across 3 boards",
  overallProgress: 32,
  overallProgressChange: "+4% this week",
};

export const useSummaryStats = () => {
  return {
    data: MOCK_SUMMARY,
    isLoading: false,
    error: null,
  };
};
