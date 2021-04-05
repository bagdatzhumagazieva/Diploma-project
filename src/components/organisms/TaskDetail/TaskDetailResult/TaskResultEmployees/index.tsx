import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';
import TreeSelect from 'src/components/molecules/TreeSelect';
import Open from 'src/components/molecules/Questions/Open';
import Single from 'src/components/molecules/Questions/Single';
import RadioImage from 'src/components/molecules/Questions/RadioImage';
import Multiple from 'src/components/molecules/Questions/Multiple';
import Cloud from 'src/components/molecules/Questions/Cloud';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import taskActions from 'src/store/task/actions';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { TaskDetailResultTypes } from 'src/components/organisms/TaskDetail/TaskDetailResult/types';
import 'src/components/organisms/TaskDetail/TaskDetailResult/TaskResultEmployees/index.scss';

function TaskResultEmployees(props: TaskDetailResultTypes.EmployeeInfoProps) {

  const { usersData, onGetUserResult, companyId, taskId, taskStatistics, userResult } = props;

  const employeeInfo: ITreeOption[] = usersData?.map((item, i) => ({
    id: `${item.userId}`,
    name: `${item.firstName || ''} ${item.lastName || ''}`,
    value: `${i}`,
    icon:
      <Image
        alt={`${item.firstName} ${item.lastName}`}
        src={item.avatarThumbnail || ''}
        className="task-result-employee__avatar"
      />,
  })) || [];
  const [curEmployee, setCurEmployee] = useState<number>(-1);
  const [selectedEmployee, setSelectedEmployee] = useState<ITreeOption>();

  useEffect(() => {
    userResult?.userID && setSelectedEmployee(employeeInfo.find(n => n.id && +n.id === userResult.userID));
  },        []);

  useEffect(() => {
    usersData && usersData.length && setSelectedEmployee(employeeInfo[0]);
  },        [usersData]);

  useEffect(() => {
    selectedEmployee && setCurEmployee(+selectedEmployee.value);
  },        [selectedEmployee]);

  useEffect(() => {
    if (selectedEmployee?.id) {
      onGetUserResult && onGetUserResult({
        companyId,
        taskId,
        userId: +selectedEmployee.id || 0,
      });
    }
  },        [selectedEmployee]);

  const handleChangeEmployee = (direction: string) => {
    if (direction === 'left' && curEmployee && curEmployee > -1) {
      setCurEmployee(curEmployee - 1);
      setSelectedEmployee(employeeInfo[curEmployee - 1]);
    } else if (direction === 'right' && curEmployee + 1 !== employeeInfo.length && curEmployee > -1) {
      setCurEmployee(curEmployee + 1);
      setSelectedEmployee(employeeInfo[curEmployee + 1]);
    }
  };

  return (
    <div className="task-result-employee">
      <Typography variant="subtext">Пользователь</Typography>
      <div className="d-flex align-items-center">
        <TreeSelect
          staticWidth
          placeholder="Выберите пользователя"
          classNames="task-result-employee__list mt-8"
          setSelectedOption={setSelectedEmployee}
          selectedTreeOption={selectedEmployee}
          treeOptions={employeeInfo || []}
        />
        <span
          className="task-result-employee__arrow cursor-pointer ml-16"
          onClick={() => handleChangeEmployee('left')}
        >
          <Arrow
            direction="left"
            color={!curEmployee ? '#E0E0E6' :''}
          />
        </span>
        <span
          className="task-result-employee__arrow cursor-pointer ml-8"
          onClick={() => handleChangeEmployee('right')}
        >
          <Arrow
            direction="right"
            color={curEmployee + 1 === employeeInfo.length ? '#E0E0E6' :''}
          />
        </span>
      </div>

      <div className="task-result-employee__cards p-24 my-32">
        {taskStatistics?.statistics?.map((n, i) => {
          const curUserResult = userResult?.completeAttempt.find(e => e.cardId === n.card?.id);
          return (
          <div className="mb-48" key={i}>
            {n.card?.question.questionType === VerificationQuestions.OpenQuestion ? (
                <Open
                  initialValue={curUserResult?.answerText || ''}
                  title={`${i + 1}. ${n.card?.question.questionText}`}
                  instruction={n.card?.question.description || ''}
                  appendix={n.card?.question.content || ''}
                />
              ) :
              n.card?.question.questionType === VerificationQuestions.OneOfList ? (
                  <Single
                    selectedVal={curUserResult?.answerIds ? curUserResult?.answerIds[0] : 0}
                    title={`${i + 1}. ${n.card?.question.questionText}`}
                    instruction={n.card?.question.description || ''}
                    appendix={n.card?.question.content || ''}
                    options={n.card?.question.answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                  />
                ) :
                n.card?.question.questionType === VerificationQuestions.ImageFromList ? (
                    <RadioImage
                      title={`${i + 1}. ${n.card?.question.questionText}`}
                      instruction={n.card?.question.description || ''}
                      appendix={n.card?.question.content || ''}
                      selectedImage={curUserResult?.answerIds ? curUserResult?.answerIds[0] : 0}
                      images={n.card?.question.answerOptions?.map(n =>
                        ({ id: n.id, src: n.imageUrl || '', text: n.text || '' })) || []}
                    />
                  ) :
                  n.card?.question.questionType === VerificationQuestions.FewFromList ? (
                      <Multiple
                        initValues={curUserResult?.answerIds || []}
                        instruction={n.card?.question.description || ''}
                        appendix={n.card?.question.content || ''}
                        title={`${i + 1}. ${n.card?.question.questionText}`}
                        options={n.card?.question.answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                      />
                    ) :
                    n.card?.question.questionType === VerificationQuestions.SequenceFromList ? (
                        <Cloud
                          initValues={curUserResult?.answerIds || []}
                          title={`${i + 1}. ${n.card?.question.questionText}`}
                          instruction={n.card?.question.description || ''}
                          appendix={n.card?.question.content || ''}
                          options={n.card?.question.answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                        />
                      ) :
                      n.card?.question.questionType === VerificationQuestions.QuestionPhotoTag && (
                        <PhotoMark
                          title={`${i + 1}. ${n.card?.question.questionText}`}
                          instruction={n.card?.question.description || ''}
                          appendix={n.card?.question.content || ''}
                          initValues={curUserResult?.markPoints || []}
                          image={{
                            id: n.card?.question.answerOptions ? n.card?.question.answerOptions[0].uuid : '',
                            imageUrl: n.card?.question.answerOptions ?
                              n.card?.question.answerOptions[0]?.imageUrl || '' : '',
                          }}
                          marksCount={n.card?.question.markPointsNumber || 0}
                        />
                      )}
          </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  userResult: state.taskReducer.userResult.data,
  taskStatistics: state.taskReducer.taskStatistics.data,
});

const mapDispatchToProps = {
  onGetUserResult: taskActions.getUserResult,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskResultEmployees);
