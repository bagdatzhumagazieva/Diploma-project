import React, { useContext, useEffect, useState } from 'react';

import AppContext from 'src/components/AppContext';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import CardSearch from 'src/components/organisms/CardSearch';
import FilterTags from 'src/components/organisms/FilterTags';

import { IOption } from 'src/components/molecules/Select/types';
import { UserCardsTypes } from 'src/components/organisms/AdminCards/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { CardSortOptions, CardSortParams } from 'src/components/organisms/AdminCards/consts';
import { ExampleAlphabet } from 'src/components/organisms/FilterTags/mocks';
import 'src/components/organisms/AdminCards/index.scss';

function UserCards(props: UserCardsTypes.IProps) {
  const { companyId } = useContext(AppContext);
  const [selectedSort, setSelectedSort] = useState<IOption>(CardSortOptions[0]);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(
    () => {
      setTags([]);
      setSelectedSort(CardSortOptions[0]);
    },
    [companyId],
  );

  return (
    <div className="user-cards">
      <div className="pb-24 pt-48 grid d-flex align-items-center">
        <Typography variant="headline">
          База знаний
        </Typography>
        <div className="d-flex align-items-center ml-auto">
          <FilterTags
            alphabet={ExampleAlphabet}
            companyId={companyId}
            handleTags={setTags}
          />
          <Typography
            variant="subtext"
            className="ml-20 mr-8"
            color="grey_additional_2"
          >
            Сортировка:
          </Typography>
          <Select
            staticWidth
            classNames="user-cards__sort"
            options={CardSortOptions}
            selectedOption={selectedSort}
            setSelectedOption={setSelectedSort}
          />
        </div>
      </div>
      <div className="color_grey__bg pb-48 pt-32">
        <CardSearch
          tags={tags}
          companyId={companyId}
          additionalParams={{
            ...CardSortParams[selectedSort.value],
            tagIds: tags.map(n => n.id),
          }}
          className="color_whiter__bg grid"
        />
      </div>
    </div>
  );
}

export default UserCards;
