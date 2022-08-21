type Debounce = (
  fn: (args: any) => any,
  delay?: number
) => (...args: any[]) => void;

// Debounce Input Search Func
export const debounceInputSearch: Debounce = (fn, delay = 1200) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (text: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(text);
    }, delay);
  };
};
