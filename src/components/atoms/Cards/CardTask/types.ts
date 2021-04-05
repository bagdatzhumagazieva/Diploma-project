import { IBaseProps } from 'src/core/components/types';

export namespace CardTaskTypes {
  export interface IProps extends IBaseProps, IUserTask {
  }
}

export namespace CardTaskGroupTypes {
  export interface IProps {
    /**
     * Will show all lists of tasks
     */
    isShowAll?: boolean;
    tasks: IUserTask[];
  }
}

export interface IUserTask {
  /**
   * Status of the task. Currently we have three statuses:
   * Awaiting, Current, Completed
   * You can change name of statuses for identity with backend
   */
  status: string;
  /**
   * Specific type of the task
   * example: 'video', 'games' and etc
   */
  type: string;
  /**
   * Image source of this task
   */
  imgSrc: string;
  /**
   * The name of this task
   */
  title: string;
  /**
   * Additional information about your progress in this task
   */
  info: string;
  /**
   * The progress out of 100% in this task
   */
  progress: number;
  /**
   * The date of the last activity in this task
   */
  lastActivity: string;
  /**
   * Link to the page of the task
   */
  link: string;
}

export interface IUserTaskType {
  type: string;
  title: string;
}
