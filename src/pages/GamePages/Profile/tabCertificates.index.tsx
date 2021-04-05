import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import certificateActions from 'src/store/certificate/actions';

import CardCertificate from 'src/components/molecules/Cards/CardCertificate';
import Typography from 'src/components/atoms/Typography';

import { TabCertificateTypes } from 'src/pages/GamePages/Profile/types';

function TabCertificates(props: TabCertificateTypes.IProps) {
  const { certificates, companyId, getCertificates } = props;
  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getCertificates && getCertificates({
        companyId,
        page: 1,
        pageSize: 20,
      });
    },
    [companyId],
  );

  return (
    <>
      <Typography variant="h1" classNames="mb-16">Сертификаты</Typography>
      <div className="profile__card-certificates d-flex flex-wrap justify-content-between">
        {certificates && certificates.map((certificate, index) => (
          <CardCertificate
            key={certificate.uuid + index}
            startDate={certificate.createdDate}
            dueDate={certificate.expirationDate}
            gameName={certificate.description}
            userName={certificate.userName}
            taskIcon={certificate.entityImageThumbnail}
            certificateId={certificate.id}
            bgImage={certificate.image}
            courseId={certificate.courseId}
            gameId={certificate.gameId}
            classNames="card-certificates__item mb-40"
          />
        ))}
      </div>
    </>
  );
}

export const mapStateToProps = (state: any) => ({
  certificates: state.certificateReducer.certificates.data,
  total: state.certificateReducer.certificates.total,
});

export const mapDispatchToProps = {
  getCertificates: certificateActions.getAchievements,
  getCertificateDownload: certificateActions.getCertificateDownload,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TabCertificates);
