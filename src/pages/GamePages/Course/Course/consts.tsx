import React from 'react';
import { ProgressStatus } from 'src/store/course/types';
import { ReactComponent as Lock } from 'src/assets/img/icons/lock.svg';
import { ReactComponent as Done } from 'src/assets/img/icons/done.svg';
import { ReactComponent as Unlock } from 'src/assets/img/icons/unlock.svg';

export const getIcon = (variant: string, status: ProgressStatus, size: number = 24) => {
  if (['preview', 'admin'].includes(variant)) {
    return (
      <Lock
        width={size}
        height={size}
        className="lock-icon--grey"
        style={{ minWidth: size, minHeight: size }}
      />
    );
  }
  if (status === ProgressStatus.SUCCESS) {
    return (
      <div style={{ backgroundColor: '#2ABE42', width: size, height: size, borderRadius: '120px' }}>
        <Done width={size} height={size} />
      </div>
    );
  }
  if ([ProgressStatus.IN_PROGRESS, ProgressStatus.FAIL].includes(status)) {
    return (
      <Unlock
        width={size}
        height={size}
        style={{ minWidth: size, minHeight: size }}
      />
    );
  }
  return (
    <Lock
      width={size}
      height={size}
      className="lock-icon--grey"
      style={{ minWidth: size, minHeight: size }}
    />
  );
};
