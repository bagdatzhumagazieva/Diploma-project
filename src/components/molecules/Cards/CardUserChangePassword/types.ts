export namespace CardUserChangePasswordTypes {
  export interface IProps {
    onClickChangePassword?(data: any, callback?: any): void;
    errorMessage?: string;
    successPassword?: any;
    loadingPassword?: boolean;
    className?: string;
  }
}

export interface IUserChangePassword {
  current: string;
  new: string;
  duplicate: string;
}
