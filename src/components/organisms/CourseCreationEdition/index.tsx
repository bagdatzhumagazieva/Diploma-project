import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Stepper from 'src/components/atoms/Stepper';
import ModalLoading from 'src/components/atoms/ModalLoading';
import GeneralInformation from 'src/components/organisms/CourseCreationEdition/GeneralInformation';
import Reward from 'src/components/organisms/CourseCreationEdition/Reward';
import Content from 'src/components/organisms/CourseCreationEdition/Content';
import CourseDetail from 'src/components/organisms/CourseDetail';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';
import ModalCardCreationEdition from 'src/pages/AdminPages/Card/CardCreationPage/ModalCardCreation';
import Modal from 'src/components/molecules/Modal';

// import courseActions from 'src/store/course/actions';
// import { getModules, createModules, updateModules, deleteModules } from 'src/store/module/actions';
// import { getCards, clearCardsState } from 'src/store/card/actions';
// import { getTagsByIds } from 'src/store/tag/actions';
import * as api from 'src/store/card/api';

import { CourseCreationTypes } from 'src/components/organisms/CourseCreationEdition/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import {
  CREATION_STEPS, DEFAULT_COURSE_DATA,
  DEFAULT_NOTIFICATION_DATA, parseToICards,
} from 'src/components/organisms/CourseCreationEdition/consts';
import { CourseDetailTypes, CourseTypes, ProgressStatus, Status } from 'src/store/course/types';
import { ModuleStatus, ModuleTypes } from 'src/store/module/types';
import DeleteIcon from 'src/assets/img/icons/delete.svg';
import SaveIcon from 'src/assets/img/icons/save.svg';
import CheckIcon from 'src/assets/img/icons/check.svg';
import { AdminRouterPaths } from 'src/core/enum';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { IRenderBody } from 'src/core/components/types';
import { CardTypes } from 'src/store/card/types';
import 'src/components/organisms/CourseCreationEdition/index.scss';

