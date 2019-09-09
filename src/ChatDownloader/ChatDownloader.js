import React from 'react';
import { ChatDownloaderListItem } from "./ChatDownloaderListItem";
import {css} from "emotion";

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
    return this.unsub ? this.unsub() : () => {};
  }

  updateChannels() {
    const {manager} = this.props;

    console.log('manager', manager);

    this.unsub =  manager
      .store
      .subscribe(
      () => {
        this.setState({channels: [], ready: false});

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
          <h1>Chat Channel History Downloader</h1>
          <div>
            Please select a channel below to download the history to a CSV.
          </div>
          <ul>
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
      )
    }
    return null;
  }
}

export default ChatDownloader;


/**
 * = Descriptor =
 * currentPaginator: {items: Array(16), hasPrevPage: false, hasNextPage: false, prevPage: ƒ, nextPage: ƒ}
 * errorWhileLoadingChannel: false
 * inputText: ""
 * isLoadingChannel: false
 * isLoadingMembers: false
 * isLoadingMessages: false
 * lastConsumedMessageIndex: 15
 * listener: e {_listening: true, handleMessageAdded: ƒ, handleMessageUpdated: ƒ, handleMessageRemoved: ƒ, handleMemberJoined: ƒ, …}
 * members: Map(2) {"BBRjgbo0DKuA0ADvtakeMobXghttFvss" => {…}, "rbeatie" => {…}}
 * messages: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 * selectionStart: 0
 * source: Channel {_events: {…}, _eventsCount: 10, _maxListeners: undefined, services: ClientServices, sid: "CHa9723ff3f8ab48999dc88fbb607c938a", …}
 * typers: []
 *
 *
 * messages: [
 *   groupWithNext: false
 *   groupWithPrevious: false
 *   isFromMe: false
 *   source: {
 *    attributes: (...)
 *    createdBy: (...)
 *    dateCreated: (...)
 *    dateUpdated: (...)
 *    friendlyName: (...)
 *    isPrivate: (...)
 *    lastConsumedMessageIndex: (...)
 *    lastMessage: (...)
 *    notificationLevel: (...)
 *    status: (...)
 *    type: (...)
 *    uniqueName: (...)
 *   }
 * ]
 */