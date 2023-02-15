export const differenceOfDays = (date: string) => {
  return Math.floor(
    Math.abs(new Date().valueOf() - new Date(date).valueOf()) /
      (1000 * 3600 * 24)
  );
};
