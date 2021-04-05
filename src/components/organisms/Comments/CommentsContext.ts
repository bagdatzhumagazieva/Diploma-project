import { createContext } from 'react';

interface IProps {
  curParentId: number;
  setCurParentId(parentId: number): void;
}

const defaultValues: IProps = {
  curParentId: -1,
  setCurParentId: (id: number) => {},
};

export default createContext<IProps>(defaultValues);
