import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import { AvatarImageTypes } from 'src/components/atoms/AvatarImage/types';
import 'src/components/atoms/AvatarImage/index.scss';

function AvatarImage(props: AvatarImageTypes.IProps) {
  const { size, src, className } = props;

  return (
    <div
      className={classNames('avatar-image', className)}
      style={{ width: size || 36, height: size || 36, minWidth: size || 36 }}
    >
      <Image
        alt="avatar image"
        className="avatar-image__image"
        src={src}
      />
    </div>
  );
}

export default AvatarImage;
