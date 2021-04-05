import { createContext } from 'react';

const RubricTreeContext = createContext<
  {activeId?: string, setActiveId(activeId?: string): void}
>({ activeId: '', setActiveId: (activeId: string) => {} });

export default RubricTreeContext;
