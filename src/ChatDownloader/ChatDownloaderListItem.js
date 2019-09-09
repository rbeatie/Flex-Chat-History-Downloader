import React from 'react';
import { ChatDownloaderButton } from "./ChatDownloaderButton";
import { css } from "emotion";

const styleClass = css`
      background: antiquewhite;
      display: flex;
      flex-direction: column;
      text-align: center;
    `;

export const ChatDownloaderListItem = ({label, sid, type, date, manager}) => {

  return <li
    className={styleClass + ' ' + css`
      margin: 5px 15px; 
      margin-top: 25px;
      padding: 8px;
    `}>
    <label
      className={css`
        font-size: 1.6em;
        font-weight: 700;
        text-align: center
      `}
      key={sid + '-label-key'}
    >
      { label }
    </label>
    <div
      className={css`
      font-size: 1.3em;
      font-weight: 500;
      background: antiquewhite;
      display: flex;
      flex-direction: column;
      text-align: center;
    `}
      key={ sid + '-sid-key' }>Sid: { sid }
    </div>
    <div
      className={styleClass + ' ' + css`
        font-size: 1.3em;
        font-weight: 500;
      `}
      key={sid + '-type-key'}
    >
      <span>Type: { type }</span><span>CreatedOn: {date}</span>
    </div>
    <div
      className={css`
       align-items: center;
      `}
    >
      <ChatDownloaderButton
        manager={manager}
        sid={sid}
        key={sid + '-download-key'}
      />
    </div>
  </li>;
};