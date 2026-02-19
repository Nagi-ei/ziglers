export const MOCK_PROGRESS_DATA = [
  { month: "Jan", progress: 15 },
  { month: "Feb", progress: 22 },
  { month: "Mar", progress: 18 },
  { month: "Apr", progress: 35 },
  { month: "May", progress: 28 },
  { month: "Jun", progress: 32 },
];

export const MOCK_STATUS_DATA = [
  { status: "completed", value: 35, fill: "var(--color-completed)" },
  { status: "inProgress", value: 45, fill: "var(--color-inProgress)" },
  { status: "pending", value: 20, fill: "var(--color-pending)" },
];

export const useChartData = () => {
  return {
    progressData: MOCK_PROGRESS_DATA,
    statusData: MOCK_STATUS_DATA,
  };
};
