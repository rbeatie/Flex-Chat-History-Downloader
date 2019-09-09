import React from 'react';
import {Icon} from '@twilio/flex-ui';
import {css} from "react-emotion";

export class ChatDownloaderButton extends React.Component {
  state = {
    ready: false,
    error: void 0
  };

  constructor(props) {
    super(props);
    try {

      this.state.channel = this
        .props
        .manager
        .store
        .getState()
        .flex
        .chat
        .channels[this.props.sid]
        .source
    } catch (e) {
      this.state.error = e;
    }
    this.state.ready = true;
  }

  async descriptorToCSV(descriptor) {
    const header = `Chat Channel: ${this.props.channelSid}, Created Date: ${this.state.channel.state.dateCreated} \n`;
    const {messages} = descriptor;

    return await messages
      .reduce(
        (acc, cur, i) => {
          const {author, body} = cur.source;
          return acc += `"${author}", "${body.replace('\n', '')}" \n`;
        },
        header
      );
  }

  async onClickHandler() {
    // collect ChatChannelDescriptors
    const {manager} = this.props;
    const descriptors = await manager
      .store
      .getState()
      .flex
      .chat
      .channels;
    const descriptor = descriptors[this.props.sid];
    const csv = await this
      .descriptorToCSV(descriptor);

    // Create Link with Data Element
    const virtualLink = document.createElement('a');
    virtualLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    virtualLink.target = '_blank';
    virtualLink.download = `chat_descriptors_${this.state.channel.state.dateCreated}.csv`;

    // start download for user
    await virtualLink
      .click();
  }

  render() {
    return (
      <div
        className={
          css`
            background: antiquewhite;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
      >
        <button
          className={css`
            background: hotpink;
            border-radius: 1em;
            width: 256px;
          `}
          onClick={() => {
            this.onClickHandler()
              .then(() => console.log('Clicked Handled'))
              .catch(err => console.error('chat download failed: ', err));
          }}>
          {
            this.state.ready
              ? <div
                className={css`
                  display: flex;
                   flex-direction: column;
                    justify-content: center;
                `}
              >
                <Icon
                  icon="Message"
                />
                Download
              </div>
              : <div>Loading . . . .</div>
          }
        </button>
      </div>
    );
  }
}
