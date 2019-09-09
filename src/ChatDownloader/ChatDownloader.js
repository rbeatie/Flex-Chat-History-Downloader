import React from '@twilio/flex-ui';
import TwilioChat from 'twilio-chat';
import { Icon } from '@twilio/flex-ui';

class ChatDownloader extends React.Component {
  state = {
    ok: false,
    error: void 0,
    task: {}
  };

  constructor(props) {
    super(props);
    setupChatCatcher();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.task.channelType === 'chat' && nextState.task !== nextProps.task) {
      nextState.task = nextProps.task;
      nextState.ok = true;
      return true;
    } else {
      nextState.ok = false;
      return true;
    }
  }

  downloadChatHistory() {
  }

  render() {
    if (this.state.error) {
      return this.props.render({
        error: this.state.error
      });
    }

    if (this.state.ok) {
      return this.state.render(
        <div>
          <button>
            <Icon icon='Logout' />
          </button>
        </div>
      )
    }
    return
  }
}


export function setupChatCatcher(manager) {
  const historyMap = window.ChannelHistories = {};
  const stateStore = () => manager
    .store
    .getState();
  const channels = stateStore()
    .flex
    .chat
    .channels;

  for (let key of Object.keys(channels)) {
    const descriptor = channels[key];
    const chan = descriptor
      .source;

    chan.on('messageAdded', (message) => {
      historyMap[chan.sid] = descriptor
        .messages
        .map(extractMessage);
      console.log('Channel History updated >', descriptor);
    });
  }

  manager.chatClient.on('channelRemoved', (chan) => {
    console.log('CHAN REMOVED!!');
  });

  manager.chatClient.on('channelAdded', (chan) => {
    chan.on('messageAdded', (message) => {
      historyMap[chan.sid] = stateStore()
        .flex
        .chat
        .channels[chan.sid]
        .messages
        .map(extractMessage);
      console.log('Channel History updated > ', chan);
    })
  });

  function extractMessage(messageData) {
    return {
      author: messageData.source.author,
      text: messageData.source.body
    };
  }
}

export function setupChatClient(options) {
  const manager  = options;

  TwilioChat
    .create(manager.user.token)
    .then(chatClient => {
      console.log('client??');
      chatClient.on('channelAdded', (channel) => {

        console.log('channel??', channel);

        channel.onChannelUpdate = async function (member) {
          console.log('member', member);
          if (member.identity === 'guest') {  // check if guest
            console.log('task on member??');

            // create new task
            const taskRouter = await manager

              .workerClient
              .Client
              .create(manager.user.token);

            console.log('taskrouter', taskRouter);

            const workflowInstances = await taskRouter
              .workspaces(manager.user.token)
              .workflows
              .list();
            const workFlow = workflowInstances
              .filter(flow => flow.friendlyName === 'ChatWorkflow')[0];

            workFlow.tasks.create({
              attributes: JSON.stringify({
                channelSid: channel.sid,
                name: "Visitor",
                channelType: "web"
              }),
              workflowSid: workFlow.sid
            });
          }
        };
      });
    })
}