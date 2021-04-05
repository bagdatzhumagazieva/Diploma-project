import React from 'react';

const NotificationContext = React.createContext({
  step: 0, setStep: (step: number) => {} },
);

export default NotificationContext;
