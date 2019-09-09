import React from 'react';
import { Icon } from '@twilio/flex-ui';
import { css } from "react-emotion";

export class ChatDownloaderButton extends React.Component {
  state = {
    isReady: false,
    error: void 0
  };

  async descriptorToCSV(descriptor) {
    const header = `Chat Channel: ${this.props.channelSid}, Download Date: ${new Date(Date.now()).getDate()} \n`;
    const {messages} = descriptor;

    return await messages.reduce((cur, acc, i) => {
      return acc += `${cur.source.author}, ${cur.source.body} \n`;
    }, header);

  }

  async onClickHandler() {
    if (this.state.ready) {
      await this.setState({isReady: false});

      // collect ChatChannelDescriptors
      const descriptor = await this
        .props
        .manager
        .store
        .getState()
        .flex
        .chat
        .channels[this.props.channelSid];

      const csv = this.descriptorToCSV(descriptor);
      // Format Chats into CSV

      // Create Link with Data Element
      const virtualLink = document.createElement('a');
      virtualLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      virtualLink.target = '_blank';
      virtualLink.download = `chat_descriptors_${new Date(Date.now()).getDate()}.csv`;
      // start download for user
      await virtualLink.click();
    }
  }

  render() {
    return (
      <div
        className={
          css`
            fill: black;
          `}
      >
        <label>Chat History</label>
        <button onClick={() => {
           this.onClickHandler()
             .catch(err => console.error('chat download failed: ', err));
        }}>
          { this.state.ready
            ? <Icon icon="DownloadActive"/>
            : <div>Loading . . . .</div>
          }}
        </button>
      </div>
    );
  }
}
