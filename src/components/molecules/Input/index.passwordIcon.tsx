import * as React from 'react';

export interface IProps {
  show?: boolean;
  onClick?(): void;
  className?: string;
}
function ShowPasswordIcon(props: IProps) {
  return (
    <div className={props.className} onClick={props.onClick}>
      {props.show ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.9273 13.9276C13.6776 14.1955 13.3765 14.4104 13.042 14.5595C12.7074 14.7086 12.3463 14.7887 11.9801 14.7952C11.6139 14.8016 11.2501 14.7343 10.9106 14.5971C10.571 14.4599 10.2625 14.2558 10.0035 13.9968C9.74452 13.7378 9.54036 13.4293 9.40319 13.0897C9.26602 12.7501 9.19866 12.3864 9.20512 12.0202C9.21158 11.654 9.29174 11.2929 9.4408 10.9583C9.58986 10.6238 9.80478 10.3227 10.0727 10.073M17.4 17.4003C15.846 18.5848 13.9537 19.2411 12 19.273C5.63636 19.273 2 12.0003 2 12.0003C3.13081 9.89292 4.69921 8.05175 6.6 6.60029L17.4 17.4003ZM10.0909 4.94574C10.7167 4.79927 11.3573 4.72605 12 4.72756C18.3636 4.72756 22 12.0003 22 12.0003C21.4482 13.0327 20.7901 14.0046 20.0364 14.9003L10.0909 4.94574Z" stroke="#B0BAC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 2L22 22" stroke="#B0BAC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 12 5.63636 4.72727 12 4.72727C18.3636 4.72727 22 12 22 12C22 12 18.3636 19.2727 12 19.2727C5.63636 19.2727 2 12 2 12Z" stroke="#B0BAC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.0002 14.7273C13.5065 14.7273 14.7275 13.5062 14.7275 12C14.7275 10.4938 13.5065 9.27273 12.0002 9.27273C10.494 9.27273 9.27295 10.4938 9.27295 12C9.27295 13.5062 10.494 14.7273 12.0002 14.7273Z" stroke="#B0BAC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

export default ShowPasswordIcon;
