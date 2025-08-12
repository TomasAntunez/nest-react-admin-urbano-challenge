import { useState } from 'react';

import { useDebounce } from './use-debounce.hook';

export const useDebounceState = <T>(value: T, delay?: number) => {
  const [state, setState] = useState(value);
  const debouncedValue = useDebounce(state, delay);

  return [state, debouncedValue, setState] as const;
};
