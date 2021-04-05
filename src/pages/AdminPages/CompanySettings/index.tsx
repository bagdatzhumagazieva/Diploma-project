import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { Crop } from 'react-image-crop';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import { changeImageCropRatio } from 'src/utils/helpers';

import companyActions from 'src/store/company/actions';
import mediaActions from 'src/store/media/actions';
import groupActions from 'src/store/group/actions';
import branchActions from 'src/store/branch/actions';
import employmentActions from 'src/store/employment/actions';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import CompanyInfo from 'src/components/atoms/CompanyInfo';
import Modal from 'src/components/molecules/Modal';
// import Select from 'src/components/molecules/Select';
import { IOption } from 'src/components/molecules/Select/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
// import Input from 'src/components/molecules/Input';
import ModalEmployeeUpdate from 'src/components/molecules/ModalEmployeeUpdate';
import Layout from 'src/components/organisms/Layout';
import ModalImageAttachmentCrop from 'src/components/organisms/ModalImageAttachment/ModalImageAttachmentCrop.index';
import {
  companyBannerFull,
  // CompanyColorsOptions,
  // CompanyLanguages,
  companyLogoThumb,
} from 'src/pages/AdminPages/CompanySettings/consts';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import { CompanySettingsTypes } from 'src/pages/AdminPages/CompanySettings/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { BranchesTypes } from 'src/store/branch/types';
import { MediaTypes } from 'src/store/media/types';
import IconImage from 'src/assets/img/icons/image.svg';
import 'src/pages/AdminPages/CompanySettings/index.scss';

