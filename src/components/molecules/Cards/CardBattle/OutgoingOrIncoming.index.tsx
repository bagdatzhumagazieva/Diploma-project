import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import { CardBattleChildTypes } from 'src/components/molecules/Cards/CardBattle/types';
import { BattleStatuses } from 'src/components/molecules/Cards/CardBattle/enum';

function OutgoingOrIncoming(props: CardBattleChildTypes.IProps) {
  const { waitingTime, date, name, status, userLink } = props;

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <Typography variant="xsmall" color="main_75">В ожиидании ({waitingTime} ч)</Typography>
        <Typography variant="xsmall" color="grey_additional_2" className="text-overflow">{date}</Typography>
      </div>
      {status === BattleStatuses.OUTGOING ? (
        <>
          <Typography
            variant="subtext"
            color="blacker"
            className="mb-8 mt-2"
          >
            Вы
            <Typography
              variant="xsmall"
              color="grey_additional_2"
              className="ml-4"
            >
              пригласили на баттл
            </Typography>
            <Link to={userLink}>{ ` ${name}`}</Link>
          </Typography>
          <Button variant="xsmall" className="card-battle__button d-inline align-self-start">Отозвать</Button>
        </>
      ) : (
        <>
          <Typography
            variant="subtext"
            color="blacker"
            className="mb-8 mt-2"
          >
            <Link to={userLink}>{`${name} `}</Link>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
              className=""
            >
              приглашает вас на баттл
            </Typography>
          </Typography>
          <div className="mt-2">
            <Button variant="xsmall" className="card-battle__button mr-24">Принять</Button>
            <Button variant="xsmall" type="link">Отклонить</Button>
          </div>
        </>
      )}
    </>
  );
}

export default OutgoingOrIncoming;
