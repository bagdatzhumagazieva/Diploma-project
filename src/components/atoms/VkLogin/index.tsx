import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import { VK_HREF } from 'src/constants/server';
import VK from 'src/assets/img/socials/vk.svg';
import { VkLoginTypes } from 'src/components/atoms/VkLogin/types';

function VkLogin(props: VkLoginTypes.IProps) {

  const { location, onGetToken } = props;

  useEffect(
    () => {
      const hash = location.hash;
      const accessToken = hash.slice(hash.indexOf('access_token=') + 13, hash.indexOf('&'));
      if (accessToken) {
        const data = {
          token: accessToken,
          type: 'vk_login',
        };
        onGetToken && onGetToken(data);
      }
    },
    [],
  );

  return (
    <Button
      href={VK_HREF}
      className="social-links__items"
      type="link"
    >
      <Image
        alt="VKontakte"
        src={VK}
      />
    </Button>
  );
}

export default withRouter(VkLogin);
