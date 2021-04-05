import React, { useContext } from 'react';
import classNames from 'classnames';
import { useLocation, useHistory } from 'react-router';
import { connect } from 'react-redux';
import { RouterPaths } from 'src/core/enum';
import { LOCAL_STORAGE } from 'src/core/store/values';

import AppContext from 'src/components/AppContext';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import companyActions from 'src/store/company/actions';

import { CardAccountTypes } from 'src/components/molecules/Cards/CardAccount/types';
import { CompaniesTypes } from 'src/store/company/types';
import 'src/components/molecules/Cards/CardAccount/index.scss';

function CardAccount(props: CardAccountTypes.IProps) {
  const {
    className, handleCloseClick, onClickLogout,
    image, setPageLoading, onChangeAccountClick,
    companies = { data: [], loading: false },
    fullName, email,
  } = props;
  const location = useLocation();
  const history = useHistory();
  const { setCompanyId } = useContext(AppContext);
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';

  const getAmountNotifications = (notifications: number) => notifications < 100 ? notifications : '99+';

  const onCompanyClick = (newCompany: CompaniesTypes.IRenderProps) => {
    if ((companyId !== `${newCompany.id}`)) {
      setCompanyId(newCompany.id);
      localStorage.setItem(LOCAL_STORAGE.COMPANY_UUID, newCompany.uuid);
      localStorage.setItem(LOCAL_STORAGE.COMPANY_ID, `${newCompany.id}`);
      setPageLoading && setPageLoading(true);
      setTimeout(
        () => {
          setPageLoading && setPageLoading(false);
          const paths = location.pathname.split('/');
          if (paths.includes('admin')) {
            history.push('/dashboard');
            return;
          }

          const index = paths.findIndex(item => ['knowledge-base', 'education', 'tasks-feed'].includes(item));
          if (index >= 0 && index !== paths.length - 1) {
            if (paths[index + 1] === 'course') {
              history.push(`/${paths[index]}?type=courses`);
            } else {
              history.push(`/${paths[index]}`);
            }
            return;
          }
        },
        1000,
      );
    }
    handleCloseClick && handleCloseClick();
  };

  return (
    <div className={classNames('card-account d-flex flex-column', className)}>
      <div className="card-account__header pt-24 px-16 pb-16 d-flex">
        <Image alt="user image" src={image} className="card-account__user-image mr-8" />
        <div className="d-flex flex-column align-items-start">
          <Typography variant="subtext">{fullName}</Typography>
          <Typography variant="xsmall" color="grey_additional_2" className="mt-4">{email || '-'}</Typography>
          <Button variant="subtext mt-16" type="link" to={`/${RouterPaths.PROFILE}`}>Профиль</Button>
        </div>
      </div>
      <div className="card-account__company-block">
        {Array.isArray(companies.data) && companies.data.map(company =>  (
          <div
            key={company.id}
            className={classNames(
              'card-account__company d-flex align-items-center py-8 px-16',
              { 'card-account__company--active': `${company.id}` === companyId },
            )}
            onClick={() => onCompanyClick(company)}
          >
            <div className="company__image-wrapper pos_relative mr-8">
              <Image alt="company" src={company.logoThumbnailUrl || ''} className="company__image fill" />
              {(company.notifications > 0) && (
                <Typography
                  variant="xsmall"
                  color="whiter"
                  className={classNames(
                    'company__notifications pos_absolute',
                    company.notifications > 9 && (company.notifications < 100 ?
                      'company__notifications--medium' : 'company__notifications--large'),
                  )}
                >
                  {getAmountNotifications(company.notifications)}
                </Typography>
              )}
            </div>
            <Typography variant="subtext">{company.name}</Typography>
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-between py-16 px-24">
        <Button
          variant="xsmall"
          type="link-black"
          onClick={onChangeAccountClick}
        >
          Сменить аккаунт
        </Button>
        <Button variant="xsmall" type="link-grey" onClick={onClickLogout}>Выход</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  companyId: state.companyReducer.companyId,
});

const mapDispatchToProps = {
  setCompanyId: companyActions.setCompanyId,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(CardAccount);
