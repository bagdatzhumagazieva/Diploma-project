import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';
import Button from 'src/components/atoms/Button';
import { AuthFooterTypes } from 'src/components/molecules/AuthFooter/types';
import { languages } from 'src/components/molecules/AuthFooter/mock';
import './index.scss';

function AuthFooter(props: AuthFooterTypes.IProps) {
  const attributes = mapPropsToAttributes(
    props, `auth-footer auth-footer_border--${props.color || 'white'}`,
    'fill_w d-flex justify-content-center');
  const [curLang, setCurLang] = useState<string>(languages[0]);

  const onChangeLanguage = (value: string): Promise<any> => {
    setCurLang(value);
    return props.i18n.changeLanguage(value);
  };

  return (
    <div {...attributes}>
      <div>
        {languages.map((n: string, i: number) => (
          <Button
            key={i}
            onClick={() => onChangeLanguage(n)}
            color={props.color || 'whiter'}
            className={classNames(
              'auth-footer__button',
              { 'auth-footer__button--active' : curLang === n },
              { 'mr-48' : i !== languages.length - 1 },
            )}
            type="link"
            variant="subtext"
          >
            {props.t(`common:${n}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default withTranslation('common')(AuthFooter);
