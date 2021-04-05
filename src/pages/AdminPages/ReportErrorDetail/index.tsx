import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import statisticsActions from 'src/store/statistics/actions';

import Layout from 'src/components/organisms/Layout';
import { ReportErrorDetailTypes } from './types';
import { useParams } from 'react-router';
import TreeSelect from 'src/components/molecules/TreeSelect';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { BranchesTypes } from 'src/store/branch/types';
import { parseBranchesToTreeSelect } from 'src/utils/parse';
import branchActions from 'src/store/branch/actions';
import groupActions from 'src/store/group/actions';
import './index.scss';
import Typography from 'src/components/atoms/Typography';
import Select from 'src/components/molecules/Select';
import { IOption } from 'src/components/molecules/Select/types';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import ReportCard from 'src/components/atoms/ReportCard';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import Open from 'src/components/molecules/Questions/Open';
import Single from 'src/components/molecules/Questions/Single';
import RadioImage from 'src/components/molecules/Questions/RadioImage';
import Multiple from 'src/components/molecules/Questions/Multiple';
import Cloud from 'src/components/molecules/Questions/Cloud';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import Loader from 'src/components/atoms/Loader';
import { getColorForPercentage } from 'src/components/atoms/Cards/CardBranch';

function ReportErrorDetail(props: ReportErrorDetailTypes.IProps) {
  const { id, type } = useParams<{ id: string, type: string }>();

  const {
    getErrorDetail,
    errorDetail,
    errorDetailLoading,
    company,
    branches,
    groups,
    getBranches,
    getGroups,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [selectedBranch, setSelectedBranch] = useState<ITreeOption>();
  const [selectedGroup, setSelectedGroup] = useState<IOption>();

  useEffect(
    () => {
      const branchId = selectedBranch
        ? selectedBranch.value === 'main'
          ? undefined
          : +selectedBranch.value
        : undefined;
      const groupId = selectedGroup ? +selectedGroup.value : undefined;
      if (type === 'COURSE' || type === 'GAME' || type === null && id) {
        getErrorDetail({ companyId, type, branchId, groupId, entityId: +id });
      }
    },
    [getErrorDetail, companyId, selectedBranch, selectedGroup, type, id],
  );

  const branchesTreeSelect: ITreeOption[] = [
    {
      name: company?.name || '',
      value: company?.id ? 'main' : '0',
      children: branches
          ? branches.map((n: BranchesTypes.IRenderProps) => parseBranchesToTreeSelect(n))
          : undefined,
    },
  ];

  const groupOptions: IOption[] = groups ? groups.map(n => ({ name: n.name || '', value: `${n.id}` })) : [];

  useEffect(
    () => {
      const groupParams  = { companyId };
      getBranches && getBranches(companyId);
      getGroups && getGroups(groupParams);
    },
    [companyId, getBranches, getGroups],
  );

  return (
    <Layout isAdminRouting childrenClassName="py-48 color_grey__bg">
      <div className="grid">
        <Breadcrumb
          items={[
            { label: 'Отчеты и статистика', link: '/admin/reports' },
            { label: 'Отчет по ошибкам', link: '/admin/reports/error' },
            { label: errorDetail?.entity?.name || '' },
          ]}
          itemsLoading={errorDetailLoading}
          className="mb-32"
        />
        <div className="d-flex">
          <div>
            <Typography
              variant="subtext"
              className="mb-4 d-block"
            >
              Филиал
            </Typography>
            <TreeSelect
              staticWidth
              isPositionFixed
              placeholder="Выберите филиал"
              treeOptions={branchesTreeSelect}
              selectedTreeOption={selectedBranch}
              setSelectedOption={setSelectedBranch}
              className="report-error__branch"
            />
            <Typography
              variant="subtext"
              className="mb-4 mt-auto d-block"
            >
              Группа
            </Typography>
            <Select
              staticWidth
              options={groupOptions}
              setSelectedOption={setSelectedGroup}
              selectedOption={selectedGroup}
              placeholder="Выбор группы"
              className="report-error__groups"
            />
          </div>
          {errorDetailLoading ?
            <Loader size={40} className="my-48 fill_w"/> :
            <div className="d-flex flex-column fill_w">
              {errorDetail && (
                <>
                  {errorDetail.entity && (
                    <ReportCard
                      reportType="error"
                      appearance="wide"
                      id={errorDetail.entity.entityId}
                      createdAt={errorDetail.entity.createdAt}
                      type={errorDetail.entity.entityType}
                      imageThumbnail={errorDetail.entity.imageThumbnail}
                      minutesToFinish={errorDetail.entity.minutesToFinish}
                      name={errorDetail.entity.name}
                      numberOfViews={errorDetail.entity.numberOfViews}
                      percentAvg={errorDetail.entity.percentAvg}
                    />
                  )}
                  <div className="mt-32">
                    {errorDetail.result && errorDetail.result.map(n => (
                      <div key={n.entityId} className="report-error-card">
                        <Breadcrumb
                          items={[
                            { label: n.categoryName },
                            { label: n.name },
                          ]}
                        />
                        <div className="m-24 d-flex align-items-start">
                          <div className="fill_w">
                            {n.question.questionType === VerificationQuestions.OpenQuestion
                              ? <Open
                                title={n.question.questionText}
                                instruction={n.question.description}
                                appendix={n.question.appendix || ''}
                              />
                              : n.question.questionType === VerificationQuestions.OneOfList ?
                                <Single
                                  title={n.question.questionText}
                                  instruction={n.question.description}
                                  appendix={n.question.content}
                                  options={n.question.answerOptions?.map(n => ({
                                    id: n.entityId,
                                    text: n.text || '',
                                  })) || []}
                                />
                                : n.question.questionType === VerificationQuestions.ImageFromList ?
                                  <RadioImage
                                    title={n.question.questionText}
                                    instruction={n.question.description}
                                    appendix={n.question.appendix || ''}
                                    selectedImage={0}
                                    images={n.question.answerOptions?.map(n =>
                                      ({ id: n.entityId, src: n.imageThumbnailUrl, text: n.text })) || []}
                                  />
                                  : n.question.questionType === VerificationQuestions.FewFromList ?
                                    <Multiple
                                      instruction={n.question.description}
                                      appendix={n.question.content}
                                      title={n.question.questionText}
                                      options={n.question.answerOptions?.map(n =>
                                        ({ id: n.entityId, text: n.text })) || []}
                                    />
                                    : n.question.questionType === VerificationQuestions.SequenceFromList ?
                                      <Cloud
                                        title={n.question.questionText}
                                        instruction={n.question.description}
                                        appendix={n.question.content}
                                        options={n.question.answerOptions?.map(n =>
                                          ({ id: n.entityId, text: n.text })) || []}
                                      /> : n.question.questionType === VerificationQuestions.QuestionPhotoTag ?
                                        <PhotoMark
                                          title={n.question.questionText}
                                          instruction={n.question.description}
                                          appendix={n.question.content}
                                          image={{
                                            id: n.question.answerOptions ? n.question.answerOptions[0].entityId : '',
                                            imageUrl: n.question.answerOptions ?
                                              n.question.answerOptions[0]?.imageUrl || '' : '',
                                          }}
                                          marksCount={n.question.markPointsNumber || 0}
                                        /> : <></>
                            }
                          </div>
                          <Typography
                            variant="h1"
                            className="report-error-card__percent"
                            style={{
                              background: getColorForPercentage(n.errorPercentage),
                            }}
                          >
                            {n.errorPercentage}%
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  errorDetail: state.statisticsReducer.errorDetail.data,
  errorDetailLoading: state.statisticsReducer.errorDetail.loading,
  company: state.companyReducer.company.data,
  groups: state.groupReducer.groups.data,
  branches: state.branchReducer.branches.data,
});

const mapDispatchToProps = {
  getErrorDetail: statisticsActions.getErrorDetail,
  getBranches: branchActions.getBranches,
  getGroups: groupActions.getGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportErrorDetail);
