import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import RubricTreeContext from 'src/components/molecules/RubricTree/RubricTreeContext';

import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Button from 'src/components/atoms/Button';
import { RubricTreeTypes } from 'src/components/molecules/RubricTree/types';
import './index.scss';

function RubricTree(props: RubricTreeTypes.IProps) {
  const { rubric, className } = props;

  const { activeId, setActiveId } = useContext(RubricTreeContext);
  const [openedRubrics, setOpenedRubrics] = useState({});

  const onCollapse = (id: string) => {
    const updatedRubrics = { ...openedRubrics, [id]: !openedRubrics[id] };
    setOpenedRubrics(updatedRubrics);
  };

  return (
    <div className={classNames('rubric-tree', className)}>
      <div className="rubric-tree__root d-flex align-items-center">
        {rubric.subRubrics && rubric.subRubrics.length > 0 && (
          <FilterArrow
            className="mr-4"
            direction={openedRubrics[rubric.id] ? 'down' : 'right'}
            onClick={() => onCollapse(rubric.id)}
          />
        )}
        <Button
          variant="subtext"
          color="blacker"
          className={classNames(
            'rubric-tree__button p-4',
            { 'rubric-tree__button--active': activeId === rubric.id },
          )}
          onClick={() => setActiveId(activeId !== rubric.id ? rubric.id : '-1')}
        >
          {rubric.title}
        </Button>
      </div>
      {openedRubrics[rubric.id] && (
        <div className="rubric-tree__content">
          {rubric.subRubrics && rubric.subRubrics.map(item => (
            <div
              key={item.id}
              className={classNames(
                'rubric-tree__subrubric mt-4 mb-4 d-flex flex-column align-items-start',
                { 'rubric-tree__subrubric--active mb-8': openedRubrics[item.id] },
              )}
            >
              <div className="d-flex align-items-center">
                {item.subRubrics && item.subRubrics.length > 0 && (
                  <FilterArrow
                    direction={openedRubrics[item.id] ? 'down' : 'right'}
                    className="mr-4"
                    onClick={() => onCollapse(item.id)}
                  />
                )}
                <Button
                  color="blacker"
                  variant="subtext"
                  className={classNames(
                    'rubric-tree__button p-4',
                    { 'rubric-tree__button--active': activeId === item.id },
                  )}
                  onClick={() => setActiveId(activeId !== item.id ? item.id : '-1')}
                >
                  {item.title}
                </Button>
              </div>
              <div className="subrubric__data mt-4">
                {item.subRubrics && item.subRubrics.map(child => (
                  <Button
                    key={child.id}
                    color="blacker"
                    variant="subtext"
                    className={classNames(
                      'rubric-tree__button p-4 align-self-left',
                      { 'rubric-tree__button--active': activeId === child.id },
                    )}
                    onClick={() => setActiveId(activeId !== child.id ? child.id : '-1')}
                  >
                    {child.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RubricTree;
