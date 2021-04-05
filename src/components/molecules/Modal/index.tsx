import React, { useEffect, useRef } from 'react';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';

import { ModalTypes } from 'src/components/molecules/Modal/types';
import './index.scss';

function Modal(props: ModalTypes.IProps) {
  const {
    onCloseClick: propsOnCloseClick, onSaveClick: propsOnSaveClick,
    onDeleteClick: propsOnDeleteClick, title, cancelLabel,
    saveLabel, deleteLabel, width, children, right,
    top, closeColor, withCloseIcon = true,
    isSaveButtonDisable, withSaveBtnArrow, titleVariant,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const onCloseClick = () => propsOnCloseClick && propsOnCloseClick();
  const onSaveClick = () => propsOnSaveClick && propsOnSaveClick();
  const onDeleteClick = () => propsOnDeleteClick && propsOnDeleteClick();

  const modalContentStyles = {
    width: `${width || 400}px`,
  };

  useEffect(
    () => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'visible';
      };
    },
    [],
  );

  useEffect(
    () => {
      const handleEsc = (event: any) => {
        if (event.keyCode === 27) {
          onCloseClick();
        }
      };
      const handleEnter = (event: any) => {
        if (event.keyCode === 13) {
          onSaveClick();
          onDeleteClick();
        }
      };
      window.addEventListener('keydown', handleEsc);
      window.addEventListener('keydown', handleEnter);

      return () => {
        window.removeEventListener('keydown', handleEsc);
        window.removeEventListener('keydown', handleEnter);
      };
    },
    [],
  );

  useOutsideClick(ref, () => {
    propsOnCloseClick && propsOnCloseClick();
  });

  return (
    <div className="modal d-flex align-items-center justify-content-center pos_fixed vh_100 vw_100">
      <div
        ref={ref}
        style={modalContentStyles}
        className="modal__content pos_relative d-flex flex-column"
      >
        {title && (
          <Typography
            variant={titleVariant || 'h2'}
            className="d-block modal__title"
          >
            {title}
          </Typography>
        )}
        {withCloseIcon && (
          <Button
            type="link"
            style={{
              position: 'absolute',
              top: `${top || 24}px`,
              right: `${right || 24}px`,
            }}
            onClick={onCloseClick}
            className="modal__close-button"
          >
            <CancelIcon color={closeColor || '#282F4A'} />
          </Button>
        )}
        <div className="modal__children">
          {children}
        </div>
        {(cancelLabel || saveLabel || deleteLabel) && (
          <div className="d-flex justify-content-end m-32 mb-24 align-self-end">
            {cancelLabel && (
              <Button
                type="link"
                color="blacker"
                variant="textmed"
                className="modal__btn modal__btn--cancel"
                onClick={onCloseClick}
              >
                {cancelLabel}
              </Button>
            )}
            <div className="ml-auto">
              {deleteLabel && (
                <Button
                  variant="textmed"
                  type="main-red"
                  classNames={['modal__btn', { 'mr-16': saveLabel }]}
                  onClick={onDeleteClick}
                >
                  {deleteLabel}
                </Button>
              )}
              {saveLabel && (
                <Button
                  disabled={isSaveButtonDisable}
                  variant="textmed"
                  className={`modal__btn modal__btn--submit ${withSaveBtnArrow ? 'd-flex align-items-center px-24' : ''}`}
                  onClick={onSaveClick}
                >
                  {saveLabel}
                  {withSaveBtnArrow && <FilterArrow direction="right" className="ml-10" color="white"/>}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
