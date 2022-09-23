export const calculateCourseDeadline = (date) => {
  let year = date.getFullYear();
  date.setFullYear(year + 1);
  return date.toISOString().substring(0, 10);
};

export const calculateDaysToDate = (date) => {
  let now = Date.now();
  let difference = Date.parse(date) - now;
  let days = Math.round(difference / 86400000);
  if (days < 0) {
    return 0;
  }
  return days;
};

export const calculateRemainingGoal = (status, target) => {
  let remaining = 100 - status;
  let raw_time = (remaining / 100) * target;
  let time = [];
  time[0] = Math.floor(raw_time) < 0 ? 0 : Math.floor(raw_time);
  time[1] =
    Math.floor(raw_time) < 0 ? 0 : Math.round((raw_time - time[0]) * 60);
  return time;
};
