import React from "react";
import * as Flex from "@twilio/flex-ui";
import {ChatDownloaderButton} from "./ChatDownloader/ChatHistoryDownloaderButton";

class App extends React.Component {

  componentDidMount() {
    Flex.MainHeader.Content.add(
      <ChatDownloaderButton
        key="download-chat-history-key"
      />
    );
  }

  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    return (
      <Flex.ContextProvider manager={manager}>
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

export default App;
