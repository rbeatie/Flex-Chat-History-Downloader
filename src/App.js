import React from "react";
import ChatDownloader from "./ChatDownloader/ChatDownloader";
import { View } from "@twilio/flex-ui";
import { ChatDownloaderLink } from "./ChatDownloader/ChatDownloaderLink";
import * as Flex from "@twilio/flex-ui";

class App extends React.Component {

  constructor(props) {
    super(props);
    const {manager} = this.props;

    Flex
      .ViewCollection
      .Content
      .add(
      <View
        name="chat-downloader"
        key="chat-downloader-key"
      >
        <ChatDownloader
          manager={manager}
        />
      </View>
    );

    Flex
      .SideNav
      .Content
      .add(
      <ChatDownloaderLink
        key="chat-sidelink-key"
      />,
      {sortOrder: -1}
      );
  }

  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    return (
      <Flex.ContextProvider
        manager={manager}
      >
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

export default App;
