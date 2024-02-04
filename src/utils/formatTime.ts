const formatTime = (time: number) => {
  if (!time) return '0h 0m';

  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};

export default formatTime;
