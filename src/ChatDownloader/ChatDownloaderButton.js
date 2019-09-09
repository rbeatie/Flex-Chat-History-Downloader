import React from 'react';
import { Icon } from '@twilio/flex-ui';
import { css } from "react-emotion";

export class ChatDownloaderButton extends React.Component {
  state = {
    isReady: false,
    error: void 0
  };

  constructor(props) {
    super(props);
    this.state.channel = this.props.manager.store.getState().flex.chat.channels[this.props.sid].source
  }

  async descriptorToCSV(descriptor) {
    const header = `Chat Channel: ${this.props.channelSid}, Created Date: ${this.state.channel.state.dateCreated} \n`;
    const {messages} = descriptor;

    return await messages.reduce((acc, cur, i) => {
      console.log(cur, acc, i);
      const {author, body} = cur.source;
      return acc += `"${author}", "${body.replace('\n', '')}" \n`;
    }, header);

  }

  async onClickHandler() {
    // collect ChatChannelDescriptors
    const {manager} = this.props;
    console.log('clikcing', manager);
    const descriptors = await manager
      .store
      .getState()
      .flex
      .chat
      .channels;
    console.log('Descriptors', descriptors);
    const descriptor = descriptors[this.props.sid];
    console.log('Descriptor', descriptor);

    const csv = await this.descriptorToCSV(descriptor);

    // Format Chats into CSV
    console.log('CSV', csv);

    // Create Link with Data Element
    const virtualLink = document.createElement('a');
    virtualLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    virtualLink.target = '_blank';
    virtualLink.download = `chat_descriptors_${new Date(Date.now()).getDate()}.csv`;

    // start download for user
    await virtualLink.click();
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
        <button
          onClick={() => {
            console.log('click');
             this.onClickHandler()
               .then(() => console.log('Clicked Handled'))
               .catch(err => console.error('chat download failed: ', err));
          }}>
          {
            this.state.ready
              ? <Icon icon="DownloadActive"/>
              : <div>Loading . . . .</div>
          }}
        </button>
      </div>
    );
  }
}
