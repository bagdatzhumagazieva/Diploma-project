import React, { useEffect } from 'react';
import 'src/components/atoms/ModalLoading/index.scss';
import Loader from 'src/components/atoms/Loader';

function ModalLoading() {
  useEffect(
    () => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'visible';
      };
    },
    [],
  );

  return (
    <div className="modal-loading d-flex align-items-center justify-content-center pos_fixed vh_100 vw_100">
      <Loader size={64} label="Загрузка..." labelVariant="h2" />
    </div>
  );
}

export default ModalLoading;
