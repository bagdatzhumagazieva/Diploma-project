import React from 'react';

function Company() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#B0BAC9"
        strokeWidth="1.5"
        d="M6 3.5a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v17a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-17z"
      />
      <rect
        width="4"
        height="6"
        x="9.999"
        y="15"
        stroke="#B0BAC9"
        strokeWidth="1.5"
        rx="0.5"
      />
      <mask id="path-4-inside-1" fill="#fff">
        <rect width="2" height="2" x="9" y="6" rx="0.3" />
      </mask>
      <rect
        width="2"
        height="2"
        x="9"
        y="6"
        stroke="#B0BAC9"
        strokeWidth="2"
        mask="url(#path-4-inside-1)"
        rx="0.3"
      />
      <mask id="path-5-inside-2" fill="#fff">
        <rect width="2" height="2" x="13" y="6" rx="0.3" />
      </mask>
      <rect
        width="2"
        height="2"
        x="13"
        y="6"
        stroke="#B0BAC9"
        strokeWidth="2"
        mask="url(#path-5-inside-2)"
        rx="0.3"
      />
      <mask id="path-6-inside-3" fill="#fff">
        <rect width="2" height="2" x="9" y="11" rx="0.3" />
      </mask>
      <rect
        width="2"
        height="2"
        x="9"
        y="11"
        stroke="#B0BAC9"
        strokeWidth="2"
        mask="url(#path-6-inside-3)"
        rx="0.3"
      />
      <mask id="path-7-inside-4" fill="#fff">
        <rect width="2" height="2" x="13" y="11" rx="0.3" />
      </mask>
      <rect
        width="2"
        height="2"
        x="13"
        y="11"
        stroke="#B0BAC9"
        strokeWidth="2"
        mask="url(#path-7-inside-4)"
        rx="0.3"
      />
    </svg>
  );
}

export default Company;
