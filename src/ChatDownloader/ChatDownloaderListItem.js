import React from 'react';
import { ChatDownloaderButton } from "./ChatDownloaderButton";
import { css } from "emotion";

export const ChatDownloaderListItem = ({label, sid, type, date, manager}) => {
  console.log('testing', label, sid, type, date);
  const listItemJSX = <li className={css`
    background: antiquewhite;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `}>
    <label
      key={sid + '-label-key'}>
      {label}
    </label>
    <div
      key={sid + '-sid-key'}>Sid: {sid}
    </div>
    <div
      key={sid + '-type-key'}
    ><span>Type: {type}</span> <span>CreatedOn: {date}</span>
    </div>
    <ChatDownloaderButton
      manager={manager}
      sid={sid}
      key={sid + '-download-key'}
    />
  </li>

  return listItemJSX;
};