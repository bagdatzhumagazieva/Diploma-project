import React, { useState } from 'react';
import Button from 'src/components/atoms/Button';
import CardCompanyChoice from 'src/components/molecules/Cards/CardCompanyChoice/index';
import { GroupCardCompanyChoiceTypes } from 'src/components/molecules/Cards/CardCompanyChoice/types';
import 'src/components/molecules/Cards/CardCompanyChoice/index.scss';

function GroupCardCompanyChoice(props: GroupCardCompanyChoiceTypes.IProps) {
  const { companies, loading, handleCompanyClick } = props;
  const [amountShowedCompanies, setAmountShowedCompanies] = useState(3);

  return (
    <div className="group-card-company-choice d-flex flex-column">
      {companies.slice(0, amountShowedCompanies).map((item, index) => (
        <CardCompanyChoice
          key={index}
          id={item.id}
          imageSrc={item.logoThumbnailUrl || ''}
          name={item.name}
          slug={item.slug}
          loading={loading}
          className="group-card-company-choice__item"
          handleCompanyClick={() => handleCompanyClick && handleCompanyClick(item.id, item.uuid)}
        />
      ))}
      {companies.length > 3 && (
        <Button
          type="link"
          variant="textmed"
          className="align-self-end mt-32"
          onClick={() => setAmountShowedCompanies(amountShowedCompanies < companies.length ? companies.length : 3)}
        >
          {amountShowedCompanies < companies.length ? 'Смотреть все' : 'Скрыть' }
        </Button>
      )}
    </div>
  );
}

export default GroupCardCompanyChoice;
