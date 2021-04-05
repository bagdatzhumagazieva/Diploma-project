import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ProgressStatus } from 'src/store/course/types';

import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import { getIcon } from 'src/pages/GamePages/Course/Course/consts';
import { ModuleCardListTypes } from 'src/components/molecules/ModuleCardList/types';
import 'src/components/molecules/ModuleCardList/index.scss';

function ModuleCardList(props: ModuleCardListTypes.IProps) {
  const {
    data, curId, link, loading,
    type, isTest, testStatus = ProgressStatus.NOT_STARTED,
  } = props;

  return (
    <div className="module-card-list py-16">
      <Typography variant="h1" className="mb-24 px-16">{type === 'module' ? 'Модули' : 'Уроки'}</Typography>
      {loading && (
        <Loader />
      )}
      <div>
        <div className={classNames(
          'module-card-list__cards', { 'module-card-list__cards--disable': isTest },
        )}>
          {data.map((item, index) => (
            <Link
              key={`module-card-list-item-${index}`}
              to={item.status === ProgressStatus.SUCCESS || item.status === ProgressStatus.IN_PROGRESS ? `${link}card/${item.id}?test=${index}` : '#' }
            >
              <div
                className={classNames(
                  `module-card-list__item module-card-list__item--${item.status} d-flex justify-content-between align-items-center p-16`,
                  { 'module-card-list__item--current' : !isTest && curId && item.id === `${curId}` },
                )}
              >
                <Typography variant="text">{item.name}</Typography>
                {getIcon('web', item.status, 18)}
              </div>
            </Link>
          ))}
        </div>
        <div
          key="module-card-list-item--test"
          className={classNames(
            `module-card-list__item module-card-list__item--${testStatus} d-flex justify-content-between align-items-center p-16`,
            { 'module-card-list__item--current' : isTest },
          )}
        >
          {testStatus !== ProgressStatus.NOT_STARTED ? (
            <Link to={`${link}test`}>
              <Typography variant="text">{type === 'module' ? 'Экзамен' : 'Тест' }</Typography>
            </Link>
          ) : (
            <Typography variant="text">{type === 'module' ? 'Экзамен' : 'Тест' }</Typography>
          )}
          {getIcon('web', testStatus, 18)}
        </div>
      </div>
    </div>
  );
}

export default ModuleCardList;
