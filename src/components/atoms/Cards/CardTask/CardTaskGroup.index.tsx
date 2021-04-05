import React from 'react';

import CardTask from 'src/components/atoms/Cards/CardTask/index';

import { CardTaskGroupTypes, CardTaskTypes } from 'src/components/atoms/Cards/CardTask/types';
import { VisibleTasksAmount } from 'src/components/atoms/Cards/CardTask/consts';

function CardTaskGroup(props: CardTaskGroupTypes.IProps) {
  const { isShowAll, tasks: propsTasks } = props;
  const tasks = isShowAll ? propsTasks : propsTasks.slice(0, VisibleTasksAmount);

  return (
    <div>
      {tasks.map((item:CardTaskTypes.IProps, index: number) => (
        <CardTask
          key={index}
          status={item.status}
          type={item.type}
          imgSrc={item.imgSrc}
          title={item.title}
          info={item.info}
          progress={item.progress}
          lastActivity={item.lastActivity}
          link={item.link}
          classNames="mb-32"
        />
      ))}
    </div>
  );
}

export default CardTaskGroup;
