import { createContext } from 'react';

interface IAppContextProps {
  companyId: number | undefined;
  setCompanyId(companyId: number | undefined): void;
}

const defaultProps = {
  companyId: undefined,
  setCompanyId: (companyId: number | undefined) => {},
};

const AppContext = createContext<IAppContextProps>(defaultProps);

export default AppContext;
