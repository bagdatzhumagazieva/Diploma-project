import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import categoryActions from 'src/store/category/actions';

import Typography from 'src/components/atoms/Typography';
import Tabs from 'src/components/molecules/Tabs';
import AdminRubrics from 'src/components/organisms/AdminCategories';
import AdminTags from 'src/components/organisms/AdminTags';
import Layout from 'src/components/organisms/Layout';
import AdminCards from 'src/components/organisms/AdminCards';

import { KnowledgeBaseAdminTypes } from 'src/pages/AdminPages/KnowledgeBase/types';
import { KNOWLEDGE_BASE_TABS } from 'src/pages/AdminPages/KnowledgeBase/consts';
import { ExampleAlphabet } from 'src/components/organisms/FilterTags/mocks';
import 'src/pages/AdminPages/KnowledgeBase/index.scss';

function KnowledgeBaseAdmin(props: KnowledgeBaseAdminTypes.IProps) {
  const [activeTab, setActiveTab] = useState<string>(KNOWLEDGE_BASE_TABS[0].id);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const handleActiveTab = (id: string) => setActiveTab(id);

  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [],
  );

  const tabs = [
    <AdminCards companyId={companyId} />,
    <AdminRubrics companyId={companyId} />,
    <AdminTags companyId={companyId} alphabet={ExampleAlphabet} />,
  ];

  return (
    <Layout
      isAdminRouting
      classNames="knowledge-base-page"
    >
      <div className="knowledge-base-page__header grid py-48 d-flex flex-column">
        <Typography variant="headline" className="mb-24">База знаний</Typography>
        <Typography
          variant="text"
          color="grey_additional_2"
          className="header__subtitle"
        >
          В данном разделе вы можете создавать, удалять и редактировать: карточки, рубрики и теги.
        </Typography>
      </div>
      <Tabs
        key={activeTab}
        tabOptions={KNOWLEDGE_BASE_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        contentClassName="color_grey__bg pb-24"
      >
        {tabs.map((item, index) => (
          <div key={KNOWLEDGE_BASE_TABS[index].id}>
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  createdCategoryState: state.categoryReducer.createdCategoryState.data,
});

const mapDispatchToProps = {
  clearChangedCreatedCategoryState: categoryActions.clearChangedCreatedCategoryState,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(KnowledgeBaseAdmin));
