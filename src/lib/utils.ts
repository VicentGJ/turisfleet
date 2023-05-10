export const durationObjToStr = (duration: object): string => {
  let result = "";
  Object.entries(duration).forEach(([key, value]) => {
    result += `${value} ${key} `;
  });
  return result.trim();
};
