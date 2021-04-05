import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import achievementActions from 'src/store/achievement/actions';

import Loader from 'src/components/atoms/Loader';
import CardUserAchievement from 'src/components/atoms/Cards/CardUserAchievement';
import CardUserStatistics from 'src/components/atoms/Cards/CardUserStatistics';
import Typography from 'src/components/atoms/Typography';

import { TabAchievementTypes } from 'src/pages/GamePages/Profile/types';
import { AchievementTypes } from 'src/store/achievement/types';
import Icon1 from 'src/assets/img/icons/diploma.svg';
import Icon2 from 'src/assets/img/icons/clock.svg';
import Icon3 from 'src/assets/img/icons/hat.svg';

function TabAchievement(props: TabAchievementTypes.IProps) {
  const {
    companyId, achievements: propsAchievements,
    getAchievements, loading, achievementsCount, getAchievementsCount,
  } = props;
  const [achievements, setAchievements] = useState<AchievementTypes.IRenderProps[]>([]);
  const defaultParams: AchievementTypes.IQueryProps = {
    page: 1,
    pageSize: 60,
  };

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getAchievementsCount && getAchievementsCount();
      getAchievements && getAchievements(defaultParams);
    },
    [companyId],
  );

  useEffect(
    () => {
      if (!propsAchievements) return;
      setAchievements([...propsAchievements]);
    },
    [propsAchievements],
  );

  return (
    <>
      <Typography variant="h1" classNames="mb-16">Мои достижения</Typography>
      <div className="d-flex">
        <div
          className={classNames(
            'profile__card-user-achievements',
            { 'd-flex justify-content-center align-items-center': loading && achievements.length < 1 },
          )}
        >
          <div className="d-flex justify-content-between flex-wrap">
            {achievements && achievements.map((item, index) => (
              <CardUserAchievement
                key={item.id + index}
                classNames="card-user-achievements__item mb-40"
                icon={item.imageThumbnail}
                title={item.name}
                subtitle={item.description}
                coins={item.rewardAmount}
              />
            ))}
          </div>
          {loading && <Loader label="Загрузка" />}
        </div>
        <div className="profile__card-user-statistics d-flex flex-column">
          <CardUserStatistics
            classNames="mb-32"
            title="Сертфикатов получено"
            icon={Icon1}
            value={achievementsCount?.certificatesCount || 0}
          />
          <CardUserStatistics
            classNames="mb-32"
            title="Часов обучения"
            icon={Icon2}
            value={achievementsCount?.spentTime || 0}
          />
          <CardUserStatistics
            classNames="mb-32"
            title="Курсов пройдено"
            icon={Icon3}
            value={achievementsCount?.coursesCount || 0}
          />
        </div>
      </div>
    </>
  );
}

export const mapStateToProps = (state: any) => ({
  achievements: state.achievementReducer.achievements.data,
  achievementsCount: state.achievementReducer.achievementsCount.data,
  loading: state.achievementReducer.achievements.loading,
  nextPage: state.achievementReducer.achievements.nextPage,
});

export const mapDispatchToProps = {
  getAchievements: achievementActions.getAchievements,
  getAchievementsCount: achievementActions.getAchievementsCount,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TabAchievement);
