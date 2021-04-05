import React from 'react';
import Modal from 'src/components/molecules/Modal';
import Button from 'src/components/atoms/Button';
import { QuizTypes } from 'src/pages/GamePages/Course/Quiz/types';
import ImageCertificate from 'src/components/atoms/ImageCertificate';
import Typography from 'src/components/atoms/Typography';
import { RouterPaths } from 'src/core/enum';

function ModalCourseExamSuccess(props: QuizTypes.IModalCourseExamSuccess) {
  const { imageUrl, onCloseClick, courseName, percent, userName } = props;
  return (
    <Modal
      width={495}
      title="Поздравляем, вы прошли все модули курса!"
      titleVariant="h1"
      onCloseClick={onCloseClick}
    >
      <div className="px-32 py-24 d-flex flex-column">
        <ImageCertificate
          bgImage={imageUrl}
          gameName={courseName}
          userName={userName}
        />
        <Typography variant="textmed" className="mt-24 mb-16">{courseName}</Typography>
        {/*todo make correct cnt*/}
        <div className="mb-8">
          <Typography variant="subtext" color="grey_additional_2" className="mr-4">Правильные ответы:</Typography>
        </div>
        <div>
          <Typography variant="subtext" color="grey_additional_2" className="mr-4">Ваша оценка:</Typography>
          <Typography variant="textmed" color="main_50" className="mr-4">{percent} %</Typography>
        </div>
        <Button className="py-16 mt-24" to={`/${RouterPaths.DASHBOARD}`}>На главную</Button>
      </div>
    </Modal>
  );
}

export default ModalCourseExamSuccess;
