import { IQuestion, MicroLearningQuizTypes } from 'src/components/molecules/MicroLearningQuiz/types';

export const ExampleMicroLearningQuiz: MicroLearningQuizTypes.IProps = {
  id: 'id1',
  title: 'Маркетинговые коммуникации это?',
  options: [
    { id: 'first', title: 'PR-деятельность' },
    { id: 'second', title: 'Одна из основных и сложных частей комплекса' },
    { id: 'third', title: 'Комплекс деятельностей' },
  ],
  correctAnswerId: 'first',
  showAnswer: false,
  showButtonPressed: false,
};

export const ExampleGroupMicroLeaningQuiz: IQuestion[] = [
  {
    id: 'id2',
    title: 'Маркетинговые коммуникации это?',
    options: [
      { id: 'first', title: 'PR-деятельность' },
      { id: 'second', title: 'Одна из основных и сложных частей комплекса' },
      { id: 'third', title: 'Комплекс деятельностей' },
    ],
    correctAnswerId: 'first',
  },
  {
    id: 'id3',
    title: 'Маркетинговые коммуникации это?',
    options: [
      { id: 'first', title: 'PR-деятельность' },
      { id: 'second', title: 'Одна из основных и сложных частей комплекса' },
      { id: 'third', title: 'Комплекс деятельностей' },
    ],
    correctAnswerId: 'first',
  },
  {
    id: 'id4',
    title: 'Маркетинговые коммуникации это?',
    options: [
      { id: 'first', title: 'PR-деятельность' },
      { id: 'second', title: 'Одна из основных и сложных частей комплекса' },
      { id: 'third', title: 'Комплекс деятельностей' },
    ],
    correctAnswerId: 'first',
  },
  {
    id: 'id5',
    title: 'Маркетинговые коммуникации это?',
    options: [
      { id: 'first', title: 'PR-деятельность' },
      { id: 'second', title: 'Одна из основных и сложных частей комплекса' },
      { id: 'third', title: 'Комплекс деятельностей' },
    ],
    correctAnswerId: 'first',
  },
];
