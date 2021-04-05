import React from 'react';
import { useHistory } from 'react-router';

import Image from 'src/components/atoms/Image';
import Modal from 'src/components/molecules/Modal';
import { ModuleTestTypes } from 'src/pages/GamePages/Course/Test/types';
import SuccessIcon from 'src/assets/img/test/success.svg';
import FailIcon from 'src/assets/img/test/fail.svg';
import Typography from 'src/components/atoms/Typography';

function ModalTestResult(props: ModuleTestTypes.ModalTestResult) {
  const {
    isSuccess, courseId, curModuleId, nextModuleId,
    curModuleFirstCardId, isLastModule, type,
  } = props;
  const history = useHistory();

  const getNextLink = () => {
    if (type === 'course') {
      if (!curModuleId || !curModuleFirstCardId) return `/education/course/${courseId}`;
      return `/education/course/${courseId}/module/${curModuleId}/card/${curModuleFirstCardId}`;
    }
    if (isSuccess) {
      return !isLastModule ? `/education/course/${courseId}/module/${nextModuleId || ''}` : `/education/course/${courseId}`;
    }
    if (!curModuleId || !curModuleFirstCardId) return `/education/course/${courseId}`;
    return `/education/course/${courseId}/module/${curModuleId}/card/${curModuleFirstCardId}`;
  };

  const getCancelLabel = () => {
    if (isSuccess && isLastModule) return 'На главную';
    return 'К урокам';
  };

  const getCancelLink = () => {
    if (type === 'course') return `/education/course/${courseId}`;
    if (isSuccess && isLastModule) return '/dashboard';
    return `/education/course/${courseId}/module/${curModuleId}`;
  };

  const getNextLabel = () => {
    if (isSuccess) {
      return !isLastModule ? 'Следующий модуль' : 'К странице курса';
    }
    return type === 'course' ? 'Начать Курс заново' : 'Начать модуль заново';
  };

  const getModalTitle = () => {
    if (type === 'course') return 'Экзамен не пройден!';
    return isSuccess ? 'Поздравляем!' : 'Модуль не усвоен!';
  };

  return (
    <Modal
      withSaveBtnArrow
      withCloseIcon={false}
      title={getModalTitle()}
      width={496}
      cancelLabel={getCancelLabel()}
      saveLabel={getNextLabel()}
      onCloseClick={() => history.push(getCancelLink())}
      onSaveClick={() => history.push(getNextLink())}
    >
      <div className="px-32 text-center">
        <Image
          alt="success icon"
          src={isSuccess ? SuccessIcon : FailIcon}
          className="my-24"
        />
        {type === 'course' && (
          <Typography variant="textmed" className="mt-24 text-left">
            Пожалуйста, повторите материал и попробуйте
            сдать экзамен еще раз”
          </Typography>
        )}
      </div>
    </Modal>
  );
}

export default ModalTestResult;
