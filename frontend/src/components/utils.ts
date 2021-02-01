// Only used for demo instance
export const getRandomNumber = (min: number, max: number, interval: number): number => {
  if (typeof interval === 'undefined') interval = 1;
  const r = Math.floor((Math.random() * (max - min + interval)) / interval);
  return r * interval + min;
};
