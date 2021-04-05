import React from 'react';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import { CardPreviewTypes } from 'src/components/organisms/CardCreation/CardPreview/types';
import Image from 'src/components/atoms/Image';
import 'src/components/organisms/CardCreation/CardPreview/index.scss';

function CardPreview(props: CardPreviewTypes.IProps) {
  const {
    type,
    generalInformation,
    onBackClick,
    onPreviewStepCompleted,
    categoryPath,
    content,
  } = props;

  return (
    <>
      <div className="card-preview">
        <Typography
          variant="headline"
          className="mb-32"
        >
          Предпросмотр
        </Typography>
        <Button
          type="link"
          variant="subtext"
          className="d-flex align-items-center"
        >
          <FavoriteIcon
            bordered
            className="card-preview__fav-icon mr-8"
          />
          В избранное
        </Button>
        <Typography
          variant="h1"
          className="my-24"
        >
          {generalInformation.title}
        </Typography>

        {generalInformation.imageUrl && (
          <Image
            alt="card-image"
            src={generalInformation.imageUrl}
            className="card-view__main-image mb-24 fill_w"
          />
        )}

        {content.description && (
          <div
            className="mb-24 inner-html card-view__description"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        )}
        {content.article && (
          <div className="my-24 inner-html" dangerouslySetInnerHTML={{ __html: content.article }} />
        )}

        {generalInformation.tags.length > 0 && (
          <div className="mt-32 mb-24">
            <Typography
              variant="subtext"
              color="grey_additional_2"
            >
              Тэги:
            </Typography>
            <div className="d-flex align-items-center flex-wrap">
              {generalInformation.tags.map((n, i) => (
                <Typography
                  key={i}
                  variant="subtext"
                  color="main_50"
                  className="mr-16 mt-8 mr-8"
                >
                  #{n.name}
                </Typography>
              ))}
            </div>
          </div>
        )}

        {categoryPath && (
          <div className="mt-24">
            <Typography
              variant="subtext"
              color="grey_additional_2"
            >
              Рубрики:
            </Typography>
            <Breadcrumb
              withTrail
              className="mt-8"
              items={categoryPath.map(n => ({ label: n?.name || '' }))}
            />
          </div>
        )}
      </div>
      <div className="d-flex align-items-center mt-32">
        <Button
          type="link"
          color="blacker"
          variant="textmed"
          className="ml-auto mr-24"
          onClick={onBackClick}
        >
          Назад
        </Button>
        <Button
          variant="textmed"
          className="card-creation__next-btn"
          onClick={onPreviewStepCompleted}
        >
          {type === 'create' ? 'Создать' : 'Сохранить'}
        </Button>
      </div>
    </>
  );
}

export default CardPreview;
