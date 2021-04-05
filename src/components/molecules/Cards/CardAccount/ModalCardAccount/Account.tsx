import React, { useState, useContext } from 'react';
import classNames from 'classnames';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Arrow from 'src/components/atoms/Svg/Table/filterArrow';
import AvatarImage from 'src/components/atoms/AvatarImage';
import {
  CardAccountContext,
  IData,
} from 'src/components/molecules/Cards/CardAccount/ModalCardAccount/CardAccountContext';
import { AccountTypes } from 'src/components/molecules/Cards/CardAccount/ModalCardAccount/types';

function Account(props: AccountTypes.IProps) {
  const {
    id, fullName, imageThumbnailUrl, companies,
    token, email,
  } = props;
  const [showCompanies, setShowCompanies] = useState(false);
  const { setData, data } = useContext(CardAccountContext);
  // const getAmountNotifications = (notifications: number) => notifications < 100 ? notifications : '99+';

  const onChangeClick = (companyId: number, companyUuid: string) => {
    const data: IData = {
      token,
      companyId,
      companyUuid,
    };
    setData(data);
  };

  return (
    <div key={id} className="text-left">
      <div
        className="px-32 py-24 modal-card-account__user-data pos_relative d-flex align-items-center"
        onClick={() => setShowCompanies(!showCompanies)}
      >
        <AvatarImage src={imageThumbnailUrl} className="user-data__image mr-8" />
        <div className="d-flex flex-column">
          <Typography variant="text" className="mb-4">{fullName}</Typography>
          <Typography variant="xsmall" color="grey_additional_2">{email}</Typography>
        </div>
        <Arrow className={classNames(
          'user-data___arrow pos_absolute',
          { 'user-data___arrow--open': showCompanies },
        )}/>
      </div>
      {showCompanies && (
        <div className="py-16">
          {companies.map(company => (
            <div
              key={company.id}
              className={classNames(
                'modal-card-account__company d-flex align-items-center py-8 cursor-pointer',
                { 'modal-card-account__company--active': data.token === token && data.companyId === company.id},
              )}
              onClick={() => onChangeClick(company.id, company.uuid)}
            >
              <div className="modal-card-account__company-image pos_relative mr-8 pos_relative">
                <Image alt="company" src={company.imageThumbnail} className="fill" />
                {/*{company.notifications && (*/}
                {/*    <Typography*/}
                {/*      variant="xsmall"*/}
                {/*      color="whiter"*/}
                {/*      className={classNames(*/}
                {/*        'company__notifications pos_absolute',*/}
                {/*        company.notifications > 9 && (company.notifications < 100 ?*/}
                {/*          'company__notifications--medium' : 'company__notifications--large'),*/}
                {/*      )}*/}
                {/*    >*/}
                {/*      {getAmountNotifications(company.notifications)}*/}
                {/*    </Typography>*/}
                {/*)}*/}
              </div>
              <Typography variant="subtext">{company.name}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
