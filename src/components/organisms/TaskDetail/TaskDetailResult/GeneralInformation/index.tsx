import React from 'react';
import { connect } from 'react-redux';

import Image from 'src/components/atoms/Image';
import ChartProgress from 'src/components/atoms/ChartProgress';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import Button from 'src/components/atoms/Button';
import StaticGraph from 'src/components/molecules/StaticGraph';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import useNotification from 'src/components/molecules/Notification/useNotification';
import RadioImageStatistics from 'src/components/molecules/RadioImageStatistic';

import taskActions from 'src/store/task/actions';

import { COLORS } from 'src/core/store/values';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { IOption } from 'src/components/molecules/Select/types';
import { TaskDetailResultTypes } from 'src/components/organisms/TaskDetail/TaskDetailResult/types';
import { CourseStatisticsTypes } from 'src/components/organisms/CourseDetailStatistics/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { TaskAggregatorAdminTypes } from 'src/store/task/types';
import IconExcel from 'src/assets/img/icons/excel.png';
import 'src/components/organisms/TaskDetail/TaskDetailResult/GeneralInformation/index.scss';

function TaskResultGenInfo(props: TaskDetailResultTypes.GenInfoProps) {

  const { selectedGroups, setSelectedGroups, taskStatistics,
    onGetGroupExcelResult, companyId, taskId } = props;
  const notification = useNotification();

  const statisticOptions = (answers: {
    [id: number]: {percent: number, amount: number};
  }[],                      answerOptions: TaskAggregatorAdminTypes.IAnswerOptionsRender[], isMultiple?: boolean):
    CourseStatisticsTypes.IOptions[] => {
    return (
      answerOptions.map((item, i) => {
        const key = answers.map(e => Object.keys(e));
        const index = key.findIndex(e => +e[0] === item.id);
        return ({
          title: (isMultiple && index >= 0) ? `${item.text} ${answers[index][key[index][0]]?.percent.toFixed(1)}%` :
            item.text || '',
          value: index >= 0 ? answers[index][key[index][0]]?.amount : 0,
          color: COLORS[i],
          label: item.text || '',
        });
      })
    );
  };

  const handleGetExcelFile = () => {
    selectedGroups.filter(e => e.checkboxChecked).length === 0 ?
    notification.add(
      {
        type: NotificationType.Danger,
        duration: 5000,
        description: 'Выберите группу для скачивания отчета.',
        width: '600px',
        size: 'small',
      }) :
    onGetGroupExcelResult && onGetGroupExcelResult(
      taskId,
      companyId,
      selectedGroups.filter(e => e.checkboxChecked).map(n => +n.value),
    );
  };

  return (
    <div className="mt-32 task-general-info">
      <Typography
        variant="subtext"
        className="mb-4"
      >
        Группы
      </Typography>
      <div className="d-flex align-items-center">
          <Select
            staticWidth
            withCheckbox
            className="task-general-info__groups"
            options={selectedGroups}
            selectedOption={{} as IOption}
            customTitle="Выберите группы"
            onCheckboxChanges={setSelectedGroups}
          />
        <Button className="button--type-additional excel-icon-wrap ml-32" onClick={handleGetExcelFile}>
          <Image
            src={IconExcel}
            alt="excel icon"
            className="excel-icon"
          />
        </Button>
      </div>
      <Typography variant="subtext" className="mt-32 mb-16">Участники</Typography>

      <div className="task-general-info__employee-list">
        {taskStatistics?.users?.map((e, i: number) => (
          <div key={i} className="d-flex py-16 px-24 task-general-info__employee-list__item">
            <Image
              alt={`${e.firstName || ''} ${e.lastName || ''}`}
              src={e.avatarThumbnail || ''}
              className="task-general-info__employee-list__img"
            />
            <Typography variant="text" className="ml-8 pt-8">{`${e.firstName || ''} ${e.lastName || ''}`}</Typography>
          </div>
        ))}
      </div>

      {taskStatistics?.statistics?.map((e, i: number) => {
        const sequenceWord = (id: number) => e.card?.question.answerOptions.find(n => n.id === id)?.text || '';
        return (
        <div key={i} className="mt-32 d-flex flex-column">
          <Typography variant="subtextmed">{`${i + 1}. ${e.card?.question.questionText || '-'}`}</Typography>
          <Typography variant="xsmall" className="mt-16 mb-16">{taskStatistics?.users?.length || 0} answers</Typography>
          {e.card?.question?.questionType === VerificationQuestions.OpenQuestion ?
            <div className="d-flex flex-column task-general-info__employee-list">
              {e.answerTexts?.map((item, ind) => (
                <Typography
                  key={ind}
                  variant="text"
                  className="ml-8 p-16 task-general-info__employee-list__item"
                >
                  {item}
                </Typography>
              ))}
            </div> :
            e.card?.question?.questionType === VerificationQuestions.FewFromList ?
              <div className="task-general-info__static-graph p-64">
                <StaticGraph
                  options={statisticOptions(e.answerIds, e.card?.question.answerOptions || [], true)}
                />
              </div> :
              e.card?.question.questionType === VerificationQuestions.QuestionPhotoTag ?
                <div className="task-general-info__photo-mark">
                  <PhotoMark
                    isStatistic
                    title=""
                    className="px-24"
                    initValues={e.markPoints || []}
                    image={{
                      id: '',
                      imageUrl: e.card?.question.answerOptions ?
                        (e.card?.question.answerOptions as TaskAggregatorAdminTypes.IAnswerOptionsRender[])
                          [0]?.imageUrl ||
                          '' : '',
                    }}
                    marksCount={0}
                  />
                </div> :
                e.card?.question.questionType === VerificationQuestions.ImageFromList ?
                  <div className="task-general-info__radio-image p-16">
                    {e.card?.question.answerOptions?.map((answer, i) => {
                      const answers = e.answerIds.find(n => +Object.keys(n)[0] === answer.id);
                      return (
                        <RadioImageStatistics
                          key={i}
                          image={answer.imageThumbnailUrl || ''}
                          percent={answers ? answers[answer.id].percent : 0}
                          answerAmount={answers ? answers[answer.id].amount : 0}
                          className="p-8"
                        />);
                    })}
                  </div> :
                  e.card?.question.questionType === VerificationQuestions.SequenceFromList ?
                    <div className="d-flex flex-column task-general-info__employee-list">
                      {e.answerOrderIds?.map((item, ind) => (
                        <Typography
                          key={ind}
                          variant="text"
                          className="ml-8 p-16 task-general-info__employee-list__item"
                        >
                          {item.map(n => `${sequenceWord(n)} `)}
                        </Typography>
                      ))}
                    </div> :
                    <div className="task-general-info__statistic py-24 px-64">
                    {e.answerIds.length && <ChartProgress
                        options={statisticOptions(e.answerIds, e.card?.question?.answerOptions || [])}
                    />}
                </div>
          }
        </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  taskStatistics: state.taskReducer.taskStatistics.data,
});

const mapDispatchToProps = {
  onGetGroupExcelResult: taskActions.getGroupExcelResult,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskResultGenInfo);
