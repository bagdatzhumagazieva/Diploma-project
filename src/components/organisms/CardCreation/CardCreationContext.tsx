import { createContext } from 'react';

const CardCreationContext = createContext({ isIncludedInBase: false, isQuizCard: false });

export default CardCreationContext;
