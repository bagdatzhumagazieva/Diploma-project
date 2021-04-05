import React from 'react';

export interface IData {
  companyUuid: string;
  companyId: number;
  token: string;
}
interface IProps {
  data: IData;
  setData(data: IData): void;
}

export const defaultData: IData = {
  companyUuid: '',
  companyId: -1,
  token: '',
};

const defaultValues: IProps = {
  data: defaultData,
  setData: (data: IData) => {},
};

export const CardAccountContext = React.createContext(defaultValues);
