import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { CertificateTypes, GET_CERTIFICATES } from 'src/store/certificate/types';
import { parseCertificateData } from 'src/store/certificate/parsers';

const certificates = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ certificates: CertificateTypes.IResponseProps[] }>>,
): ILoadTypes<CertificateTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_CERTIFICATES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CERTIFICATES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CERTIFICATES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { total, certificates } = action.data;
      const parsed = certificates.map(item => parseCertificateData(item));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const certificateReducer = combineReducers(
  {
    certificates,
  },
);

export default certificateReducer;
