export const STD_HEADERS = {
  Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  'Content-Type': 'application/json',
};

export const API = process.env.REACT_APP_STAGE !== 'prod' ? 'https://microlearning.kz:8443/api/v1/' : 'https://api.gamisoft.ru/api/v1/';
export const SITE_BACK_URL = process.env.REACT_APP_STAGE !== 'prod' ? 'https://microlearning.kz:8443/' : 'https://api.gamisoft.ru/';

export const YANDEX_ID = process.env.REACT_APP_STAGE !== 'prod' ? '0bcb4709e27d4f0b8606e24a1a514fd3' : '2635b98985d44717a49f86f7dac7ec0d';
export const VK_HREF = process.env.REACT_APP_STAGE !== 'prod' ?
  'http://oauth.vk.com/authorize?client_id=7356752&display=popup&scope=offline&redirect_uri=http://gamisoft.kz&response_type=token&v=5.103' :
  'http://oauth.vk.com/authorize?client_id=7633672&display=popup&scope=offline&redirect_uri=https://gamisoft.ru/&response_type=token&v=5.103';
