import React from 'react';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import { ReactComponent as Arrow } from 'src/assets/img/icons/arrow-left.svg';
import { BreadcrumbTypes } from 'src/components/atoms/BreadCrumb/types';
import 'src/components/atoms/BreadCrumb/index.scss';

function Breadcrumb(props: BreadcrumbTypes.IProps) {
  const { items, itemsLoading, className, withTrail } = props;
  return (
    <div className={
      classNames(`breadcrumb d-flex align-items-center flex-wrap ${className}`, { covered: itemsLoading })
    }>
      {items && items.map((n, i) => (
        <div key={i} className="d-flex align-items-center">
          <Button
            type="link"
            color={(withTrail || i === items.length - 1) ? 'blacker' : 'grey_additional_1'}
            variant={withTrail ? 'xsmallunderlined' : 'text'}
            to={n.link}
          >
            {n.label}
          </Button>
          {i !== items.length - 1 && (
            withTrail
              ? <Arrow className="breadcrumb__arrow" />
              : <Typography variant="subtext" classNames={'breadcrumb__separator'}>/</Typography>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
