import { IBranch } from 'src/components/molecules/BranchesStructure/types';

export const ExampleBranchesStructure: IBranch = {
  name: 'ROOT',
  id: 0,
  parentBranchId: 0,
  companyId: 0,
  uuid: 'uuid-0',
  subBranches: [
    {
      name: 'Almaty',
      parentBranchId: 0,
      companyId: 1,
      id: 1,
      uuid: 'uuid-1',
      parentBranch: {
        name: 'root',
        parentBranchId: 1,
        companyId: 0,
        id: 1,
        uuid: 'uuid-1',
      },
      subBranches: [
        {
          name: 'Tole bi',
          parentBranchId: 1,
          companyId: 2,
          id: 2,
          uuid: 'uuid-2',
          parentBranch: {
            name: 'Almaty',
            parentBranchId: 1,
            companyId: 1,
            id: 1,
            uuid: 'uuid-2',
          },
          subBranches: [
            {
              name: 'Obshchaga',
              parentBranchId: 1,
              companyId: 2,
              id: 3,
              uuid: 'uuid-2',
              parentBranch: {
                name: 'Almaty',
                parentBranchId: 0,
                companyId: 1,
                id: 3,
                uuid: 'uuid-3',
              },
              subBranches: [
                {
                  name: 'Room 1',
                  parentBranchId: 1,
                  companyId: 2,
                  id: 4,
                  uuid: 'uuid-4',
                  subBranches: [],
                },
                {
                  name: 'Room 2',
                  parentBranchId: 1,
                  companyId: 2,
                  id: 5,
                  uuid: 'uuid-5',
                  subBranches: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Tastak',
          parentBranchId: 1,
          companyId: 2,
          id: 6,
          uuid: 'uuid-6',
          parentBranch: {
            name: 'Almaty',
            parentBranchId: 0,
            companyId: 1,
            id: 1,
            uuid: 'uuid-5',
          },
          subBranches: [],
        },
      ],
    },
    {
      name: 'Astana',
      parentBranchId: 0,
      companyId: 2,
      id: 7,
      uuid: 'uuid-3',
      parentBranch: {
        name: 'root',
        parentBranchId: 0,
        companyId: 0,
        id: 0,
        uuid: 'uuid-7',
      },
      subBranches: [],
    },
    {
      name: 'Atyrau',
      parentBranchId: 0,
      companyId: 2,
      id: 8,
      uuid: 'uuid-20',
      parentBranch: {
        name: 'root',
        parentBranchId: 0,
        companyId: 0,
        id: 0,
        uuid: 'uuid-8',
      },
      subBranches: [
        {
          name: 'Balykshy',
          parentBranchId: 1,
          companyId: 2,
          id: 9,
          uuid: 'uuid-21',
          parentBranch: {
            name: 'Almaty',
            parentBranchId: 0,
            companyId: 1,
            id: 1,
            uuid: 'uuid-9',
          },
          subBranches: [],
        },
        {
          name: 'Zhumusker',
          parentBranchId: 1,
          companyId: 2,
          id: 10,
          uuid: 'uuid-22',
          parentBranch: {
            name: 'Almaty',
            parentBranchId: 0,
            companyId: 1,
            id: 1,
            uuid: 'uuid-10',
          },
          subBranches: [],
        },
        {
          name: 'Zaburuniye',
          parentBranchId: 1,
          companyId: 2,
          id: 11,
          uuid: 'uuid-23',
          parentBranch: {
            name: 'Almaty',
            parentBranchId: 0,
            companyId: 1,
            id: 1,
            uuid: 'uuid-11',
          },
          subBranches: [],
        },
      ],
    },
  ],
};
