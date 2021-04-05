import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import { CardBattleChildTypes } from 'src/components/molecules/Cards/CardBattle/types';
import { BattleStatuses } from 'src/components/molecules/Cards/CardBattle/enum';

function SuccessOrLoss(props: CardBattleChildTypes.IProps) {
  const { date, status, name, userLink } = props;

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <Typography variant="xsmall" color="main_75">Завершен</Typography>
        <Typography variant="xsmall" color="grey_additional_2" className="text-overflow">{date}</Typography>
      </div>
      {status === BattleStatuses.SUCCESS ? (
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
              одержали победу над
            </Typography>
            <Link to={userLink}>{ ` ${name}`}</Link>
          </Typography>
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
            >
              одержал победу над вами
            </Typography>
          </Typography>
          <div className="mt-2">
            <Button variant="xsmall" className="card-battle__button mr-24">Отыграться</Button>
            <Button variant="xsmall "type="link">Скрыть</Button>
          </div>
        </>
      )}
    </>
  );
}

export default SuccessOrLoss;
