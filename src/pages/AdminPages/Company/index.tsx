import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

import companyActions from 'src/store/company/actions';

import CompanyInfo from 'src/components/atoms/CompanyInfo';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Modal from 'src/components/molecules/Modal';
import { TableWithCheckboxes } from 'src/components/molecules/Table';
import Tabs from 'src/components/molecules/Tabs';
import Layout from 'src/components/organisms/Layout';
import CompanyGroup from 'src/components/organisms/CompanyComponents/CompanyGroups';
import CompanyStructure from 'src/components/organisms/CompanyComponents/CompanyStructure';
import CompanyEmployees from 'src/components/organisms/CompanyComponents/CompanyEmployees';

import groupActions from 'src/store/group/actions';
import CompanyInvitations from 'src/components/organisms/CompanyComponents/CompanyInvitations';
import { CompanyPageTypes } from 'src/pages/AdminPages/Company/types';
import { companyLogoThumb } from 'src/pages/AdminPages/CompanySettings/consts';
import { COMPANY_TABS } from 'src/pages/AdminPages/Company/consts';
import { GroupTypes } from 'src/store/group/types';
import 'src/pages/AdminPages/Company/index.scss';

function CompanyPage(props: CompanyPageTypes.IProps) {
  const { getCompanyById, company, companyLoading, deleteGroup, getGroups } = props;

  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const [activeTab, setActiveTab] = useState<string>(COMPANY_TABS[0].id);
  const [groupData, setGroupData] = useState<GroupTypes.IRenderProps[]>([]);
  const [selectedGroupData, setSelectedGroupData] = useState<GroupTypes.IRenderProps[]>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const { type } = queryString.parse(location.search);
  const groupsBodyParams: GroupTypes.IQueryParams = {
    companyId,
    page: 1,
    pageSize: 5,
    orderField: '',
  };

  const companyUuid = localStorage.getItem(LOCAL_STORAGE.COMPANY_UUID) || '-1';
  const handleActiveTab = (id: string) => setActiveTab(id);

  useEffect(
    () => {
      window.scrollTo(0, 0);
      getCompanyById && getCompanyById(companyId);
    },
    [companyId, getCompanyById],
  );

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  useEffect(() => {
    setSelectedGroupData(groupData.filter(
      (n: TableWithCheckboxes<GroupTypes.IRenderProps>) => n.isChecked));

  },        [groupData]);

  const onDeleteGroup = () => {
    deleteGroup && getGroups &&
    deleteGroup(selectedGroupData.map(e => e.id), 0, {
      onSuccess: () => {
        getGroups(groupsBodyParams);
      },
    });
    setIsShowDeleteModal(false);
  };

  const tabs = [
    <CompanyStructure companyId={companyId} />,
    <CompanyGroup
      companyId={companyId}
      groupData={groupData}
      setGroupData={setGroupData}
    />,
    <CompanyEmployees companyId={companyId} />,
    <CompanyInvitations companyId={companyId} />,
  ];

  const onCloseClick = () => {
    setSelectedGroupData([]);
    setGroupData(groupData.map(
      (n: TableWithCheckboxes<GroupTypes.IRenderProps>) => n.isChecked ? { ...n, isChecked: false } : n));
  };

  return (
    <Layout
      isAdminRouting
      classNames="company-page"
      childrenClassName="pos_relative"
    >
      <CompanyInfo
        hasSettingsButton
        loading={companyLoading}
        logo={companyLogoThumb(companyUuid)}
        name={company?.name}
        address={company?.address}
        subscription={{
          name: company?.subscriptionName,
          endDate: company?.subscriptionEndDate,
        }}
        employees={{
          count: company?.employeesCount,
          maxLimit: company?.maxUsers,
        }}
      />
      <Tabs
        pathname={pathname}
        key={activeTab}
        tabOptions={COMPANY_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        className="company-page__tabs flex-grow-1"
        contentClassName="color_grey__bg py-32"
      >
        {tabs.map((item, index) => (
          <div key={COMPANY_TABS[index].id}>
            {item}
          </div>
        ))}
      </Tabs>
      {selectedGroupData.length ? (
        <div className="d-flex justify-content-between company-page__drawer">
          <Typography variant="text">Карточек: {selectedGroupData.length}</Typography>
          <div className="d-flex">
            <Typography
              variant="subtext"
              className="cursor-pointer mt-4"
              onClick={() => setIsShowDeleteModal(true)}
            >
              Удалить
            </Typography>
            <Button
              type="link"
              onClick={onCloseClick}
              className="ml-64"
            >
              <CancelIcon color={'#B0BAC9'} />
            </Button>
          </div>
        </div>
      ) : ''}
      {isShowDeleteModal && (
        <Modal
          width={422}
          title="Удаление групп"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={() => setIsShowDeleteModal(false)}
          onDeleteClick={onDeleteGroup}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="subtext" className="mb-24">
              Вы действительно хотите удалить выбранные {`группы(${selectedGroupData.length || ''})`} ?
            </Typography>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  company: state.companyReducer.company.data,
  companyLoading: state.companyReducer.company.loading,
});

const mapDispatchToProps = {
  getCompanyById: companyActions.getCompanyById,
  deleteGroup: groupActions.deleteGroup,
  getGroups: groupActions.getGroups,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyPage);
