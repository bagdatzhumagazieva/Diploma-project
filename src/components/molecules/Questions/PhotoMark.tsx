import React, { useEffect, useState } from 'react';
import { generateId } from 'src/utils/generation';
import Image from 'src/components/atoms/Image';
import Mark, { markSize } from 'src/components/atoms/Mark';
import Typography from 'src/components/atoms/Typography';
import { PhotoTagTypes } from 'src/components/molecules/PhotoTag/types';
import { PhotoMarkTypes } from 'src/components/molecules/Questions/types';
import { CardTypes } from 'src/store/card/types';
import 'src/components/molecules/Questions/index.scss';

function PhotoMark(props: PhotoMarkTypes.IProps) {
  const {
    title, instruction, appendix, className, image, marksCount,
    handleSelectedAnswers, initValues, isStatistic, correctMarkPoints,
    isChecked,
  } = props;

  const [marks, setMarks] = useState<PhotoTagTypes.IMark[]>([]);
  const [correctMarks, setCorrectMarks] = useState<PhotoTagTypes.IMark[]>([]);

  useEffect(
    () => {
      if (initValues) {
        const initialVal = initValues.map(e => ({ ...e, id: generateId() }));
        setMarks(initialVal);
      }
      if (correctMarkPoints && correctMarkPoints.length) {
        setCorrectMarks(
          correctMarkPoints.filter(e => marks?.findIndex(m => check(e.a, e.b, e.c, e.d, m)) === -1)
            ?.map(n => getCorrectCenterPoint(n.b, n.c)) || [],
        );
      }
    },
    [initValues, correctMarkPoints],
  );

  const getCorrectCenterPoint = (
    p1: CardTypes.ICardQuestionMarkPointPosition,
    p2: CardTypes.ICardQuestionMarkPointPosition,
  ) => {
    return { id: generateId(), x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  };

  const check = (
    p1: CardTypes.ICardQuestionMarkPointPosition,
    p2: CardTypes.ICardQuestionMarkPointPosition,
    p3: CardTypes.ICardQuestionMarkPointPosition,
    p4: CardTypes.ICardQuestionMarkPointPosition,
    p: CardTypes.ICardQuestionMarkPointPosition,
    ) => {
    return (
      p.x >= Math.min(...[p1.x, p2.x, p3.x, p4.x])
      && p.x <= Math.max(...[p1.x, p2.x, p3.x, p4.x])
      && p.y >= Math.min(...[p1.y, p2.y, p3.y, p4.y])
      && p.y <= Math.max(...[p1.y, p2.y, p3.y, p4.y])
    );
  };

  const checkAllMarkPoints = (p: CardTypes.ICardQuestionMarkPointPosition) => {
    let isCorrect = false;
    correctMarkPoints?.map(e => check(e.a, e.b, e.c, e.d, p) ? isCorrect = true : e);
    return isCorrect;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (marks.length >= marksCount) return;
    setMarks([...marks, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, id: generateId() }]);
  };

  useEffect(
    () => {
      const markPoints = marks.map(e => ({ x: e.x, y: e.y }));
      handleSelectedAnswers && handleSelectedAnswers(markPoints);
    },
    [marks],
  );

  return (
    <div className={`question ${className ? className :''}`}>
      {!isStatistic && (
        <>
          <Typography variant="h2">{title}</Typography>
          <Typography
            variant="text"
            color="grey_additional_2"
            className="my-16 d-block"
          >
            {instruction}
          </Typography>
          {appendix && <div dangerouslySetInnerHTML={{ __html: appendix }} className="inner-html" />}
        </>
      )}
      <div
        className="mt-24 photo-mark pos_relative"
        onMouseUp={onMouseUp}
      >
        <Image
          src={image.imageUrl}
          alt="photo mark image"
          classNames="photo-mark__img"
        />
        {marks.map((n, i) => (
          <Mark
            key={n.id}
            style={{ top: n.y - markSize / 2, left: n.x - markSize / 2 }}
            className="photo-mark__mark"
            state={ isStatistic ? 'success' :
              isChecked
                ? correctMarkPoints && correctMarkPoints.length && checkAllMarkPoints(n)
                  ? 'success'
                  : 'failed'
                : 'default'}
          />
        ))}
        {correctMarks.map((n, i) => (
          <Mark
            key={n.id}
            style={{ top: n.y - markSize / 2, left: n.x - markSize / 2 }}
            className="photo-mark__mark"
            state={'success'}
          />
        ))}
      </div>
      {!isStatistic && (
        <Typography
          variant="text"
          color="main_50"
          classNames="my-24"
        >
          Вы отметили {marks.length} из {marksCount}
        </Typography>
      )}
    </div>
  );
}

export default PhotoMark;
