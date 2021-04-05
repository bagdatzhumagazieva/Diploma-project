import React, { BaseSyntheticEvent, SyntheticEvent } from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import LogoLoader from 'src/components/atoms/LogoLoader';
import FallBackImg from 'src/assets/img/unavailable_picture.jpg';
import { ImageTypes } from 'src/components/atoms/Image/types';
import './index.scss';

function Image(props: ImageTypes.IProps) {
  const {
    src,
    fallbackImage,
    onClick,
    getImageDimensions,
  } = props;
  const fallback = fallbackImage || FallBackImg;

  const onError = (event: SyntheticEvent<HTMLImageElement> | BaseSyntheticEvent<HTMLImageElement>) => {
    event.target.setAttribute('src', fallback);
  };

  const imgElement = React.useRef<HTMLImageElement>(null);
  return (
    src ? (
      <img
        {...mapPropsToAttributes(props, 'image')}
        src={src}
        ref={imgElement}
        onLoad={() => getImageDimensions ?
          getImageDimensions(
            imgElement?.current?.naturalHeight || 0,
            imgElement?.current?.naturalWidth || 0) : {} }
        onClick={onClick}
        onError={onError}
        alt={`${props.alt}`}
        title={props.alt || '' }
      />
    ) : <LogoLoader />
  );
}

export default Image;
