import React from 'react';

import GmailLogin from 'src/components/atoms/GmailLogin';
import FaceBookLogin from 'src/components/atoms/FaceBookLogin';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import VkLogin from 'src/components/atoms/VkLogin';
import { YANDEX_ID } from 'src/constants/server';
import { SocialLinksTypes } from 'src/components/atoms/SocialLinks/types';
import Yandex from 'src/assets/img/socials/yandex.png';
import './index.scss';

function SocialLinks(props: SocialLinksTypes.IProps) {
  const { onSendToken } = props;
  const onGetToken = (socialData: SocialLinksTypes.ISocialToken) => {
    onSendToken && onSendToken(socialData);
  };

  return (
    <div className="d-flex justify-content-center social-links">
      <GmailLogin onGetToken={onGetToken} />
      <FaceBookLogin onGetToken={onGetToken} />
      <Button
        href={`https://oauth.yandex.com/authorize?client_id=${YANDEX_ID}&response_type=token`}
        className="social-links__items"
        type="link"
        target="_blank"
      >
        <Image
          alt="yandex"
          src={Yandex}
        />
      </Button>
      <VkLogin
        onGetToken={onGetToken}
      />
    </div>
  );
}

export default SocialLinks;
