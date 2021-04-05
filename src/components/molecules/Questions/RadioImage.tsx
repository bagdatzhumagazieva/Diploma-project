import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import { RadioImageTypes } from 'src/components/molecules/Questions/types';
import 'src/components/molecules/Questions/index.scss';

function RadioImage(props: RadioImageTypes.IProps) {
  const {
    title, instruction, appendix, className,
    images, selectedImage, handleClickedAnswer,
    correctAnswerId, isChecked,
  } = props;
  const [selectedImageId, setSelectedImage] = useState<number | string>(selectedImage);
  useEffect(
    () => {
      setSelectedImage(selectedImage);
    },
    [selectedImage],
  );

  useEffect(
    () => {
      if (!selectedImageId) return;
      handleClickedAnswer && handleClickedAnswer(selectedImageId);
    },
    [selectedImageId],
  );

  return (
    <div className={`question ${className ? className : ''}`}>
      <Typography variant="h2">{title}</Typography>
      {appendix && <div dangerouslySetInnerHTML={{ __html: appendix }} className="inner-html my-8" />}
      <Typography
        variant="text"
        color="grey_additional_2"
        className="my-16 d-block"
      >
        {instruction}
      </Typography>
      <div className="mt-24 radio-image__list d-flex flex-wrap">
        {images.map(n => (
          <div
            key={n.id}
            className={classNames(
              'radio-image__img-wrap mr-16 mb-16',
              { 'radio-image__img-wrap--selected': selectedImageId === n.id },
              { 'radio-image__img-wrap--error':
                  selectedImageId === n.id && selectedImage !== correctAnswerId && isChecked },
              { 'radio-image__img-wrap--correct': correctAnswerId === n.id && isChecked },
            )}
          >
            <Image
              key={n.id}
              src={n.src}
              alt={n.text}
              classNames="radio-image__img"
              onClick={() => setSelectedImage(n.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioImage;
