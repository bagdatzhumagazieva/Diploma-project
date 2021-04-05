import React, { useState } from 'react';
import classNames from 'classnames';

import Typography from 'src/components/atoms/Typography';
import BoxIcon from 'src/components/atoms/Svg/Icons/Box';
import PenIcon from 'src/components/atoms/Svg/Icons/Pen';

import { CourseCreationChoiceTypes } from 'src/pages/AdminPages/Course/CourseCreationChoicePage/types';
import { CREATION_METHOD } from 'src/pages/AdminPages/Course/CourseCreationChoicePage/consts';
import 'src/pages/AdminPages/Course/CourseCreationChoicePage/index.scss';

function CourseCreationChoice(props: CourseCreationChoiceTypes.IProps) {
  const { handleSelectedMethod } = props;

  const [active, setActive] = useState<string>('');
  const onMethodCreationClick = (method: string) => {
    setActive(method);
    handleSelectedMethod && handleSelectedMethod(method);
  };

  return (
    <div className="course-creation-choice d-flex flex-column justify-content-center align-items-center">
      <Typography variant="h1" className="mb-40">Курс какого типа вы планируете создать</Typography>
      <div className="course-creation-choice__block d-flex justify-content-around">
        <div
          className={classNames(
            'course-creation-choice__item d-flex flex-column justify-content-center align-items-center mr-4',
            { 'course-creation-choice__item--active' : active === CREATION_METHOD.microlearning },
          )}
          onClick={() => onMethodCreationClick(CREATION_METHOD.microlearning)}
        >
          <PenIcon className="mb-24" />
          <Typography variant="h1" className="mb-16">Microlearning</Typography>
          <Typography
            color="grey_additional_1"
            variant="text"
            className="item__description text-center"
          >
            Создание курса с нуля
          </Typography>
        </div>
        <div
          className={classNames(
            'course-creation-choice__item d-flex flex-column justify-content-center align-items-center ml-4',
            { 'course-creation-choice__item--active' : active === CREATION_METHOD.scorm },
          )}
          onClick={() => onMethodCreationClick(CREATION_METHOD.scorm)}
        >
          <BoxIcon className="mb-24" />
          <Typography variant="h1" className="mb-16">SCORM</Typography>
          <Typography
            variant="text"
            className="item__description text-center"
          >
            Импортирование уже готового, стороннего курса
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default CourseCreationChoice;
