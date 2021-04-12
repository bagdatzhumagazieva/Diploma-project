import React, { useContext, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import useNotification from 'src/components/molecules/Notification/useNotification';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';
import Module from 'src/components/organisms/CourseCreationEdition/Content/Module';
import ModuleAdditionEdition from 'src/components/organisms/CourseCreationEdition/Content/ModuleAdditionEdition';

import { ContentTypes, IEditOrCreateModule } from 'src/components/organisms/CourseCreationEdition/Content/types';
import { MODULE_DEFAULT_DATA2 } from 'src/components/organisms/CourseCreationEdition/Content/consts';
import { ModuleStatus, ModuleTypes } from 'src/store/module/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { ReactComponent as PlusIcon } from 'src/assets/img/icons/plus.svg';
import { Status } from 'src/store/course/types';
import './index.scss';

function Content(props: ContentTypes.IProps) {
  const { companyId, handleCardCreateClick, handleCardEditClick } = props;
  const [isShowAddEditModule, setShowAddEditModule] = useState<boolean>(false);
  const [curModule, setCurModule] = useState<IEditOrCreateModule>(MODULE_DEFAULT_DATA2);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedModuleId, setDeletedModuleId] = useState<string>();
  const {
    modules, setModules, courseData, mapCards,
    isCourseDataUpdated, setCourseDataUpdated,
    setDeletedModuleIds, deletedModuleIds,
    setStep,
  } = useContext(CourseCreationContext);
  const notification = useNotification();

  const onAddModuleClick = () => {
    setCurModule(MODULE_DEFAULT_DATA2);
    setShowAddEditModule(true);
  };

  const onCreateCancelClick = () => {
    setCurModule(MODULE_DEFAULT_DATA2);
    setShowAddEditModule(false);
  };

  const onEditModuleClick = (module: ModuleTypes.IRenderProps) => {
    setCurModule({ module: { ...module }, type: 'edit' });
    setShowAddEditModule(true);
  };

  const handleModuleData = (type: 'create' | 'edit', module: ModuleTypes.IRenderProps) => {
    const curModules = [...modules];
    if (type === 'create') {
      setModules([...curModules, module]);
    } else {
      const editedModuleIndex = curModules.findIndex(item => item.id === module.id);
      if (editedModuleIndex === -1) return;

      curModules[editedModuleIndex] = {
        ...curModules[editedModuleIndex],
        ...module,
      };
      setModules([...curModules]);
    }
    !isCourseDataUpdated && setCourseDataUpdated(true);
    setShowAddEditModule(false);
  };

  const onDeleteModuleClick = (id: string) => {
    setShowDeleteModal(true);
    setDeletedModuleId(id);
  };

  const onSubmitDeleteModuleClick = (id: string | undefined) => {
    if (!id) return;
    const curModules = modules
      .filter(item => item.id !== id)
      .map((item, index) => ({
        ...item,
        orderIndex: index + 1,
        ...(item.status !== ModuleStatus.NEW ? { status: ModuleStatus.EDITED } : {}),
      }));
    const deletedItem = modules.find(item => item.id === id);
    if (deletedItem && deletedItem.status !== ModuleStatus.NEW) {
      setDeletedModuleIds([...deletedModuleIds, +id]);
    }
    setModules(curModules);
    !isCourseDataUpdated && setCourseDataUpdated(true);
    notification.add(
      {
        type: NotificationType.Success,
        duration: 5000,
        description: 'Модуль успешно удален',
        width: '600px',
        withIcon: true,
        size: 'small',
      });
    setShowDeleteModal(false);
  };

  const onCancelDeleteModuleClick = () => {
    setDeletedModuleId(undefined);
    setShowDeleteModal(false);
  };

  const isDataOrderChanged = (oldModules: ModuleTypes.IRenderProps[], newModules: ModuleTypes.IRenderProps[]) => {
    if (oldModules.length !== newModules.length) return true;
    const len = oldModules.length;
    for (let index = 0; index < len; index += 1) {
      if (oldModules[index].id !== newModules[index].id) return true;
    }
    return false;
  };

  const handleModulesChanges = (newModules: ModuleTypes.IRenderProps[]) => {
    if (!isDataOrderChanged(modules, newModules)) return;
    const newModulesWithChanges = newModules.map((item, index) => ({
      ...item,
      orderIndex: index + 1,
      ...(item.status !== ModuleStatus.NEW ? { status: ModuleStatus.EDITED } : {}),
    }));
    setModules(newModulesWithChanges);
    !isCourseDataUpdated && setCourseDataUpdated(true);
  };

  return (
    <div className="content d-flex flex-column">
      <div className="content__block px-24 py-32 d-flex flex-column">
        <Typography variant="h1" className="mb-32">Контент</Typography>
        {!isShowAddEditModule ? (
          <div>
            {modules?.length > 0 ? (
              <div>
                <ReactSortable
                  handle=".handle"
                  list={modules}
                  setList={handleModulesChanges}
                >
                  {modules.filter(item => item.status !== ModuleStatus.DELETED).map((item, index) => (
                    <Module
                      id={item.id}
                      companyId={companyId}
                      key={`module-${index}-${item.id}`}
                      index={index}
                      name={item.name}
                      description={item.description}
                      imageThumbnail={item.imageThumbnail}
                      cardIds={item.cardIds}
                      cards={mapCards.get(item.id) || []}
                      status={item.status}
                      disabled={courseData.status === Status.PUBLISHED}
                      className="mb-32"
                      onEditClick={() => onEditModuleClick(item)}
                      onDeleteClick={onDeleteModuleClick}
                      handleCardCreateClick={handleCardCreateClick}
                      handleCardEditClick={handleCardEditClick}
                    />
                  ))}
                </ReactSortable>
              </div>
            ) : (
              <div className="content__empty-module fill_w mb-32">
              </div>
            )}
            <Button
              type="black-icon"
              variant="textmed"
              className="content__module-button align-self-start"
              disabled={courseData.status === Status.PUBLISHED}
              onClick={onAddModuleClick}
            >
              <PlusIcon className="module-button__plus-icon mr-8" />
              Добавить Модуль
            </Button>
            <div className="line my-32" />
          </div>
        ) : (
          <ModuleAdditionEdition
            type={curModule.type}
            data={{ ...curModule.module }}
            index={modules.length + 1}
            onCancelClick={onCreateCancelClick}
            setModuleData={handleModuleData}
          />
        )}
      </div>
      <div className="align-self-end d-flex align-items-center mt-32">
        <Button variant="textmed" type="link-black" onClick={() => setStep(1)}>Назад</Button>
        <Button variant="textmed" className="next-button ml-24" onClick={() => setStep(3)}>Далее</Button>
      </div>
      {showDeleteModal && (
        <Modal
          title="Удаление модуля"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onDeleteClick={() => onSubmitDeleteModuleClick(deletedModuleId)}
          onCloseClick={onCancelDeleteModuleClick}
        >
          <Typography variant="text" className="px-32">Вы действительно хотите удалить данный модуль?</Typography>
        </Modal>
      )}
    </div>
  );
}

export default Content;
