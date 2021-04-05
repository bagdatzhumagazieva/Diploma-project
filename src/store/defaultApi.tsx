import { STD_HEADERS } from 'src/constants/server';

const modifyHeader = (options: any) => {
  const headers = { ...STD_HEADERS };

  if (!!options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  if (options.rawHeader) {
    // Lets browser to set correct Content-Type boundary. See more below
    // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
    // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post/
    delete headers['Content-Type'];
  }

  if (!!options.lang) {
    headers['Accept-Language'] = options.lang;
  }
  return headers;
};

export const stdApiPOST = (options: any) => {
  const formData = new FormData();
  formData.append(options.rawHeader, options.raw);

  return (
    fetch(
      options.url,
      {
        method: 'POST',
        headers: modifyHeader(options),
        body: options.raw ? formData : JSON.stringify(options.data || {}),
      },
    )
  );
};

export const stdApiGET = (options: any) => {
  return (
    fetch(
      options.url,
      {
        method: 'GET',
        headers: modifyHeader(options),
      },
    )
  );
};

export const stdApiPUT = (options: any) => {
  return (
    options.data ?
    fetch(
      options.url,
      {
        method: 'PUT',
        headers: modifyHeader(options),
        body: JSON.stringify(options.data || {}),
      },
    )
    :
    fetch(
      options.url,
      {
        method: 'PUT',
        headers: modifyHeader(options),
      },
    )
  );
};

export const stdApiDELETE = (options: any) => {
  return (
    fetch(
      options.url,
      {
        method: 'DELETE',
        headers: modifyHeader(options),
        body: JSON.stringify(options.data),
      },
    )
  );
};
