import React from "react";

export const Download = (props) => {
  return (
    <svg fill="white"  id="Download" preserveAspectRatio="false" width="auto"  height="auto"  viewBox="0 0 32 32" version="1.1" >
      <title>Download</title>
      <path d="M16 18l8-8h-6kv-8h-4v8h-6zM23.273 14.727l-2.242 2.242 8.128 3.031-13.158 4.907-13.158-4.907 8.127-3.031-2.242-2.242-8.727 3.273v8l16 6 16-6v-8z" />
    </svg>
  );
};

export const DownloadActive = (props) => {
  return (
    <svg fill="white" stroke="black" id="DownloadActive" width="100%" viewBox="0 0 24 24" version="1.1">
      <title>Download Active</title>
      <path d="M28 16h-5l-7 7-7-7h-5l-4 8v2h32v-2l-4-8zM0 28h32v2h-32v-2zM18 10v-8h-4v8h-7l9 9 9-9h-7z" />
    </svg>
  );
};
