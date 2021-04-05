import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import statisticsActions from 'src/store/statistics/actions';
import useDebounce from 'src/hooks/useDebounce';

import Layout from 'src/components/organisms/Layout';
import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import { ReportPerformancePageTypes } from './types';
import { ReactComponent as SearchIcon } from 'src/assets/img/icons/search.svg';
import ReportCard from 'src/components/atoms/ReportCard';
import './index.scss';
import Breadcrumb from 'src/components/atoms/BreadCrumb';

function ReportPerformance(props: ReportPerformancePageTypes.IProps) {
  const { getPerformance, performance, performanceLoading } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');

  const [type, setType] = useState<null | 'GAME' | 'COURSE'>(null);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(
    () => {
      getPerformance({ companyId, type, keyword: debouncedKeyword });
    },
    [getPerformance, companyId, type, debouncedKeyword],
  );

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <Layout isAdminRouting childrenClassName="py-48 color_grey__bg">
      <div className="grid mb-24">
        <Breadcrumb
          items={[
            { label: 'Отчеты и статистика', link: '/admin/reports' },
            { label: 'Отчет по успеваемости' },
          ]}
        />
        <Typography variant="headline" className="mt-32">
          Отчет по успеваемости
        </Typography>
      </div>

      <div className="grid mb-36 d-flex align-items-center">
        <Button
          variant="text"
          type="plain"
          classNames={['performance-type mr-16', { 'performance-type--active': type === null }]}
          onClick={() => setType(null)}
        >
          Все
        </Button>
        <Button
          variant="text"
          type="plain"
          classNames={['performance-type mr-16', { 'performance-type--active': type === 'GAME' }]}
          onClick={() => setType('GAME')}
        >
          Игры
        </Button>
        <Button
          variant="text"
          type="plain"
          classNames={['performance-type', { 'performance-type--active': type === 'COURSE' }]}
          onClick={() => setType('COURSE')}
        >
          Курсы
        </Button>
        <Input
          name="performanceKeyword"
          type="text"
          placeholder="Название"
          classNames="ml-auto performance-keyword"
          value={keyword}
          onChange={onInputChange}
          icon={<SearchIcon className="ml-16" width={20} height={20} style={{ minWidth: '20px' }}/>}
        />
      </div>

      {performanceLoading
        ? <Loader className="my-48" size={40} />
        : performance && (
          <div className="report-card-group grid">
            {performance.entities.map(n => (
              <ReportCard
                reportType="performance"
                key={n.id + n.type}
                id={n.id}
                createdAt={n.createdAt}
                type={n.type}
                imageThumbnail={n.imageThumbnail}
                minutesToFinish={n.minutesToFinish}
                name={n.name}
                numberOfViews={n.numberOfViews}
                percentAvg={n.percentAvg}
              />
            ))}
          </div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  performance: state.statisticsReducer.performance.data,
  performanceLoading: state.statisticsReducer.performance.loading,
});

const mapDispatchToProps = {
  getPerformance: statisticsActions.getPerformance,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportPerformance);
