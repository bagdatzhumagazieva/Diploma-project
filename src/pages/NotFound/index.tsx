import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Typography from 'src/components/atoms/Typography';
import { NotFoundTypes } from 'src/pages/NotFound/types';
import 'src/pages/NotFound/index.scss';
import { LOCAL_STORAGE } from 'src/core/store/values';

function NotFound(props: NotFoundTypes.IProps) {
  const { currentColor = 'orange' } = props;
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  },        [token]);
  return (
    <div className={`not-found not-found__color-${currentColor}`}>
      <div className="not-found__content d-flex align-items-center flex-column">
        <Typography className="mb-48 text-center" variant="caption">404</Typography>
        <Typography className="mb-32" variant="text">Что-то пошло не так или страница не найдена...</Typography>
        <Link
          className="link-button"
          to="/dashboard"
        >
          <Typography className="color_whiter fill_w text-center py-16" variant="text">На главную</Typography>
        </Link>
      </div>
      <div className="circles">
        <div className="circles__right fill-circle"/>
        <div className="circles__left-bottom fill-circle"/>
        <div className="circles__top-right bordered-circle"/>
        <div className="circles__top fill-circle"/>
        <div className="circles__top-left bordered-circle"/>
        <div className="circles__bottom-right bordered-circle"/>
        <div className="circles__bottom bordered-circle"/>
        <div className="circles__left bordered-circle"/>
      </div>
    </div>
  );
}

export default NotFound;
