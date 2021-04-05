import React, { useContext } from 'react';
import Button from 'src/components/atoms/Button';
import IconPlus from 'src/components/atoms/Svg/Plus';
import Typography from 'src/components/atoms/Typography';
import Checkbox from 'src/components/molecules/Checkbox';
import RadioButton from 'src/components/atoms/RadioButton';
import Input from 'src/components/molecules/Input';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { AnswerOptionsTypes } from 'src/components/atoms/AnswerOptions/types';
import CardCreationContext from 'src/components/organisms/CardCreation/CardCreationContext';
import 'src/components/atoms/AnswerOptions/index.scss';

function AnswerOptions(props: AnswerOptionsTypes.IProps) {
  const {
    isPollAnswer,
    isOpenQuestion,
    answerOptions,
    withMultipleSelect,
    isDefaultOtherOptionAddable,
    onNewOptionAdd,
    onOptionDelete,
    onAnswerOptionsChange,
  } = props;
  const { isQuizCard } = useContext(CardCreationContext);

  const { options, selectedOption, selectedOptions } = answerOptions;
  const hasDefaultOtherOptions = answerOptions.options.some(n => n.isDefaultOtherOptions);

  const onInputChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = options.map(n => n.id === id ? { ...n, label: event.target.value } : n);
    onAnswerOptionsChange({ ...answerOptions, options: updatedOptions });
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerOptionsChange({ ...answerOptions, selectedOption: event.target.value });
  };

  const checkboxHandler = (state: boolean, id: string) => {
    onAnswerOptionsChange({
      ...answerOptions,
      selectedOptions: selectedOptions
        ? (selectedOptions.includes(id) ? selectedOptions.filter(n => n !== id) : [...selectedOptions, id])
        : [],
    });
  };

  return (
    <table className="answer-options">
      <colgroup>
        <col className="answer-options__col__checkbox"/>
        <col />
      </colgroup>
      <thead>
        <tr className="answer-option__header">
          {!isQuizCard && (
            <th className="answer-option__header__checkbox">
              <Typography
                variant="tag"
                color="grey_additional_2"
                classNames="d-block text-left"
              >
                {!isPollAnswer && 'Правильный'}
              </Typography>
            </th>
          )}
          <th className="answer-option__header__variant">
            <Typography
              variant="tag"
              color="grey_additional_2"
              classNames="d-block text-left"
            >
              Вариант
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {options.map(n => (
          <tr key={n.id} className="answer-options__row">
            {!isQuizCard &&
              (withMultipleSelect ?
                <td className="answer-option__checkbox-wrap">
                  <Checkbox
                    id={n.id}
                    isClicked={selectedOptions && selectedOptions.includes(n.id)}
                    setClicked={checkboxHandler}
                    classNames="answer-option__checkbox"
                  />
                </td> :
                <td className="answer-option__radio-wrap">
                  <RadioButton
                    name="gender"
                    value={n.id}
                    setClicked={radioButtonHandler}
                    isChecked={n.id === selectedOption}
                    classNames="answer-option__radio"
                  />
                </td>)
            }
            <td className="d-flex align-items-center">
              <Input
                type="text"
                name="question"
                value={n.label}
                disabled={n.isDefaultOtherOptions}
                onChange={onInputChange(n.id)}
                placeholder="Впишите вариант"
                classNames="answer-option__label fill_w"
              />
              {!isOpenQuestion && (
                <CancelIcon
                  color="#7A7B82"
                  className="mr-16 pointer"
                  onClick={() => onOptionDelete(n.id)}
                />
              )}
            </td>
          </tr>
        ))}
        <tr className="answer-options__row">
          {!isQuizCard && <td className="answer-options__empty"/>}
          <td>
            {(withMultipleSelect ? options.length >= 8 : options.length >= 4) ?
              <Typography
                variant="subtext"
                classNames="my-16 mx-20"
                color="main_50"
              >
                Максимальное количество ответов не может превышать {withMultipleSelect ? ' 8' : ' 4'}
              </Typography> :
              <div className="d-flex align-items-center px-16 py-20">
                {!isOpenQuestion && (
                  <Button
                    type="link"
                    className="d-flex align-items-center answer-options__add-btn"
                    variant="subtext"
                    onClick={() => onNewOptionAdd(false)}
                  >
                    <IconPlus className="answer-options__add-btn__icon mr-8" />
                    Добавить
                  </Button>
                )}
                {(!hasDefaultOtherOptions && isDefaultOtherOptionAddable) && (
                  <div className="d-flex align-items-center">
                    <Typography
                      variant="subtext"
                      color="grey_additional_2"
                      className="mx-16"
                    >
                      или
                    </Typography>
                    <Button
                      type="link"
                      variant="subtext"
                      onClick={() => onNewOptionAdd(true)}
                    >
                      добавить вариант “Другое“
                    </Button>
                  </div>
                )}
              </div>
            }
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default AnswerOptions;
