import React, { useState } from 'react';
import Typography from 'src/components/atoms/Typography';
import Stepper from 'src/components/atoms/Stepper';
import Button from 'src/components/atoms/Button';
import Receiver from 'src/components/organisms/NotificationCreationEdition/Receiver';
import GeneralInformation from 'src/components/organisms/NotificationCreationEdition/GeneralInfo';
import NotificationContext from 'src/components/organisms/NotificationCreationEdition/NotificationContext';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { NotificationSteps } from 'src/components/organisms/NotificationCreationEdition/consts';
import { NotificationCreationEditionTypes } from 'src/components/organisms/NotificationCreationEdition/types';
import 'src/components/organisms/NotificationCreationEdition/index.scss';

function NotificationCreationEdition(props: NotificationCreationEditionTypes.IProps) {
  const { type } = props;
  const [step, setStep] = useState<number>(0);
  const value = { step, setStep };

  const getStep = (step: number) => {
    return step === 0 ?
      <Receiver /> :
      <GeneralInformation />;
  };

  return (
    <NotificationContext.Provider value={value}>
      <div className="notification-creation-edition color_grey__bg pb-64">
        <div className="grid">
          <Typography variant="headline" className="pt-32">
            {type === 'edit' ? 'Редактировние уведомления' : 'Создание уведомления'}
          </Typography>

          <div className="d-flex mt-32">
            <div>
              <Stepper
                isStepsNumbered
                className="mr-24"
                steps={NotificationSteps}
                currentStep={step}
                onStepClick={setStep}
              />
              <Button
                to={addAdminSlash(AdminRouterPaths.NOTIFICATION_DISTRIBUTION)}
                type="outlined"
                variant="textmed"
                className="notification-creation-edition__btn mt-24"
              >
                Отменить
              </Button>
            </div>
            <div className="notification-creation-edition__body ml-24">
              {getStep(step)}
            </div>
          </div>
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export default NotificationCreationEdition;
