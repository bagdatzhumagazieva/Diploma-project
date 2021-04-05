import { IRubric } from 'src/components/molecules/RubricTree/types';

export const ExampleRubricTree:IRubric =
  {
    id: 'rootAloha',
    title: 'Бухгалтерия (123)',
    amount: 222,
    subRubrics: [
      {
        id: 'aloha dancer',
        title: 'Финансовая отчетность',
        amount: 123,
        subRubrics: [
          {
            id: 'aloha dancer child',
            title: 'Отчет о прибылях sadf',
            amount: 49,
          },
          {
            id: 'aloha dancer child2',
            title: 'Отчёт о движении денежных средств (64)',
            amount: 74,
          },
        ],
      },
      {
        id: 'not aloha dancer',
        title: 'Не Финансовая отчетность',
        amount: 99,
        subRubrics: [
          {
            id: 'not aloha dancer child',
            title: 'Отчет не о прибылях',
            amount: 59,
          },
          {
            id: 'not aloha dancer child2',
            title: 'Отчёт не о движении денежных средств (64)',
            amount: 40,
          },
        ],
      },
    ],
  };

export const ExampleGroupRubricTree:IRubric[] = [
  { ...ExampleRubricTree },
  {
    id: 'rootAloha2',
    title: 'Alohich2',
    amount: 200,
    subRubrics: [
      {
        id: 'alohaDancer2',
        title: 'НЕ Финансовая отчетность',
        amount: 44,
        subRubrics: [
          {
            id: 'alohaDancerChild21',
            title: 'Отчет о прибылях sadf',
            amount: 20,
          },
          {
            id: 'alohaDancerChild22',
            title: 'Отчёт о движении денежных средств (64)',
            amount: 24,
          },
        ],
      },
      {
        id: 'notAlohaDancer2',
        title: 'Не Финансовая отчетность',
        amount: 156,
        subRubrics: [
          {
            id: 'notAlohaDancerChild21',
            title: 'Отчет не о прибылях',
            amount: 59,
          },
          {
            id: 'notAlohaDancerChild212',
            title: 'Отчёт не о движении денежных средств (64)',
            amount: 97,
          },
        ],
      },
    ],
  },
];