function CompanySettings(props: CompanySettingsTypes.IProps) {
  const {
    companyData, admins, adminsLoading, branches, groups,
    getBranches, uploadedCompanyLogoData, uploadedCompanyBannerData,
    updateEmployee, getCompanyById, getCompanyAdmins, getGroups,
    uploadCompanyLogo, setCompanyLogo, uploadCompanyBanner,
    setCompanyBanner, updatedEmployeeState,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [admin, setAdmin] = useState<EmploymentTypes.IRenderProps>();
  const [errorImage, setErrorImage] = useState<string>();
  const [isEditUserModal, setIsEditUserModal] = useState<boolean>(false);
  const companyUuid = localStorage.getItem('company_uuid') || '-1';
  const notification = useNotification();
  const { data: company, loading: companyLoading } = companyData || {};
  const onCloseEditUserModal = () => {
    setIsEditUserModal(false);
  };
  const { data: companyLogo, errorMessage: companyLogoError } = uploadedCompanyLogoData || {};
  const { data: companyBanner, errorMessage: companyBannerError } = uploadedCompanyBannerData || {};
  const [isImageCropLogoModalOpen, setImageCropLogoModal] = useState<boolean>(false);
  const [isImageCropBannerModalOpen, setImageCropBannerModal] = useState<boolean>(false);
  // const [companyInfo, setCompanyInfo] = useState<CompanySettingsTypes.ICompanyInfo>({
  //   title: '',
  //   language: CompanyLanguages[0],
  //   color: CompanyColorsOptions[0],
  // });

  useEffect(
    () => {
      const groupParams  = { companyId };
      getCompanyById && getCompanyById(companyId);
      getBranches && getBranches(companyId);
      getCompanyAdmins && getCompanyAdmins(companyId);
      getGroups && getGroups(groupParams);
    },
    [],
  );

  useEffect(
    () => {
      if (updatedEmployeeState) {
        notification.addStateNotification(updatedEmployeeState);
        if (updatedEmployeeState.responseType === NotificationType.Success) {
          companyId && getCompanyAdmins && getCompanyAdmins(companyId);
        }
      }
    },
    [updatedEmployeeState],
  );

  // useEffect(
  //   () => {
  //     company && setCompanyInfo(prevInfo => ({ ...prevInfo, title: company.name }));
  //   },
  //   [companyData],
  // );

  useEffect(
    () => {
      if (companyLogo) {
        setImageCropLogoModal(false);
        notification.addStateNotification({
          responseType: NotificationType.Success,
          description: 'Логотип успешно изменен',
        });
      } else if (companyLogoError) {
        setImageCropLogoModal(false);
        notification.addStateNotification({
          responseType: NotificationType.Danger,
          description: companyLogoError,
        });
      }
    },
    [uploadedCompanyLogoData],
  );

  useEffect(
    () => {
      if (companyBanner) {
        setImageCropBannerModal(false);
        notification.addStateNotification({
          responseType: NotificationType.Success,
          description: 'Баннер успешно изменен',
        });
      } else if (companyBannerError) {
        setImageCropLogoModal(false);
        notification.addStateNotification({
          responseType: NotificationType.Danger,
          description: companyBannerError,
        });
      }
    },
    [uploadedCompanyBannerData],
  );

  const onSaveCroppedLogo = (image: File, crop: Crop) => {
    (!crop.width || !crop.height) ? setErrorImage('Выделите нужную область') :
      changeImageCropRatio(image, crop, (imageRes: File | string, coords) => {
        uploadCompanyLogo && crop && uploadCompanyLogo(imageRes as File, coords);
      });
  };

  const onSaveCroppedLogoFromGallery = (image: MediaTypes.IRenderProps, crop: Crop) => {
    !crop.width || !crop.height ? setErrorImage('Выделите нужную область') :
      changeImageCropRatio(image.url, crop, (imageRes: File | string, coords) => {
        setCompanyLogo && setCompanyLogo(image.uuid, coords);
      });
  };

  const onSaveCroppedBanner = (image: File, crop: Crop) => {
    !crop.width || !crop.height ? setErrorImage('Выделите нужную область') :
      changeImageCropRatio(image, crop, (imageRes: File | string, coords) => {
        uploadCompanyBanner && crop && uploadCompanyBanner(imageRes as File, coords);
      });
  };

  const onSaveCroppedBannerFromGallery = (image: MediaTypes.IRenderProps, crop: Crop) => {
    !crop.width || !crop.height ? setErrorImage('Выделите нужную область') :
      changeImageCropRatio(image.url, crop, (imageRes: File | string, coords) => {
        setCompanyBanner && setCompanyBanner(image.uuid, coords);
      });
  };

  const branchesTreeSelect: ITreeOption[] = [{
    name: company?.name || '',
    value: company && company.id ? 'main' : '-1',
    children: branches
      ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
      : undefined,
  }];

  const onAdminClick = (employee: EmploymentTypes.IRenderProps) => {
    if (!admins) return;
    setIsEditUserModal(true);
    setAdmin(employee);
  };

  // const onCompanyTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCompanyInfo(prevInfo => ({ ...prevInfo, title: event.target.value }));
  // };
  //
  // const onCompanyLanguageChange = (option: IOption) => {
  //   setCompanyInfo(prevInfo => ({ ...prevInfo, language: option }));
  // };
  //
  // const onCompanyColorChange = (option: IOption) => {
  //   setCompanyInfo(prevInfo => ({ ...prevInfo, color: option }));
  // };

  const onCloseInvitationModal = () => {
    setIsEditUserModal(false);
  };

  const modalAdminInfoSave = (employee: EmploymentTypes.IUpdateEmployeeBodyProps) => {
    updateEmployee && updateEmployee(employee);
    setAdmin(undefined);
    setIsEditUserModal(false);
  };

  return (
    <Layout
      isAdminRouting
      classNames="company-settings-page"
    >
      <CompanyInfo
        loading={companyLoading}
        logo={companyLogoThumb(companyUuid, companyLogo?.thumbnail)}
        name={company?.name}
        address={company?.address}
        subscription={{
          name: company?.subscriptionName,
          endDate: company?.subscriptionEndDate,
        }}
        employees={{
          count: company?.employeesCount,
          maxLimit: company?.maxUsers,
        }}
      />
      <div className="company-settings-page__content color_grey__bg py-32">
        <div className="grid d-flex">
          <div className="settings">
            <Typography className="mb-24" variant="h1">Настройки</Typography>
            <div className="color_whiter__bg px-32 py-24">
              <div className="settings-card mt-24">
                <Typography variant="textmed" className="mb-24">Логотип</Typography>
                <div className="d-flex">
                  <Image
                    key={Date.now()}
                    alt="company logo"
                    src={companyLogoThumb(companyUuid, companyLogo?.thumbnail)}
                    className="settings__logo"
                  />
                  <div className="ml-24">
                    <Button
                      variant="textmed"
                      type="black-icon"
                      className="d-flex align-items-center align-self-start"
                      onClick={() => setImageCropLogoModal(true)}
                    >
                      <Image
                        alt="add image option"
                        className="mr-8"
                        src={IconImage}
                      />
                      Загрузить
                    </Button>
                    <Typography variant="subtext" classNames="mt-16">
                      JPG, PNG, GIF до 10 МБ
                    </Typography>
                  </div>
                  {isImageCropLogoModalOpen && (
                    <Modal
                      width={976}
                      onCloseClick={() => setImageCropLogoModal(false)}
                    >
                      <ModalImageAttachmentCrop
                        error={errorImage}
                        title="Выбор логотипа компании"
                        onDiscard={() => setImageCropLogoModal(false)}
                        onSaveCroppedImage={onSaveCroppedLogo}
                        onSaveCroppedImageFromGallery={onSaveCroppedLogoFromGallery}
                      />
                    </Modal>
                  )}
                </div>
              </div>

              {/*<div className="settings__divider" />*/}

              {/*<div className="settings__info">*/}
              {/*  <Typography variant="textmed" className="mb-24">Общая информация</Typography>*/}
              {/*  <div className="settings__info">*/}
              {/*    <Input*/}
              {/*      type="text"*/}
              {/*      label="Название компании"*/}
              {/*      value={companyInfo.title}*/}
              {/*      onChange={onCompanyTitleChange}*/}
              {/*      classNames=""*/}
              {/*      placeholder="Название компании"*/}
              {/*    />*/}
              {/*    <div className="mt-24 d-flex justify-content-between">*/}
              {/*      <div className="settings__info__language">*/}
              {/*        <Typography variant="subtext" className="mb-4">Язык интерфейса</Typography>*/}
              {/*        <Select*/}
              {/*          staticWidth*/}
              {/*          options={CompanyLanguages}*/}
              {/*          selectedOption={companyInfo.language}*/}
              {/*          setSelectedOption={onCompanyLanguageChange}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*      <div className="settings__info__color">*/}
              {/*        <Typography variant="subtext" className="mb-4">Цвет для вашей компании</Typography>*/}
              {/*        <Select*/}
              {/*          staticWidth*/}
              {/*          options={CompanyColorsOptions}*/}
              {/*          selectedOption={companyInfo.color}*/}
              {/*          setSelectedOption={onCompanyColorChange}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="settings__divider" />*/}

              {/*<div>*/}
              {/*  <Typography variant="textmed" className="mb-24">Демо главной страницы</Typography>*/}
              {/*  <div className="company__demo pos_relative">*/}
              {/*    <Image*/}
              {/*      alt="company demo"*/}
              {/*      src={require(`src/assets/img/company-colors/${companyInfo.color.value}.jpg`)}*/}
              {/*      classNames="company__demo__image"*/}
              {/*    />*/}
              {/*    <Image*/}
              {/*      key={companyLogo?.thumbnail}*/}
              {/*      alt="company logo"*/}
              {/*      src={companyLogoThumb(companyUuid, companyLogo?.thumbnail)}*/}
              {/*      className="company__demo__logo"*/}
              {/*    />*/}
              {/*    <Image*/}
              {/*      key={companyBanner?.thumbnail}*/}
              {/*      alt="company banner"*/}
              {/*      src={companyBannerFull(companyUuid, companyBanner?.thumbnail)}*/}
              {/*      className="company__demo__banner"*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="settings__divider" />

              <div className="settings-card mt-24">
                <Typography variant="textmed" className="mb-24">Баннер главной страницы</Typography>
                <div>
                  <Image
                    key={Date.now()}
                    alt="company banner"
                    src={companyBannerFull(companyUuid, companyBanner?.thumbnail)}
                    className="settings__banner"
                  />
                  <div className="d-flex align-items-center mt-24">
                    <Button
                      variant="textmed"
                      type="black-icon"
                      className="d-flex align-items-center align-self-start"
                      onClick={() => setImageCropBannerModal(true)}
                    >
                      <Image
                        alt="add image option"
                        className="mr-8"
                        src={IconImage}
                      />
                      Загрузить
                    </Button>
                    <Typography variant="subtext" classNames="ml-16">
                      JPG, PNG, GIF до 10 МБ
                    </Typography>
                  </div>
                  {isImageCropBannerModalOpen && (
                    <Modal
                      width={976}
                      onCloseClick={() => setImageCropBannerModal(false)}
                    >
                      <ModalImageAttachmentCrop
                        aspect={6}
                        error={errorImage}
                        title="Выбор баннера компании"
                        onDiscard={() => setImageCropBannerModal(false)}
                        onSaveCroppedImage={onSaveCroppedBanner}
                        onSaveCroppedImageFromGallery={onSaveCroppedBannerFromGallery}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="admins">
            <Typography className="mb-24" variant="h1">Администраторы</Typography>
            {adminsLoading ? <Loader/> :
              (<div className="admins__list px-24">
                  {admins?.map((value: EmploymentTypes.IRenderProps) => {
                    return (
                      <div
                        key={value.id}
                        className="admins__list-options py-16 d-flex align-items-center"
                        onClick={() => onAdminClick(value)}>
                        <Image
                          className="admins__list-options__img mr-8"
                          src={value.avatarThumbnailUrl}
                          alt="Admin avatar"
                        />
                        <div className="d-flex flex-column">
                          <Typography classNames="color_main_65 mb-8" variant="text">
                            {`${value.firstName} ${value.lastName}`}
                          </Typography>
                          <Typography classNames="color_grey_additional_1" variant="subtext">{value.email}</Typography>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
        {isEditUserModal && (
          <Modal
            width={648}
            title="Информация о пользователе"
            onCloseClick={onCloseEditUserModal}
          >
            {admin && companyData && (
              <ModalEmployeeUpdate
                companyName={companyData?.data?.name || ''}
                companyId={companyId}
                branches={{
                  branchesOptions: branchesTreeSelect,
                  selectedTreeOption: branchesTreeSelect[0],
                }}
                groupsOptions={groups ? groups.map(n => ({ name: n.name, value: `${n.id}` } as IOption)) : []}
                employee={admin}
                setUpdatedData={modalAdminInfoSave}
                handleCancelClick={onCloseInvitationModal}
              />
            )}
          </Modal>
        )}
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  companyData: state.companyReducer.company,
  branches: state.branchReducer.branches.data,
  groups: state.groupReducer.groups.data,
  admins: state.companyReducer.admins.data,
  adminsLoading: state.companyReducer.admins.loading,
  uploadedCompanyLogoData: state.mediaReducer.uploadedCompanyLogo,
  uploadedCompanyBannerData: state.mediaReducer.uploadedCompanyBanner,
  updatedEmployeeState: state.employmentReducer.updatedEmployeeState.data,
});

const mapDispatchToProps = {
  getCompanyById: companyActions.getCompanyById,
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
  getCompanyAdmins: companyActions.getCompanyAdmins,
  uploadCompanyLogo: mediaActions.uploadCompanyLogo,
  setCompanyLogo: mediaActions.setCompanyLogo,
  uploadCompanyBanner: mediaActions.uploadCompanyBanner,
  setCompanyBanner: mediaActions.setCompanyBanner,
  updateEmployee: employmentActions.updateEmployee,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CompanySettings));
