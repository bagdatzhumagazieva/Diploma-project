import React, { useEffect, useState } from 'react';
import Loader from 'src/components/atoms/Loader';
import RubricTreeContext from 'src/components/molecules/RubricTree/RubricTreeContext';
import RubricTree from 'src/components/molecules/RubricTree/index';
import { GroupRubricTreeTypes } from 'src/components/molecules/RubricTree/types';

function GroupRubricTree(props: GroupRubricTreeTypes.IProps) {
  const { rubrics, onRubricChange, className, lastItemRef, loading } = props;
  const [activeId, setActiveId] = useState<string>();
  const contextVal = { activeId, setActiveId };

  useEffect(
    () => {
      onRubricChange && activeId && onRubricChange(+activeId);
    },
    [activeId],
  );

  return (
    <RubricTreeContext.Provider value={contextVal}>
      <div className={`d-flex flex-column align-items-start rubric-tree-group ${className}`}>
        {rubrics.map((item, index) => (
          <div key={item.id} ref={rubrics.length - 1 === index ? lastItemRef : null}>
            <RubricTree
              rubric={item}
              className="mb-8"
            />
          </div>
        ))}
        {loading && <Loader className="mx-auto" />}
      </div>
    </RubricTreeContext.Provider>
  );
}

export default GroupRubricTree;
