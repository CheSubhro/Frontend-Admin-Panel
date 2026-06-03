

import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const localValue = localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage key:", key, error);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;