import { useState } from 'react';

const useActiveButton = () => {
  const [state, setState] = useState(false);

  const toggleHandler = () => {
    setState(!state);
  };

  return { state, toggleHandler };
};

export default useActiveButton;
