import React from 'react';
import { withRouter } from 'react-router';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

import Layout from 'src/components/organisms/Layout';
import CourseCreationEdition from 'src/components/organisms/CourseCreationEdition';
import { CourseEditionPageTypes } from 'src/pages/AdminPages/Course/CourseEditionPage/types';

function CourseEditionPage(props: CourseEditionPageTypes.IProps) {
  const { history } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const courseId = history.location.pathname.split('/').pop() || '';

  if (window.performance) {
    if (performance.navigation.type === 1) {
      if (history.location.state) {
        history.replace({ ...history.location, state: undefined });
      }
    }
  }

  return (
    <Layout isAdminRouting className="color_grey_background__bg" childrenClassName="pb-48">
      <CourseCreationEdition
        type="edit"
        companyId={companyId}
        courseId={typeof +courseId === 'number' ? +courseId : undefined  }
        state={history.location.state}
      />
    </Layout>
  );
}

export default withRouter(CourseEditionPage);
