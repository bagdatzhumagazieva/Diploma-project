import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getCertificateDownload } from 'src/store/certificate/actions';

import Typography from 'src/components/atoms/Typography';
import { ReactComponent as LockIcon } from 'src/assets/img/icons/lock.svg';
import { ReactComponent as FlagIcon } from 'src/assets/img/icons/flag.svg';
import { MainInfoTypes } from 'src/components/organisms/CourseDetail/MainInfo/types';
import { ReactComponent as Unlock } from 'src/assets/img/icons/unlock.svg';
import { ProgressStatus } from 'src/store/course/types';
import IconCertificate from 'src/components/atoms/IconCertificate';
import Button from 'src/components/atoms/Button';
import { RouterPaths } from 'src/core/enum';

// todo make statuses
function CardFinalExam(props: MainInfoTypes.ICardFinalExam) {
  const  { examStatus, courseId, variant, certificateId, getCertificateDownload } = props;

  const onCertificateDownloadClick = () => {
    if (getCertificateDownload && certificateId) {
      getCertificateDownload(certificateId);
    }
  };

  const getIcon = () => {
    if (['admin', 'preview'].includes(variant) || examStatus === ProgressStatus.NOT_STARTED) {
      return <LockIcon width="24" height="24" className="lock-icon" />;
    }
    if (examStatus === ProgressStatus.IN_PROGRESS) return  <Unlock width="24" height="24" />;
    if (examStatus === ProgressStatus.FAIL) return <Typography variant="text" color="red">Провален</Typography>;
    if (examStatus === ProgressStatus.SUCCESS) return <IconCertificate onClick={onCertificateDownloadClick} />;
    return <LockIcon width="24" height="24" className="lock-icon" />;
  };

  return (
    <div className={classNames(
      'card-final-exam mb-24 p-24 d-flex align-items-center justify-content-between',
      { 'card-final-exam--disabled': examStatus === ProgressStatus.NOT_STARTED },
      { 'pointer-events-none': variant !== 'web' },
    )}>
      <div className="d-flex align-items-center">
        <FlagIcon className="mr-16" />
        <Button
          type="link-black"
          variant="h2"
          color={examStatus === ProgressStatus.NOT_STARTED ? 'grey_additional_2' : 'blacker'}
          to={`/${RouterPaths.COURSE}/${courseId}/exam`}
        >
          Финальный экзамен
        </Button>
      </div>
      {getIcon()}
    </div>
  );
}

export const mapDispatchToProps = {
  getCertificateDownload,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(CardFinalExam);
