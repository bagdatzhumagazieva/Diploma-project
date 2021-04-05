import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export namespace TaskContentTypes {
  export interface IProps {
    companyId: number;
    handleCardCreateClick(e: 'create' | 'edit'): void;
    setCurrentEditCard(id: number): void;
    cards: ICard[];
    setCard(card: ICard[]): void;
  }

  export interface TestQuizProps {
    companyId: number;
    cards: ICard[];
    setIsDisableContentBtn?(data: boolean): void;
    setCurrentEditCard(id: number): void;
    setCard(card: ICard[]): void;
    handleCardCreateClick(type: 'edit' | 'create'): void;
  }

  export interface ArticleAudioVideoProps {
    companyId: number;
    cards: ICard[];
    setCard(card: ICard[]): void;
    setCurrentEditCard(id: number): void;
    handleCardCreateClick(type: 'edit' | 'create'): void;
  }
}