function CourseCreationEdition(props: CourseCreationTypes.IProps) {
  const {
    companyId, type, course, getCourse,
    updateCourse, createModules, updateModules,
    createCourse, deleteModules, coursesToDraft,
    coursesToPublish, clearCardsState, state,
    getModules, modules: propsModules, courseId,
    getTagsByIds, tagsByIds, deleteCourse, clearCourse,
  } = props;
  const [step, setStep] = useState<number>(0);
  const [courseData, setCourseData] = useState<CourseTypes.IRenderProps>({ ...DEFAULT_COURSE_DATA, companyId });
  const [modules, setModules] = useState<ModuleTypes.IRenderProps[]>([]);
  const [mapCards, setMapCards] = useState<Map<string, ICard[]>>(new Map<string, ICard[]>());
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCourseUpdated, setCourseUpdated] = useState<boolean>(false);
  const [isCourseDataUpdated, setCourseDataUpdated] = useState<boolean>(false);
  const [deletedModuleIds, setDeletedModuleIds] = useState<number[]>([]);
  const [cardActionType, setCardActionType] = useState<CourseCreationTypes.ICardActionType>();
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState<boolean>(false);
  const notification = useNotification();
  const history = useHistory();
  const isSaveButtonDisabled = (!isCourseUpdated && !isCourseDataUpdated) ||
    courseData.status === Status.PUBLISHED || !courseData.name || courseData.name.length < 1;

  const value = {
    step, setStep, courseData, setCourseData,
    modules, setModules,
    mapCards, setMapCards,
    nameErrorMessage, setNameErrorMessage,
    isCourseUpdated, setCourseUpdated,
    isCourseDataUpdated, setCourseDataUpdated,
    deletedModuleIds, setDeletedModuleIds,
  };

  const getStep = (step: number) => {
    if (step === 0) return <GeneralInformation companyId={companyId} />;
    if (step === 1) return <Reward />;
    if (step === 2) {
      return (
        <Content
          companyId={companyId}
          handleCardCreateClick={handleCardCreateClick}
          handleCardEditClick={handleCardEditClick}
        />
      );
    }
    return (
      <CourseDetail
        {...courseData}
        tags={tagsByIds || []}
        modules={parseToCourseDetailModules()}
        variant="preview"
        className="microlearning-creation__preview"
      />
    );
  };

  const parseToCourseDetailModules = (): CourseDetailTypes.IModuleRender[] => {
    return modules.map(item => ({
      id: item.id,
      name: item.name,
      cards: parseToCourseDetailCards(item.id),
    }));
  };

  const parseToCourseDetailCards = (id: string): CourseDetailTypes.ICardRender[] =>
    mapCards.get(id)?.map(item => ({ id: item.id, name: item.name, status: ProgressStatus.NOT_STARTED })) || [];

  const handleCardCreateClick = (moduleId: string) => {
    setCardActionType({ moduleId, type: 'create' });
  };

  const handleCardEditClick = (id: number, cardIndex: number, moduleId: string) => {
    setCardActionType({ moduleId, cardIndex, cardId: id, type: 'edit' });
  };

  const onSaveClick = (callback?: any) => {
    if (type === 'create') {
      createNewCourse();
    } else {
      if (!courseId) return;
      updateExistCourse(courseId, callback);
    }
  };

  const updateExistCourse = (courseId: number, callback?: any) => {
    setLoading(true);
    updateCourse && updateCourse(courseId, courseData, {
      onSuccess: () => {
        if (!Array.isArray(modules) || modules.length < 1) {
          setLoading(false);
          getCourseModules();
          if (!callback) {
            notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
          } else {
            callback();
          }
          return;
        }

        const newCourseModules = modules.filter(item => item.status === ModuleStatus.NEW);
        const editedModules = modules.filter(item => item.status === ModuleStatus.EDITED);
        if (editedModules.length > 0) {
          updateCourseModules(editedModules, courseId, {
            onSuccess: () => {
              if (deletedModuleIds.length > 0) {
                deleteCourseModules(courseId, deletedModuleIds, {
                  onSuccess: () => {
                    if (newCourseModules.length > 0) {
                      createNewCourseModules(newCourseModules, courseId, {
                        onSuccess: () => {
                          setLoading(false);
                          if (!callback) {
                            notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
                          } else {
                            callback();
                          }
                          getCourseModules();
                          return;
                        },
                        onError: () => {
                          setLoading(false);
                        },
                      });
                    } else {
                      setLoading(false);
                      if (!callback) {
                        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
                      } else {
                        callback();
                      }
                      getCourseModules();
                      return;
                    }
                  },
                  onError: () => {
                    setLoading(false);
                  },
                });
              } else {
                if (newCourseModules.length > 0) {
                  createNewCourseModules(newCourseModules, courseId, {
                    onSuccess: () => {
                      setLoading(false);
                      if (!callback) {
                        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
                      } else {
                        callback();
                      }
                      getCourseModules();
                      return;
                    },
                    onError: () => {
                      setLoading(false);
                    },
                  });
                } else {
                  setLoading(false);
                  notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
                  getCourseModules();
                  return;
                }
              }
            },
            onError: () => {
              setLoading(false);
            },
          });
        } else {
          if (newCourseModules.length > 0) {
            createNewCourseModules(newCourseModules, courseId, {
              onSuccess: () => {
                setLoading(false);
                if (!callback) {
                  notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно изменен' });
                } else {
                  callback();
                }
                getCourseModules();
                return;
              },
              onError: () => {
                setLoading(false);
              },
            });
          } else {
            if (callback) {
              callback();
            } else setLoading(false);
          }
        }
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const onNewCardAddClick = (newCard: ICard, moduleId: string, type: 'create' | 'edit', index: number = -1) => {
    if (newCard.id > -1) {
      const newMapCards = new Map<string, ICard[]>(mapCards);
      const oldCards = newMapCards.get(moduleId) || [];
      const newCards = type === 'create' ?
        [...oldCards, newCard] :
      [...oldCards.slice(0, index), newCard, ...oldCards.slice(index + 1)];
      newMapCards.set(moduleId, newCards);
      updateModulesContext(moduleId, newCards);
      setMapCards(newMapCards);
    }
  };

  const updateModulesContext = (id: string, cards: ICard[]) => {
    const newModules = [...modules];
    const updatedModuleIndex = newModules.findIndex(item => item.id === id);
    if (updatedModuleIndex === -1) return;
    newModules[updatedModuleIndex].cardIds = cards.map(item => item.id);
    newModules[updatedModuleIndex].status = ModuleStatus.EDITED;
    setModules(newModules);
  };

  const getCourseById = (callbacks?: any) => {
    if (type === 'edit' && courseId && +courseId > -1) {
      getCourse && getCourse(+courseId, callbacks);
    }
  };

  const createNewCourseModules = (modules: ModuleTypes.IRenderProps[], courseId: number, callbacks?: any) => {
    createModules && createModules(courseId, modules, callbacks);
  };

  const updateCourseModules = (modules: ModuleTypes.IRenderProps[], courseId: number, callbacks?: any) => {
    updateModules && updateModules(courseId, modules, callbacks);
  };

  const deleteCourseModules = (courseId: number, moduleIds: number[], callbacks?: any) => {
    deleteModules && deleteModules(courseId, moduleIds, callbacks);
  };

  const createNewCourse = (toPublish?: boolean) => {
    setLoading(true);
    createCourse && createCourse(courseData, {
      onSuccess: (response: any) => {
        if (!response.id) {
          return;
        }
        if (Array.isArray(modules) && modules.length > 0) {
          createModules && createModules(response.id, modules, {
            onSuccess: () => {
              // created course and modules
              setLoading(false);
              if (toPublish) {
                publishNewCourse(response.id);
              }
              history.push(`/admin/${AdminRouterPaths.COURSE_EDITION}/${response.id}`, { isJustCreated: true });
            },
            onError: () => {
              history.push(`/admin/${AdminRouterPaths.COURSE_EDITION}/${response.id}`);
            },
          });
        } else {
          // created course
          setLoading(false);
          history.push(`/admin/${AdminRouterPaths.COURSE_EDITION}/${response.id}`, { isJustCreated: true });
        }
      },
      onError: (response: any) => {
        setLoading(false);
        if (response.data && response.data === 4) {
          notification.add(
            {
              ...DEFAULT_NOTIFICATION_DATA,
              type: NotificationType.Danger,
              description: 'Курс с таким названием уже существует',
            });
          setNameErrorMessage('Курс с таким названием уже существует');
        }
      },
    });
  };

  const onCourseToDraftClick = () => {
    if (courseData.status === Status.PUBLISHED && courseId) {
      setLoading(true);
      coursesToDraft && coursesToDraft([courseId], {
        onSuccess: () => {
          getCourseById(
            {
              onSuccess: () => {
                setLoading(false);
                notification.add(
                  {
                    ...DEFAULT_NOTIFICATION_DATA,
                    description: 'Курс в черновике',
                  });
              },
              onError: () => {
                setLoading(false);
              },
            });
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
  };

  const onCoursesToPublishClick = () => {
    setLoading(true);
    if (type === 'edit') publishExistedCourse();
    else createNewCourse(true);
  };

  const publishNewCourse = (courseId: number) => {
    coursesToPublish && coursesToPublish([courseId], {
      onSuccess: () => {
        history.push(`/admin/${AdminRouterPaths.COURSE_EDITION}/${courseId}`, { isJustCreated: true });
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const publishExistedCourse = () => {
    if (!courseId) return;
    onSaveClick(() => {
      coursesToPublish && coursesToPublish([courseId], {
        onSuccess: () => {
          getCourseById(
            {
              onSuccess: () => {
                notification.add(
                  {
                    ...DEFAULT_NOTIFICATION_DATA,
                    title: 'Курс опубликован!',
                    description: 'Пользователям доступен данный курс',
                  });
                setLoading(false);
              },
              onError: () => {
                setLoading(false);
              },
            });
        },
        onError: () => {
          setLoading(false);
        },
      });
    });
  };

  const handleCreationEditionFinished = (data: IRenderBody<CardTypes.IRenderProps>) => {
    setCardActionType(undefined);
    if (data.responseType === NotificationType.Success && data.data && cardActionType) {
      clearCardsState && clearCardsState();
      const card: ICard = {
        id: data.data.id,
        name: data.data.name,
        imageThumbnailUrl: data.data.imageUrlThumbnail,
      };
      notification.add(
        {
          ...DEFAULT_NOTIFICATION_DATA,
          description: cardActionType.type === 'create' ? 'Карточка успешно создана и добавлена' : 'Карточка успешно изменена',
        });
      onNewCardAddClick(card, cardActionType.moduleId, cardActionType.type, cardActionType.cardIndex);
    } else {
      notification.add(
        {
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Упс что то пошло не так, попробуйте создать еще раз',
          type: NotificationType.Danger,
        });
    }
    setCardActionType(undefined);
  };

  const isDataFull = () => {
    const coursesKeys = Object.keys(courseData);
    const optionals = ['imageUrl', 'imageThumbnailUrl', 'certificateImageUrl', 'certificateImageThumbnailUrl',
      'tagIds', 'uuid', 'tags', 'status', 'isActive', 'id', 'groupIds'];

    for (let index = 0; index < coursesKeys.length; index += 1) {
      if (optionals.includes(coursesKeys[index])) continue;
      if (courseData[coursesKeys[index]] !== 0 && !courseData[coursesKeys[index]]) return false;
    }
    return true;
  };

  const onDeleteCourseClick = () => {
    if (type === 'edit' && courseData.id) {
      setShowDeleteCourseModal(false);
      setLoading(true);
      deleteCourse && deleteCourse(courseData.id, {
        onSuccess: () => {
          history.push(`/admin/${AdminRouterPaths.CONTENT}?type=courses`, { isCourseDeleted: true });
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      });
    } else {
      history.push(`/admin/${AdminRouterPaths.CONTENT}?type=courses`, { isCourseDeleted: true });
    }
  };

  const getCourseModules = () => {
    if (typeof courseData.id !== 'number') return;
    getModules && getModules(courseData.id, companyId, {
      onSuccess: (response: any) => {
        setModulesCardsData(response);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  // getting course
  useEffect(
    () => {
      if (state && state.isJustCreated) {
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно создан' });
      }
      getCourseById(
        {
          onError: () => {
            history.push(`/admin/${AdminRouterPaths.CONTENT}?type=courses`);
          },
        });

      return () => {
        clearCourse && clearCourse();
      };
    },
    [],
  );

  useEffect(
    () => {
      if (!course) return;
      setCourseData({ ...course });
    },
    [course],
  );

  useEffect(
    () => {
      if (!isCourseDataUpdated) {
        setCourseUpdated(true);
      }
    },
    [courseData],
  );

  useEffect(
    () => {
      if (!courseData.id || courseData.id < 0) return;

      getCourseModules();

      if (!Array.isArray(courseData.tagIds) || courseData.tagIds.length < 1) return;
      getTagsByIds && getTagsByIds({ companyId, tagIds: courseData.tagIds });
    },
    [courseData.id],
  );

  useEffect(
    () => {
      if (type === 'create' || !Array.isArray(propsModules)) return;
      setModules(propsModules);
    },
    [propsModules],
  );

  useEffect(
    () => {
      if (type === 'create' || !tagsByIds) return;
      setCourseData(prevState => ({ ...prevState, tags: tagsByIds }));
    },
    [tagsByIds],
  );

  const setModulesCardsData = (response: any) => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (typeof token !== 'string') return;
    if (!Array.isArray(response.data.modules)) return;
    const newMapCards = new Map<string, ICard[]>(mapCards);
    response.data.modules.forEach((item: ModuleTypes.IResponseProps) => {
      if (item.card_ids.length > 0) {
        const moduleId = item.id;
        api.getCards({ companyId, cardIds: item.card_ids }, token).then(
          (response: any) => {
            response.text().then((value:any) => {
              const cards: CardTypes.IResponseProps[] = JSON.parse(value)?.data?.cards || [];
              const cardsWithCorrectOrder: CardTypes.IResponseProps[] = [];
              for (let index = 0; index < cards.length; index += 1) {
                const cardIndex = cards.findIndex(curCard => curCard.id === item.card_ids[index]);
                if (cardIndex >= 0) cardsWithCorrectOrder.push(cards[cardIndex]);
              }
              newMapCards.set(`${moduleId}`, parseToICards(cardsWithCorrectOrder));
              setMapCards(newMapCards);
            });
          },
        );
      }
    });
  };

  return (
    <CourseCreationContext.Provider value={value}>
      <div
        className={classNames(
          'course-creation-edition grid pt-32 pos_relative',
          { 'course-creation-edition--card-creation-edition': cardActionType },
        )}
      >
        <div className="course-creation-edition__header d-flex justify-content-between align-items-center">
          <Typography variant="headline">Создание курса</Typography>
          <div className="d-flex align-items-center">
            <Typography
              color={courseData.status === Status.DRAFT ? 'red' : 'green'}
              variant="tag"
              className={classNames('mr-32', `status-${courseData.status}`) }
            >
              <span className="status-circle mr-8" />
              {courseData.status === Status.DRAFT ? 'В черновике' : 'Опубликован'}</Typography>
            <Button
              disabled={courseData.status === Status.PUBLISHED}
              variant="textmed"
              type="black-icon"
              className="py-16 px-24 mr-16"
              onClick={() => setShowDeleteCourseModal(true)}
            >
              <Image
                alt="delete icon"
                className="mr-8"
                src={DeleteIcon}
              />
              Удалить
            </Button>
            <Button
              disabled={isSaveButtonDisabled}
              variant="textmed"
              type="black-icon"
              className="py-16 px-24 mr-16"
              onClick={() => onSaveClick()}
            >
              <Image alt="save icon" className="mr-8" src={SaveIcon}/>
              Сохранить
            </Button>
            {courseData.status === Status.PUBLISHED ? (
              <Button
                variant="textmed"
                className="py-16 px-24 d-flex align-items-center justify-content-center"
                onClick={onCourseToDraftClick}
              >
                <Image alt="check icon" className="mr-8" src={CheckIcon}/>
                В Черновик
              </Button>
            ) : (
              <Button
                disabled={!isDataFull() || modules.length < 1 || mapCards.size < 1}
                variant="textmed"
                className="py-16 px-24 d-flex align-items-center justify-content-center"
                onClick={onCoursesToPublishClick}
              >
                <Image alt="check icon" className="mr-8" src={CheckIcon}/>
                Опубликовать
              </Button>
            )}
          </div>
        </div>
        <div className="course-creation-edition__block mt-32 d-flex justify-content-between pos_relative">
          <div className="course-creation-edition__sidebar d-flex flex-column">
            <Stepper
              isStepsNumbered
              isStepsClickable
              steps={CREATION_STEPS}
              currentStep={step}
              onStepClick={setStep}
            />
            <Button
              type="outlined"
              to={`/admin/${AdminRouterPaths.CONTENT}?type=courses`}
              className="mt-32">
              Выйти
            </Button>
          </div>
          <div className={classNames(
            'course-creation-edition__content',
            { 'course-creation-edition__content--preview': step === 3 },
          )}
          >
            {getStep(step)}
          </div>
        </div>
      </div>
      {cardActionType && (
        <ModalCardCreationEdition
          handleCloseClick={() => setCardActionType(undefined)}
          handleCreationFinished={handleCreationEditionFinished}
          type={cardActionType.type}
          id={cardActionType.cardId}
        />
      )}
      {showDeleteCourseModal && (
        <Modal
          title="Удаление курса"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onDeleteClick={onDeleteCourseClick}
          onCloseClick={() => setShowDeleteCourseModal(false)}
        >
          <Typography variant="text" className="px-32">Вы действительно хотите удалить данный курс?</Typography>
        </Modal>
      )}
      {loading && (
        <ModalLoading />
      )}
    </CourseCreationContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  course: state.courseReducer.course.data,
  modules: state.moduleReducer.modules.data,
  cards: state.cardReducer.cards.data,
  tagsByIds: state.tagReducer.tagsByIds.data,
});

const mapDispatchToProps = {
  // getCards,
  // clearCardsState,
  // getModules,
  // createModules,
  // updateModules,
  // deleteModules,
  // getTagsByIds,
  // createCourse: courseActions.createCourse,
  // getCourse: courseActions.getCourse,
  // updateCourse: courseActions.updateCourse,
  // deleteCourse: courseActions.deleteCourse,
  // coursesToDraft: courseActions.coursesToDraft,
  // coursesToPublish: courseActions.coursesToPublish,
  // clearCourse: courseActions.clearCourse,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(CourseCreationEdition));
