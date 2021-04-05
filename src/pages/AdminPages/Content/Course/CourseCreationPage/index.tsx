import React from 'react';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

import Layout from 'src/components/organisms/Layout';
import CourseCreationEdition from 'src/components/organisms/CourseCreationEdition';
import { CourseCreationPageTypes } from 'src/pages/AdminPages/Course/CourseCreationPage/types';

function CourseCreationPage(props: CourseCreationPageTypes.IProps) {
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  return (
    <Layout isAdminRouting className="color_grey_background__bg" childrenClassName="pb-48">
      <CourseCreationEdition
        companyId={companyId}
        type="create"
      />
    </Layout>
  );
}

export default CourseCreationPage;
