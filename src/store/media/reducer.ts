import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  MediaTypes,
  GET_COMPANY_FILES,
  UPLOAD_COMPANY_BANNER,
  UPLOAD_COMPANY_FILE,
  UPLOAD_COMPANY_LOGO,
  SET_COMPANY_LOGO,
  SET_COMPANY_BANNER,
} from 'src/store/media/types';

export const parseCompanyFilesData = (raw: MediaTypes.IResponseProps): MediaTypes.IRenderProps => ({
  url: raw.url,
  uuid: raw.uuid,
  contentType: raw.content_type,
  thumbnail: raw.thumbnail,
  name: raw.name || '-',
  id: raw.id,
});

const companyFiles = (
  state = { data: null, loading: false },
  action: ActionType<MediaTypes.IResponseProps[]>,
): ILoadTypes<MediaTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_COMPANY_FILES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COMPANY_FILES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COMPANY_FILES.success:
      if (!action.companyFiles) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.companyFiles.map(n => parseCompanyFilesData(n));
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const uploadedCompanyFile = (
  state = { data: null, loading: false },
  action: ActionType<MediaTypes.IResponseProps>,
): ILoadTypes<MediaTypes.IRenderProps | null> => {
  switch (action.type) {
    case UPLOAD_COMPANY_FILE.started:
      return {
        data: null,
        loading: true,
      };
    case UPLOAD_COMPANY_FILE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPLOAD_COMPANY_FILE.success:
      if (!action.uploadedFile) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCompanyFilesData(action.uploadedFile);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const uploadedCompanyLogo = (
  state = { data: null, loading: false },
  action: ActionType<MediaTypes.IResponseProps>,
): ILoadTypes<MediaTypes.IRenderProps | null> => {
  switch (action.type) {
    case UPLOAD_COMPANY_LOGO.started:
    case SET_COMPANY_LOGO.started:
      return {
        data: null,
        loading: true,
      };
    case UPLOAD_COMPANY_LOGO.failed:
    case SET_COMPANY_LOGO.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPLOAD_COMPANY_LOGO.success:
    case SET_COMPANY_LOGO.success:
      if (!action.uploadedLogo) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCompanyFilesData(action.uploadedLogo);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const uploadedCompanyBanner = (
  state = { data: null, loading: false },
  action: ActionType<MediaTypes.IResponseProps>,
): ILoadTypes<MediaTypes.IRenderProps | null> => {
  switch (action.type) {
    case UPLOAD_COMPANY_BANNER.started:
    case SET_COMPANY_BANNER.started:
      return {
        data: null,
        loading: true,
      };
    case UPLOAD_COMPANY_BANNER.failed:
    case SET_COMPANY_BANNER.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPLOAD_COMPANY_BANNER.success:
    case SET_COMPANY_BANNER.success:
      if (!action.uploadedBanner) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCompanyFilesData(action.uploadedBanner);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const mediaReducer = combineReducers({ companyFiles, uploadedCompanyFile, uploadedCompanyLogo, uploadedCompanyBanner });

export default mediaReducer;
