import React from 'react';
import { css } from 'emotion';
import { withTheme } from '@twilio/flex-ui';
import { ChatDownloaderListItem } from './ChatDownloaderListItem';


class ChatDownloader extends React.Component {
  state = {
    ready: false,
    error: void 0,
    channels: []
  };

  constructor(props) {
    super(props);

    this.updateChannels()
  }

  componentWillUnmount() {
    return this.unsub
      ? this.unsub()
      : () => {};
  }

  updateChannels() {
    const {manager} = this.props;

    console.log('manager', manager);

    this.unsub =  manager
      .store
      .subscribe(
      () => {
        this.setState({
          channels: [],
          ready: false
        });

        const channels = manager
          .store
          .getState()
          .flex
          .chat
          .channels
        ? manager
          .store
          .getState()
          .flex
          .chat
          .channels
        : [];

        for (let key of Object.keys(channels)) {
          const descriptor = channels[key];

          if (!(descriptor.source.sid in this.state.channels)) {
            const nextChannels = [
              ...this.state.channels,
              {
                [descriptor.source.sid]: descriptor
              }
            ];

            this.setState({channels: nextChannels});
          }
        }

        this.setState({ready: true});
      }
    );
  }

  render() {
    const {manager} = this.props;

    if (this.state.error) {
      console.error(this.state.error);
      return (
        <div>
          Error, check console.
        </div>
      );
    }

    if (this.state.ready) {
      return (
        <section
          className={
            css`
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: flex-start;
              flex-direction: column;
            `
          }
        >
          <h1
            className={css`
              font-size: 1.6em;
              font-weight: 700;
            `}
          >Chat Channel History Downloader
          </h1>
          <div>Please select a channel below to download the history to a CSV.
          </div>
          <ul
            className={css`
              background: grey;
              max-width: 45%;
              min-height: 100%;
            `}
          >
          {
          this.state.channels
            .map(
              descriptor => {
                const sid = Object.keys(descriptor)[0];
                const chan = descriptor[sid].source;

                return (
                  <ChatDownloaderListItem
                    key={'channel-' + sid + '-key'}
                    manager={manager}
                    label={chan.state.friendlyName}
                    sid={chan.sid}
                    type={chan.type}
                    date={chan.state.dateCreated.toDateString()}
                  />
                );
              }
          )}
          </ul>
        </section>
      );
    }
    return null;
  }
}

export default withTheme(ChatDownloader);
