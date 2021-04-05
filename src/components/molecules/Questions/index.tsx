import React from 'react';
import Single from 'src/components/molecules/Questions/Single';
import Multiple from 'src/components/molecules/Questions/Multiple';
import { QuestionsTypes } from 'src/components/molecules/Questions/types';

class Questions extends React.Component<QuestionsTypes.IProps> {
  public static Single = Single;
  public static Multiple = Multiple;
}

export default Questions;
