import React from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import CardBattle from 'src/components/molecules/Cards/CardBattle/index';
import Typography from 'src/components/atoms/Typography';
import { CardBattleGroupTypes } from 'src/components/molecules/Cards/CardBattle/types';
import { ReactComponent as EmptyDataIcon } from 'src/assets/img/no-data.svg';
import 'src/components/molecules/Cards/CardBattle/index.scss';

function CardBattleGroup(props: CardBattleGroupTypes.IProps) {
  const { battles, className } = props;

  return (
    <div className={classNames('p-24 mb-24 d-flex flex-column card-battle-group', className)}>
      <Typography variant="h1" className="mb-16">Баттлы</Typography>
      {Array.isArray(battles) && battles.length > 0 ? (
        <>
          {battles.map((item, index) => (
            <CardBattle key={index} className="card-battle-group__item mb-24" {...item} />
          ))}
          <Button
            variant="xsmallunderlined"
            type="link"
            to="aloha"
            className="align-self-end"
          >
            Все приглашения
          </Button>
        </>
      ) : (
        <>
          <EmptyDataIcon className="mx-auto pt-32" />
          <Typography variant="text" color="grey_additional_2" className="mt-16 mx-auto pb-32">
            Упс! Пока нет никаких баттлов
          </Typography>
        </>
      )}
    </div>
  );
}

export default CardBattleGroup;
