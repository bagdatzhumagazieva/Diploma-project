import { useContext } from 'react';
import NotificationContext from 'src/components/molecules/Notification/NotificationContext';

function useNotification() {
  const context = useContext(NotificationContext);

  return {
    add: context.add,
    remove: context.remove,
    addStateNotification: context.addStateNotification,
  };
}

export default useNotification;
