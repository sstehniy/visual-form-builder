/* eslint-disable @typescript-eslint/ban-ts-comment */
export const flat = <T>(data: T[], key: string): T[] => {
  let result: T[] = [];
  data.forEach((element) => {
    result.push(element);
    // @ts-ignore
    if (key in element && Array.isArray(element[key])) {
      // @ts-ignore
      result = [...result, ...flat(element[key] as T[], key)];
    }
  });

  return result;
};
