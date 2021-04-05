import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { generateId } from 'src/utils/generation';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Input from 'src/components/molecules/Input';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import { SequenceChipsTypes } from 'src/components/molecules/SequenceChips/types';
import 'src/components/molecules/SequenceChips/index.scss';

function SequenceChips(props: SequenceChipsTypes.IProps) {
  const { className, sequence, onSequenceChange } = props;

  const [selectedItem, setSelectedItem] = useState<SequenceChipsTypes.ISequence>({ id: '', text: '' });
  const [inputValue, setInputValue] = useState<string>('');

  const onSelectedItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedItem({ ...selectedItem, text: value });
  };

  const onDeleteItemClick = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onSequenceChange(sequence.filter(item => item.id !== id));
    clearSearch();
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onAddToListClick = () => {
    if (selectedItem.id) {
      onSequenceChange([...sequence].map(item => (
        selectedItem.id !== item.id
          ? item
          : { ...item, value: selectedItem.text }),
      ));
    } else {
      onSequenceChange([...sequence, { id: generateId(), text: inputValue }]);
    }
    clearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.keyCode === 13) &&
      (inputValue.trim() || selectedItem.text.trim())
    ) {
      onAddToListClick();
    }
  };

  const clearSearch = () => {
    setInputValue('');
    setSelectedItem({ id: '', text: '' });
  };

  const onInputBlur = () => {
    if (inputValue.trim() || selectedItem.text.trim()) {
      onAddToListClick();
    }
  };

  return (
    <div className={`sequence-chips ${className}`}>
      <div className="sequence-chips__content d-flex align-items-center flex-wrap">
        <ReactSortable
          animation={150}
          ghostClass="sequence-chips__drop-placeholder"
          list={sequence}
          setList={onSequenceChange}
          className="d-flex align-items-center flex-wrap"
        >
          {sequence.map(item => (
            selectedItem.id === item.id ?
              <div
                key={item.id}
                className="sequence-chips__edit-input-wrap"
              >
                <Input
                  type="text"
                  variant="text"
                  id={selectedItem.id}
                  value={selectedItem.text}
                  size={selectedItem.text.length + 2}
                  onKeyDown={handleKeyDown}
                  onChange={onSelectedItemChange}
                  onBlur={onInputBlur}
                  classNames="sequence-chips__edit-input"
                />
              </div> :
              <div
                key={item.id}
                className="sequence-chips__chip d-flex align-items-center"
                onClick={() => setSelectedItem({ id: item.id, text: item.text })}
              >
                <Typography
                  variant="xsmall"
                  className="mr-8"
                >
                  {item.text}
                </Typography>
                <Button
                  type="link"
                  className="d-flex"
                  onClick={onDeleteItemClick(item.id)}
                >
                  <CancelIcon className="sequence-chips__chip__delete" />
                </Button>
              </div>
          ))}
        </ReactSortable>
        <div className="sequence-chips__input-wrap">
          <Input
            type="text"
            variant="text"
            classNames="sequence-chips__input"
            value={inputValue}
            onBlur={onInputBlur}
            onKeyDown={handleKeyDown}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SequenceChips;
