import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import EmptyFolder from 'src/assets/img/icons/empty-folder.svg';
import { IEmptyDataContainerTypes } from 'src/components/atoms/EmptyDataContainer/types';
import 'src/components/atoms/EmptyDataContainer/index.scss';

function EmptyDataContainer(props: IEmptyDataContainerTypes.IProps) {
  const { description, className } = props;

  return (
    <div className={classNames(
      'empty-data-container d-flex justify-content-center align-items-center flex-column',
      className,
    )}>
      <div className="d-flex justify-content-center">
        <Image src={EmptyFolder} alt="empty folder"/>
      </div>
      <Typography variant="p" className="color_grey_placeholder text-center">{description}</Typography>
    </div>
  );
}

export default EmptyDataContainer;
