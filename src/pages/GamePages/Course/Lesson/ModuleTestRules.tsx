import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { LessonPageTypes } from 'src/pages/GamePages/Course/Lesson/types';

function ModuleTestRules(props: LessonPageTypes.IModuleListRules) {
  return (
    <div className="module-test-rules d-flex flex-column px-32">
      <Typography variant="text" className="mb-32">
        Модальный тест  - это проверка ваших знаний. После успешного
        прохождения вы можете получить доступ к следующему модулю.
      </Typography>
      <div className="d-flex mb-24 align-items-center">
        <span className="module-test-rules__dot mr-12" />
        <Typography variant="text">
          Cледите за секундомером - на решение каждого тестового задания вам будет отведено определенное время.
        </Typography>
      </div>
      <div className="d-flex mb-24 align-items-center">
        <span className="module-test-rules__dot mr-12" />
        <Typography variant="text" className="mr-4">
          Для прохождения в следующий модуль необходимо набрать:
        </Typography>
        <Typography variant="text" color="main_50">75% и выше</Typography>
      </div>
      <div className="d-flex mb-24 align-items-center">
        <span className="module-test-rules__dot mr-12" />
        <Typography variant="text" className="mr-4">Количество вопросов:</Typography>
        <Typography variant="text" color="main_50">{props.questionsTotal}</Typography>
      </div>
      <div className="d-flex align-items-center">
        <span className="module-test-rules__dot mr-12" />
        <Typography variant="text" className="mr-4">Количество попыток:</Typography>
        <Typography variant="text" color="main_50">Неограниченное</Typography>
      </div>
    </div>
  );
}

export default ModuleTestRules;
