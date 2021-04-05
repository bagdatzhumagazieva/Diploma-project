import React from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import { LoaderTypes } from 'src/components/atoms/Loader/types';
import logo from 'src/assets/img/icons/loader.svg';
import 'src/components/atoms/Loader/index.scss';

function Loader(props: LoaderTypes.IProps) {
  const { label, className, size, labelVariant } = props;

  return (
    <div className={classNames('loader d-flex flex-column justify-content-center align-items-center', className)}>
      <Image
        src={logo}
        alt="loading..."
        className="loader__image"
        style={{ width: `${size}px` }}
      />
      {label &&
        <Typography
            variant={labelVariant || 'subtext'}
            color="main_50"
            className="text-center mt-8"
        >
          {label}
        </Typography>
      }
    </div>
  );
}

export default Loader;
