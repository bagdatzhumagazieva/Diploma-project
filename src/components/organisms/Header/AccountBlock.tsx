import React, { useRef, useState } from 'react';
import { HeaderTypes } from 'src/components/organisms/Header/types';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';
import AvatarIcon from 'src/assets/img/ava.png';
import CardAccount from 'src/components/molecules/Cards/CardAccount';

function AccountBlock(props: HeaderTypes.IAccountBlock) {
  const {
    companies, profile, onClickLogout,
    setPageLoading, onChangeAccountClick,
  } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const [showAccountCard, setShowAccountCard] = useState<boolean>(false);

  useOutsideClick(divRef, () => {
    if (!showAccountCard) return;
    setShowAccountCard(false);
  });

  return (
    <div ref={divRef}>
      <div
        className="d-flex align-items-center cursor-pointer"
        onClick={() => setShowAccountCard(!showAccountCard)}
      >
        <Image className="header__user-image fill mr-8" alt="user image" src={AvatarIcon} />
        <Typography variant="text" className="mr-8">bagdat</Typography>
        <Arrow direction={showAccountCard ? 'up' : 'down'} />
      </div>
      {showAccountCard && (
        <CardAccount
          companies={companies}
          fullName={profile?.data?.fullName}
          email={profile?.data?.email}
          image={profile?.data?.avatarUrl || ''}
          onClickLogout={onClickLogout}
          className="header__card-account pos_absolute"
          setPageLoading={setPageLoading}
          handleCloseClick={() => setShowAccountCard(false)}
          onChangeAccountClick={onChangeAccountClick}
        />
      )}
    </div>
  );
}

export default AccountBlock;
