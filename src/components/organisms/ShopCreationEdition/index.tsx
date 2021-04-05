import React, { useState, useEffect } from 'react';
import Typography from 'src/components/atoms/Typography';
import Stepper from 'src/components/atoms/Stepper';
import Button from 'src/components/atoms/Button';
import Availability from 'src/components/organisms/ShopCreationEdition/Availability';
import GeneralInformation from 'src/components/organisms/ShopCreationEdition/GeneralInfo';
import ShopContext from 'src/components/organisms/ShopCreationEdition/ShopContext';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { ShopSteps, DEFAULT_ITEM_VALUE } from 'src/components/organisms/ShopCreationEdition/consts';
import { ShopCreationEditionTypes } from 'src/components/organisms/ShopCreationEdition/types';
import 'src/components/organisms/ShopCreationEdition/index.scss';
import { ItemTypes } from 'src/store/item/types';
import { IOption } from 'src/components/molecules/Select/types';
import { connect } from 'react-redux';
import itemActions from 'src/store/item/actions';

function ShopCreationEdition(props: ShopCreationEditionTypes.IProps) {
  const { type, companyId, itemId, getItem, item } = props;
  const [step, setStep] = useState<number>(0);
  const [itemData, setItemData] = useState<ItemTypes.IBodyProps>(DEFAULT_ITEM_VALUE);
  const [itemCategoryOption, setItemCategoryOption] = useState<IOption>({ name: '', value: '' });
  const [boughtAmount, setBoughtAmount] = useState<number>(0);
  const value = {
    step,
    setStep,
    itemData,
    setItemData,
    itemCategoryOption,
    setItemCategoryOption,
    boughtAmount,
    setBoughtAmount,
  };

  const getStep = (step: number) => {
    return step === 0 ?
      <Availability companyId={companyId} /> :
      <GeneralInformation companyId={companyId} type={type} />;
  };

  const getItemById = (callbacks?: any) => {
    if (type === 'edit' && itemId && +itemId > -1) {
      getItem && getItem(companyId, +itemId, callbacks);
    }
  };

  useEffect(() => {
    getItemById();
  },        []);

  useEffect(
    () => {
      if (!item) return;
      if (type === 'edit') {
        setItemData({
          name: item.name,
          description: item.description,
          price: item.price,
          amount: item.amount,
          branchIds: item.branchIds,
          groupIds: item.groupIds,
          categoryId: item.category.id,
          images: item.images,
        });
        setItemCategoryOption({ name: item.category.name, value: item.category.id.toString(10) });
        setBoughtAmount(item.boughtAmount || 0);
      }
    },
    [item],
  );

  return (
    <ShopContext.Provider value={value}>
      <div className="shop-creation-edition pb-64">
        <div className="grid">
          <Typography variant="headline" className="pt-32">
            {type === 'edit' ? 'Редактировние приза' : 'Создание приза'}
          </Typography>

          <div className="d-flex mt-32">
            <div>
              <Stepper
                isStepsNumbered
                className="mr-24"
                steps={ShopSteps}
                currentStep={step}
                onStepClick={setStep}
              />
              <Button
                to={addAdminSlash(AdminRouterPaths.SHOP)}
                type="outlined"
                className="shop-creation-edition__btn mt-24"
              >
                Отменить
              </Button>
            </div>
            <div className="shop-creation-edition__body ml-24">
              {getStep(step)}
            </div>
          </div>

        </div>
      </div>
    </ShopContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  item: state.itemReducer.item.data,
});

const mapDispatchToProps = {
  getItem: itemActions.getItem,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(ShopCreationEdition);
