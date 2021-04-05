import React from 'react';
import Image from 'src/components/atoms/Image';
import { ModulePageTypes } from 'src/pages/GamePages/Course/Module/types';

function ModuleData(props: ModulePageTypes.IModuleData) {
  const { description, imageUrl } = props;

  return (
    <div className="module-data py-48 px-64 mb-32 d-flex flex-column">
      {imageUrl && <Image alt="module image" src={imageUrl} className="module-data__image mb-32" />}
      <p className="module-data__description">{description}</p>
    </div>
  );
}

export default ModuleData;
