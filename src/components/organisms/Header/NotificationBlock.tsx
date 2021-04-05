import React, { useRef, useState } from 'react';

import { useOutsideClick } from 'src/hooks/useOutsideClick';

import Bell from 'src/components/atoms/Svg/Header/bell';
import ProfileNotification from 'src/components/molecules/ProfileNotification';
import { HeaderTypes } from 'src/components/organisms/Header/types';

function NotificationBlock(props: HeaderTypes.INotificationBlock) {
  const { isHasNotifications } = props;
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  useOutsideClick(divRef, () => {
    if (!showNotification) return;
    setShowNotification(false);
  });

  return (
    <div ref={divRef}>
      <Bell
        classNames="mr-32 cursor-pointer"
        isHasNotifications={isHasNotifications}
        onClick={() => setShowNotification(prevState => !prevState)}
      />
      {showNotification && (
        <ProfileNotification/>
      )}
    </div>
  );
}

export default NotificationBlock;
