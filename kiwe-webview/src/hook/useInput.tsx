import { useState, useCallback } from 'react';

type InputData = {
  [key: string]: string;
};

type Handler = (name: string, value: string) => void;

const useInput = (initialValue: InputData | null = null): [InputData | null, Handler] => {
  // state definition
  const [data, setData] = useState<InputData | null>(initialValue);

  // function definition
  const handler: Handler = useCallback((name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  return [data, handler];
};

export default useInput;
