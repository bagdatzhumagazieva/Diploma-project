import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import { SliderTypes } from './types';
import './index.scss';
function Slider(props: SliderTypes.IProps) {
  const { photos } = props;
  const [currentImage, setCurrentImage] = useState<string>(photos[0]?.imgUrl || '');

  const selectImage = (image: string) => {
    setCurrentImage(image);
  };

  return (
    <div>
      <div>
        <Image alt="levi" className="slider__main" src={currentImage} />
      </div>
      <div className="d-flex">
        {photos.map((photo: SliderTypes.IPhoto, index: number) => (
          <Image
            alt="slider"
            key={index}
            className={classNames('slider__deactive', 'mr-4', { 'slider__active': photo.imgUrl === currentImage })}
            src={photo.imgThumbnailUrl}
            onClick={() => selectImage(photo.imgUrl)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
