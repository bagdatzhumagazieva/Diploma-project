import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Account from 'src/components/molecules/Cards/CardAccount/ModalCardAccount/Account';
import {
  IData,  defaultData, CardAccountContext,
} from 'src/components/molecules/Cards/CardAccount/ModalCardAccount/CardAccountContext';

import { ModalCardAccountTypes } from 'src/components/molecules/Cards/CardAccount/types';
import { ReactComponent as IconPlus } from 'src/assets/img/icons/plus.svg';
import 'src/components/molecules/Cards/CardAccount/ModalCardAccount/index.scss';
import { LOCAL_STORAGE } from 'src/core/store/values';

function ModalCardAccount(props: ModalCardAccountTypes.IProps) {
  const { accounts = new Map(), onModalClose, setPageLoading } = props;
  const history = useHistory();
  const [data, setData] = useState<IData>(defaultData);
  const onAddNewAccountClick = () => {
    history.push('/', { addNewAccount: true });
  };
  const value = { data, setData };

  const onAccountChangeClick = () => {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, data.token);
    localStorage.setItem(LOCAL_STORAGE.COMPANY_ID, `${data.companyId}`);
    localStorage.setItem(LOCAL_STORAGE.COMPANY_UUID, data.companyUuid);
    onModalClose && onModalClose();
    setPageLoading && setPageLoading(true);
    setTimeout(
      () => {
        window.location.reload(false);
      },
      1000,
    );
  };

  return (
    <CardAccountContext.Provider value={value}>
      <div className="modal-card-account pt-64 pb-32 text-center">
        <Typography variant="h1" className="mb-16">Сменить компанию</Typography>
        <div>
          {Array.from(accounts.entries()).map((data, index) => (
            <Account
              key={index}
              token={data[0]}
              email={data[1]?.email}
              imageThumbnailUrl={data[1]?.imageThumbnailUrl}
              fullName={data[1]?.fullName}
              id={data[1]?.id}
              companies={data[1]?.companies}
            />
          ))}
        </div>
        <Button
          type="link"
          variant="subtext"
          className="modal-card-account__add d-flex align-items-center ml-32 mt-24"
          onClick={onAddNewAccountClick}
        >
          <IconPlus width={16} height={16} className="mr-8" />
          Добавить аккаунт
        </Button>
        <div className="mt-36 d-flex justify-content-end align-items-center">
          <Button
            variant="textmed"
            type="link-black"
            onClick={onModalClose}
          >
            Отмена
          </Button>
          <Button
            variant="textmed"
            className="modal-card-account__send-button"
            onClick={onAccountChangeClick}
            disabled={!data.token || data.companyId < 0 || !data.companyUuid}
          >
            Перейти
          </Button>
        </div>
      </div>
    </CardAccountContext.Provider>
  );
}

export default ModalCardAccount;
