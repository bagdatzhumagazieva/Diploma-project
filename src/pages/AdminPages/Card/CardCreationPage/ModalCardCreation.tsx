import React from 'react';

import CardCreation from 'src/components/organisms/CardCreation';
import CardEdition from 'src/components/organisms/CardEdition';
import { ModalCardCreationEditionTypes } from 'src/pages/AdminPages/Card/CardCreationPage/types';

function ModalCardCreationEdition(props: ModalCardCreationEditionTypes.IProps) {
  const { handleCloseClick, handleCreationFinished, type, id, isQuizCard } = props;
  return (
    <div className="modal-card-creation pos_fixed vh_100 vw_100">
      {type === 'create' ? (
        <CardCreation
          isModal
          isQuizCard={isQuizCard}
          type={type}
          handleCreationFinished={handleCreationFinished}
          handleModalCloseClick={handleCloseClick}
        />
      ) : (
        (typeof id === 'number') && (
            <CardEdition
                isQuizCard={isQuizCard}
                isModal
                cardId={id}
                handleCreationFinished={handleCreationFinished}
                handleModalCloseClick={handleCloseClick}
            /> || ''
        )
      )}
    </div>
  );
}

export default ModalCardCreationEdition;
