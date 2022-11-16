import { useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState(false);

  const showAlert = () => {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return { alert, showAlert };
};

export default useAlert;
