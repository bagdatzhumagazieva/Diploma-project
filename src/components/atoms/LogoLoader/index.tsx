import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { LogoLoaderTypes } from 'src/components/atoms/LogoLoader/types';
import './index.scss';

function LogoLoader(props: LogoLoaderTypes.IProps) {
  const { label } = props;

  return (
    <div className="logo-loader d-flex flex-column justify-content-center">
      <div className="loader m-auto">
        {[1, 2, 3, 4].map(number =>
          <div className={ `loader__item loader__item${number}` } />,
        )}
      </div>
      {label &&
        <Typography variant="subtext" className="logo-loader_label text-center mt-8">{label}</Typography>
      }
    </div>
  );
}

export default LogoLoader;
