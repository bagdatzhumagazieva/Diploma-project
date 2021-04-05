import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import { CardRateTypes } from 'src/components/molecules/Cards/CardRate/types';
import 'src/components/molecules/Cards/CardRate/index.scss';

function CardRate(props: CardRateTypes.IProps) {
  const { className, rate: propsRate = 0, handleRate } = props;

  const [rate, setRate] = useState<number>(Math.round(propsRate));
  const onRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(+event.target.value);
    handleRate && handleRate(+event.target.value);
  };

  useEffect(() => setRate(Math.round(propsRate)), [propsRate]);

  return (
    <div className={classNames('card-rate p-16', className)}>
      <Typography variant="textmed" className="mb-12">Поставьте оценку данной записи</Typography>
      <div className="rate d-flex flex-row-reverse justify-content-end">
        {[...Array(5)].map((_, i) => (
          <>
            <input
              type="radio"
              id={`star${5 - i}`}
              name="rate"
              value={5 - i}
              checked={rate === 5 - i}
              onChange={onRateChange}
            />
            <label htmlFor={`star${5 - i}`} title="text" className="mr-10" />
          </>
        ))}
      </div>
    </div>
  );
}

export default CardRate;
