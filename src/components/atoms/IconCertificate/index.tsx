import React from 'react';
import classNames from 'classnames';

import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';

import { IconCertificateTypes } from 'src/components/atoms/IconCertificate/types';
import MedalIcon from 'src/assets/img/icons/medal.svg';
import './index.scss';

function IconCertificate(props: IconCertificateTypes.IProps) {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        'icon-certificate', 'd-flex flex-column justify-content-center',
        props.className,
      )}
    >
      <Image className="icon-certificate__medal" alt="medal icon" src={MedalIcon} />
      <Typography variant="tag" className="mt-10">Сертификат</Typography>
    </div>
  );
}

export default IconCertificate;
