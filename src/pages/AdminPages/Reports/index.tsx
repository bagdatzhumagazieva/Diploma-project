import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import statisticsActions from 'src/store/statistics/actions';

import Layout from 'src/components/organisms/Layout';
import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import LearningActivity from './LearningActivity';
import StatisticsCard from './StatisticsCard';
import ReportRedirectCard from 'src/pages/AdminPages/Reports/ReportRedirectCard';
import { ReactComponent as CertificateIcon } from 'src/assets/img/icons/certificate.svg';
import { ReactComponent as WarningIcon } from 'src/assets/img/icons/warning.svg';
import { ReactComponent as TrendingUpIcon } from 'src/assets/img/icons/trending-up.svg';
import { ReportsPageTypes, ReportColors } from './types';
import './index.scss';

function Reports(props: ReportsPageTypes.IProps) {
  const { getDataCount, dataCount, dataCountLoading } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  useEffect(
    () => {
      getDataCount(companyId);
    },
    [getDataCount, companyId],
  );

  return (
    <Layout isAdminRouting childrenClassName="py-48 color_grey__bg">
      <div className="grid mb-24">
        <Typography variant="headline">
          Отчеты и статистика
        </Typography>
      </div>

      {dataCountLoading
        ? <Loader className="my-48" size={40} />
        : dataCount && (
          <div className="statistics-card-group grid">
            <StatisticsCard
              name="Пользователи"
              total={dataCount.employees.total}
              reports={[
                { name: 'Активных', count: dataCount.employees.totalActive, color: ReportColors.GREEN },
                { name: 'Заблокировано', count: dataCount.employees.totalBlocked, color: ReportColors.RED },
              ]}
            />
            <StatisticsCard
              name="Группы"
              total={dataCount.groups.total}
              reports={
                dataCount.groups.groupsResults.length > 4 ?
                  [...dataCount.groups.groupsResults.slice(0, 3).map((n, i) => ({
                    name: n.name,
                    count: n.total,
                    color: Object.values(ReportColors)[i],
                  })), {
                    name: 'Другие',
                    count: dataCount.groups.groupsResults.slice(3).reduce((n, { total }) => n + total, 0),
                    color: ReportColors.BLUE,
                  }] : dataCount.groups.groupsResults.map((n, i) => ({
                    name: n.name,
                    count: n.total,
                    color: Object.values(ReportColors)[i],
                  }))
              }
            />
            <StatisticsCard
              name="Карточек"
              total={dataCount.cards.total}
              reports={[
                { name: 'База знаний', count: dataCount.cards.knowledgeCardsTotal, color: ReportColors.RED },
                { name: 'Игры', count: dataCount.cards.gamesTotal, color: ReportColors.YELLOW },
                { name: 'Лента', count: dataCount.cards.exercisesTotal, color: ReportColors.GREEN },
                { name: 'Курсы', count: dataCount.cards.coursesTotal, color: ReportColors.BLUE },
              ]}
            />
          </div>
      )}

      <LearningActivity/>

      <div className="grid report-redirect-card-group">
        <ReportRedirectCard
          name="Отчет по успеваемости в  играх и курсах"
          link="/admin/reports/performance"
          icon={<CertificateIcon />}
          background="#4D4CAC"
        />
        <ReportRedirectCard
          name="Отчет по усердию"
          link="/admin/reports/zeal"
          icon={<TrendingUpIcon />}
          background="#9698D6"
        />
        <ReportRedirectCard
          name="Отчет по частым ошибками"
          link="/admin/reports/error"
          icon={<WarningIcon />}
          background="#FF808B"
        />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  dataCount: state.statisticsReducer.dataCount.data,
  dataCountLoading: state.statisticsReducer.dataCount.loading,
});

const mapDispatchToProps = {
  getDataCount: statisticsActions.getDataCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
