import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { RouterPaths } from 'src/core/enum';
import { LOCAL_STORAGE } from 'src/core/store/values';
import AppContext from 'src/components/AppContext';

import Card from 'src/components/atoms/Cards/Card';
import Typography from 'src/components/atoms/Typography';
import GroupCardCompanyChoice from 'src/components/molecules/Cards/CardCompanyChoice/GroupCardCompanyChoice';
import AuthOrangeLayout from 'src/components/molecules/AuthOrangeLayout';

import { getCompanies } from 'src/store/company/actions';
import { logout } from 'src/store/utils/actions';
import { CompanyChoiceTypes } from 'src/pages/AuthPages/CompanyChoice/types';
import './index.scss';

function CompanyChoice(props: CompanyChoiceTypes.IProps) {
  const {
    companies = { data: [], loading: false } ,
    getCompanies, logout,
  } = props;
  const { setCompanyId: appSetCompanyId } = useContext(AppContext);
  const history = useHistory();
  useEffect(
    () => {
      getCompanies && getCompanies();
    },
    [],
  );

  const setCompanyId = (id: number, uuid: string) => {
    appSetCompanyId(id);
    localStorage.setItem(LOCAL_STORAGE.COMPANY_ID, `${id}`);
    localStorage.setItem(LOCAL_STORAGE.COMPANY_UUID, uuid);
    history.push(`/${RouterPaths.DASHBOARD}`);
  };

  const onClickBack = () => {
    logout && logout();
    history.push('/');
  };

  return (
    <AuthOrangeLayout className="company-choice">
      <Card
        backLink="/"
        onClick={onClickBack}
        classNames="company-choice__card fill text-center mt-24"
      >
        <Typography variant="h1" className="mb-32">Выбор компании</Typography>
        {companies.data && (
          <GroupCardCompanyChoice
            loading={companies.loading}
            companies={companies.data}
            handleCompanyClick={setCompanyId}
          />
        )}
      </Card>
    </AuthOrangeLayout>
  );
}

const mapStateToProps = (state: any) => ({
  companies: state.companyReducer.companies,
});

const mapDispatchToProps = {
  logout,
  getCompanies,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyChoice);
