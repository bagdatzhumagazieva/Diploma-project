import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import { TableTypes } from 'src/components/molecules/Table/types';
import { CourseTypes } from 'src/store/course/types';
import { COLORS } from 'src/core/store/values';

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const parseToTableRowData = (data: CourseTypes.IAverage) => {
  const newObject = {
    groupName: data.name,
    finalPercent: data.finalPercent,
  };
  Array.isArray(data.modules) && data.modules.forEach(item => newObject[item.moduleId] = item.percent);
  return newObject;
};

export const parseToTableData = (data: CourseTypes.IAverage[]) => data.map(item => parseToTableRowData(item));

const parseColumnHeaderData = (key: string, name: string, width: number, column: string, sort?: boolean) => ({
  key,
  name,
  sort,
  width: `${width}px`,
  render: (n: any) => (
    <Typography
      variant="subtext"
    >
      {n[column]}
    </Typography>
  ),
});

export const parseToHeaderData = (data: CourseTypes.IAverage) => {
  const headerData: TableTypes.IHeaderData[] = [];
  headerData.push(parseColumnHeaderData('groups', 'Группы', 141, 'groupName', false));
  data.modules.forEach((item, index) => {
    headerData.push(parseColumnHeaderData(`test-${index + 1}`, `Тест-${index + 1}`, 90, `${item.moduleId}`, false));
  });
  headerData.push(parseColumnHeaderData('final', 'Финальный экзамен', 90, 'finalPercent', true));
  return headerData;
};

export const parseToPieChartData = (data: CourseTypes.IGroupData, index: number) => ({
  title: data.name,
  value: data.total,
  color: (index < COLORS.length) ? COLORS[index] : generateRandomColor(),
});

export const convertToGroupUsers = (users?: CourseTypes.IUserStatistics):
  CourseStatisticsTypes.IGroupUsers[] => {
  if (!users || !Array.isArray(users?.groups)) return [];
  return users.groups.map(item => ({
    groupId: item.groupId,
    name: item.name,
    total: item.total,
    completed: item.completed,
  }));
};

export const STATISTICS_STATE_DEFAULT_VALUES = {
  isGroupsImportant: undefined,
  isUserImportant: undefined,
  isAverageImportant: undefined,
};
