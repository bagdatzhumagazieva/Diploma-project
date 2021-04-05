import React from 'react';

function Notification() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#B0BAC9"
        fillRule="evenodd"
        d="M3.524 18.527V6.132l8.48 6.845 8.472-6.845v12.395H3.524zM19.143 5.49l-7.095 5.587-7.19-5.587h14.285zM20.182 4H3.818C2.815 4 2 4.797 2 5.778v12.444C2 19.202 2.815 20 3.818 20h16.364C21.185 20 22 19.203 22 18.222V5.778C22 4.798 21.184 4 20.182 4z"
        clipRule="evenodd"
      />
      <mask width="20" height="16" x="2" y="4" maskUnits="userSpaceOnUse">
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M3.524 18.527V6.132l8.48 6.845 8.472-6.845v12.395H3.524zM19.143 5.49l-7.095 5.587-7.19-5.587h14.285zM20.182 4H3.818C2.815 4 2 4.797 2 5.778v12.444C2 19.202 2.815 20 3.818 20h16.364C21.185 20 22 19.203 22 18.222V5.778C22 4.798 21.184 4 20.182 4z"
          clipRule="evenodd"
        />
      </mask>
    </svg>
  );
}

export default Notification;
