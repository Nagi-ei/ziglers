export const MOCK_BOARDS = [
  {
    id: "1",
    title: "2025 Career Goals",
    progress: 45,
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Health & Fitness",
    progress: 72,
    updatedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Learning Japanese",
    progress: 28,
    updatedAt: "3 days ago",
  },
];

export const useBoardsList = () => {
  return {
    data: MOCK_BOARDS,
    isLoading: false,
    error: null,
  };
};
