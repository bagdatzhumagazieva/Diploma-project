import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Layout from 'src/components/organisms/Layout';
import CourseCreationChoice from 'src/pages/AdminPages/Course/CourseCreationChoicePage/CourseCreationChoice';
import { AdminRouterPaths } from 'src/core/enum';
import { CREATION_METHOD } from 'src/pages/AdminPages/Course/CourseCreationChoicePage/consts';
import 'src/pages/AdminPages/Course/CourseCreationChoicePage/index.scss';

function CourseCreationChoicePage() {
  const [selectedCreationMethod, setSelectedCreationMethod] = useState<string>('');

  return (
    <Layout isAdminRouting className="course-creation-choice-page">
      <div className="grid py-32 d-flex flex-column">
        <Typography variant="headline" className="mb-32">Создание курса</Typography>
        <CourseCreationChoice handleSelectedMethod={setSelectedCreationMethod} />
        <div className="align-self-end d-flex align-items-center mt-32">
          <Button
            variant="textmed"
            type="link-black"
            to={`/admin/${AdminRouterPaths.CONTENT}`}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            className="course-creation-choice-page__next-button ml-24"
            disabled={CREATION_METHOD.microlearning !== selectedCreationMethod}
            to={CREATION_METHOD.microlearning === selectedCreationMethod ?
              `/admin/${AdminRouterPaths.COURSE_CREATION}` : undefined}
          >
            Далее
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default CourseCreationChoicePage;
