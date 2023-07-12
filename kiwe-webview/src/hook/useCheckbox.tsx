import { useState } from 'react';

type CheckboxHook = [boolean, () => void];

const useCheckbox = (initialState: boolean): CheckboxHook => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleCheckboxChange = (): void => {
    setIsChecked(!isChecked);
  };

  return [isChecked, handleCheckboxChange];
};

export default useCheckbox;
