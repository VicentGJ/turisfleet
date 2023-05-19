export const durationObjToStr = (duration: object): string => {
  let result = "";
  Object.entries(duration).forEach(([key, value]) => {
    result += `${value} ${key} `;
  });
  return result.trim();
};

export const durationStrToObj = (duration: string): object => {
  let result: any = {
    days: "",
    hours: "",
    minutes: "",
  };
  const arr = duration.trim().split(" ");
  for (let i = 0; i < arr.length; i += 2) {
    let key = arr[i + 1];
    let value = parseInt(arr[i]);
    result[key] = value;
  }

  return result;
};

const pdfmakereport = () => {};
