'use client';
import { useEffect, useMemo, useState } from 'react';

export default function usePersistState<T>(initial_value: T, id: string): any {
  const _initial_value = useMemo(() => {
    // Check if window is defined to ensure code is running on the client side
    const local_storage_value_str = localStorage.getItem(id);
    // If there is a value stored in localStorage, use that
    if (local_storage_value_str) {
      return JSON.parse(local_storage_value_str);
    }

    // Otherwise use initial_value that was passed to the function
    return initial_value;
  }, []);

  const [state, setState] = useState(_initial_value);

  useEffect(() => {
    const state_str = JSON.stringify(state); // Stringified state
    localStorage.setItem(id, state_str); // Set stringified state as item in localStorage
  }, [state]);

  return [state, setState];
}
