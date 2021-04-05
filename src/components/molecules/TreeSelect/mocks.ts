import { ITreeOption } from 'src/components/molecules/TreeSelect/types';

export const ExampleTreeOptions: ITreeOption[] = [
  {
    value: 'root',
    name: 'ROOT',
    children: [
      {
        value: 'filial1',
        name: 'step1',
        disabled: true,
        children: [
          {
            value: 'podfilial1',
            name: 'step11',
          },
          {
            value: 'podfilial2',
            name: 'step12',
            children: [
              {
                value: 'podd',
                name: 'step121',
              },
              {
                value: 'podd421',
                name: 'step122',
                children: [
                  {
                    value: '123123',
                    name: 'step1221',
                  },
                ],
              },
              {
                value: 'podd1',
                name: 'step123',
              },
              {
                value: 'podd2',
                name: 'step124',
              },
            ],
          },
        ],
      },
      {
        value: 'filial2',
        name: 'step2',
        children: [
          {
            value: 'podfilial3',
            name: 'step21',
            children: [
              {
                value: 'asd',
                name: 'step211',
              },
              {
                value: 'asdw',
                name: 'tep212',
                disabled: true,
              },
            ],
          },
          {
            value: 'sad',
            name: 'step22',
          },
        ],
      },
      {
        value: 'filial3',
        name: 'step3',
        children: [
          {
            value: 'podfilial4',
            name: 'step31',
            children: [
              {
                value: 'filial5',
                name: 'step311',
              },
            ],
          },
        ],
      },
    ],
  },
];
