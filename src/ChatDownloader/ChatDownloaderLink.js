import React from "react";
import * as Flex from "@twilio/flex-ui";
import {Download, DownloadActive} from "./Icons/Download.Icons";

export function ChatDownloaderLink() {

  function navigateToChatDownloader() {
    Flex.Actions.invokeAction(
      'NavigateToView',
      {
         viewName: 'chat-downloader'
      });
  }

  return (
    <Flex.SideLink
      icon={<Download />}
      iconActive={<DownloadActive />}
      activeView={'chat-downloader'}
      showLabel={true}
      onClick={() => {
        navigateToChatDownloader();
      }}
    >
      Chat Downloader
    </Flex.SideLink>
  );
}