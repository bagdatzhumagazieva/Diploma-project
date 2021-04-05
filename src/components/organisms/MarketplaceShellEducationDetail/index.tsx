import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import Card from 'src/components/atoms/Cards/Card';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import CardMarketplaceInfo from 'src/components/atoms/Cards/CardMarketplaceInfo';
import Comments from 'src/components/organisms/Comments';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { MarketplaceShellEducationDetailTypes } from 'src/components/organisms/MarketplaceShellEducationDetail/type';
import Slider from 'src/components/atoms/Slider';
import 'src/components/organisms/MarketplaceShellEducationDetail/index.scss';
import marketplaceActions from 'src/store/marketplace/actions';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import Loader from 'src/components/atoms/Loader';

function MarketplaceShellEducationDetail(props: MarketplaceShellEducationDetailTypes.IProps) {
  const { type, getItemDetail, marketplaceItemDetailLoading, marketplaceItemDetail } = props;
  const { id } = useParams();
  const itemId = id ? +id : -1;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  useEffect(
    () => {
      if (itemId === -1) return;
      getItemDetail && companyId && getItemDetail(+companyId, itemId);
    },
    [itemId],
  );

  return (
    <div className="grid py-64">
      {marketplaceItemDetailLoading && <Loader className="mt-64" /> }
      {marketplaceItemDetail && !marketplaceItemDetailLoading && (
        <>
          <Breadcrumb
            items={[
              { label: 'Marketplace', link: addAdminSlash(AdminRouterPaths.MARKETPLACE) },
              { label: type === 'shell' ? 'Оболочки' : 'Учебный контент',
                link: type === 'shell' ? addAdminSlash(AdminRouterPaths.MARKETPLACE) :
                 addAdminSlash(`${AdminRouterPaths.MARKETPLACE}?type=content`),
              },
              { label: marketplaceItemDetail.name },
            ]}
          />
          <div className="d-flex justify-content-center pt-48">
            <div className="slider-comments-margin">
              <Slider
                photos={marketplaceItemDetail.images
                  .map(img => ({ imgUrl: img.imageUrl, imgThumbnailUrl: img.imageThumbnailUrl }))}
              />
              <div className="comments-theme mt-24">
                <Comments type="MARKETPLACE_ITEM" uuid={marketplaceItemDetail.entityUuid} className="mt-32" />
              </div>
            </div>
            <div>
              <CardMarketplaceInfo
                entityId={marketplaceItemDetail.entityId}
                entityType={type}
                price={marketplaceItemDetail.price}
                text={marketplaceItemDetail.description}
                title={marketplaceItemDetail.name}
                stars={marketplaceItemDetail.rating}
                headTitle={marketplaceItemDetail.categoryName}
                isBought={marketplaceItemDetail.isBought}
              />
              <Card classNames="card-detail">
                <div className="client-card">
                  <Typography variant="textmed">
                    Создатель {type === 'shell' ? 'оболочки' : 'контента'}
                  </Typography>
                  <div className="client-card-content mt-8">
                    <div className="d-flex flex-column">
                      <div>
                        <Typography variant="xsmall" className="mt-16">Название:</Typography>
                        <Typography variant="xsmall" color="grey_additional_1" className="mt-16 ml-4">
                          {marketplaceItemDetail.creatorName || ' '}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="xsmall" className="mt-16">Почта:</Typography>
                        <Typography variant="xsmall" color="grey_additional_1" className="mt-16 ml-4">
                          {marketplaceItemDetail.creatorEmail || ' '}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="xsmall" className="mt-16">Телефон:</Typography>
                        <Typography variant="xsmall" color="grey_additional_1" className="mt-16 ml-4">
                          {marketplaceItemDetail.creatorPhone || ' '}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="xsmall" className="mt-16">Местонахождение:</Typography>
                        <Typography variant="xsmall" color="grey_additional_1" className="mt-16 ml-4">
                          {marketplaceItemDetail.creatorAddress || ' '}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  marketplaceItemDetail: state.marketplaceReducer.marketplaceItemDetail.data,
  marketplaceItemDetailLoading: state.marketplaceReducer.marketplaceItemDetail.loading,
});

const mapDispatchToProps = {
  getItemDetail: marketplaceActions.getItemDetail,
};

export default connect<any, any>(mapStateToProps, mapDispatchToProps)(MarketplaceShellEducationDetail);
