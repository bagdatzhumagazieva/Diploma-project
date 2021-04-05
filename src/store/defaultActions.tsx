import { UNAUTHORIZED } from 'src/store/utils/types';

export const defaultAction = (dispatch: any, getState: any , options: any) => {
  const callbacks = options.callbacks || {};
  dispatch({ type: options.action.started, ...options.withStart });
  options.apiCall()
    .then(
      (response: any) => {
        switch (response.status) {
          case 200:
            if (options.hasImage) {
              response.blob().then((blobResponse: any) =>
                 dispatch({
                   type: options.action.success,
                   ...options.onSuccess(URL.createObjectURL(blobResponse)),
                 }),
              );
            } else {
              if (options.hasExcel || options.hasPdf) {
                response.blob().then((blobResponse: any) => {
                  const a = window.document.createElement('a');
                  a.href = window.URL.createObjectURL(blobResponse);
                  a.download = options.hasPdf ? 'file.pdf' : 'file.xls';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  dispatch({
                    type: options.action.success,
                    ...options.onSuccess(blobResponse),
                  });
                });
              } else {
                response
                  .text()
                  .then(
                    (value: any) => {
                      const responseObject = JSON.parse(value);
                      if (responseObject) {
                        dispatch({
                          type: options.action.success,
                          ...options.onSuccess(responseObject),
                        });
                        if (callbacks.onSuccess) {
                          callbacks.onSuccess(options.onSuccess(responseObject));
                        }
                      } else {
                        dispatch({
                          type: options.action.failed,
                          ...options.onError(responseObject),
                        });
                        if (callbacks.onError) {
                          callbacks.onError(options.onSuccess(responseObject));
                        }
                      }
                    },
                  );
              }
            }
            break;
          case 201:
            response
              .text()
              .then(
                (value: any) => {
                  const responseObject = JSON.parse(value);
                  if (responseObject) {
                    dispatch({
                      type: options.action.success,
                      ...options.onSuccess(responseObject),
                    });
                    if (callbacks.onSuccess) {
                      callbacks.onSuccess(options.onSuccess(responseObject));
                    }
                  } else {
                    dispatch({
                      type: options.action.failed,
                      ...options.onError(responseObject),
                    });
                    if (callbacks.onError) {
                      callbacks.onError(options.onSuccess(responseObject));
                    }
                  }
                },
              );
            break;
          case 401:
            dispatch({
              type: UNAUTHORIZED.success,
            });
            break;
          case 400:
          case 404:
          case 412:
            response
            .json()
            .then((val: any) => {
              dispatch({
                type: options.action.failed,
                ...options.onError({ errorMessage: val.detail || val.message || 'serverError', status: val.status }),
              });
              if (callbacks.onError) {
                callbacks.onError({ errorMessage: val.detail || val.message || 'serverError', status: val.status });
              }
            });
            break;
          case 500:
            response
            .text()
            .then((val: any) => {
              dispatch({
                type: options.action.failed,
                ...options.onError({ errorMessage: val || 'serverError' }),
              });
              if (callbacks.onError) {
                callbacks.onError({ errorMessage: val || 'serverError' });
              }
            });
            break;
          case 504:
            response
              .text()
              .then((val: any) => {
                dispatch({
                  type: options.action.failed,
                  ...options.onError({ errorMessage: 'serverError' }),
                });
                if (callbacks.onError) {
                  callbacks.onError({ errorMessage: 'serverError' });
                }
              });
            break;
          default:
            dispatch({
              type: options.action.failed,
              errorMessage: `Ошибка #${response.status}`,
            });
            if (callbacks.onError) {
              callbacks.onError(`Ошибка #${response.status}`);
            }
        }
      },
      (error: any) => {
        dispatch({
          type: options.action.failed,
          errorMessage: 'Проверьте соеденение',
          ...options.onError({ message: 'serverError' }),
        });
        if (callbacks.onError) {
          callbacks.onError({ message: 'serverError' });
        }
      },
    );
};
