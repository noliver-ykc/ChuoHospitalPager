import React from 'react';
import { Avatar, ChannelPreview, useChatContext } from 'stream-chat-react';

type Channel = {
  id: string;
  data: {
    name: string;
    id: string;
  };
  state: {
    members: {
      [userId: string]: {
        user: {
          id: string;
          fullName: string;
          image: string;
        };
      };
    };
  };
};

type TeamChannelPreviewProps = {
  channel: Channel;
  type: string;
};

const TeamChannelPreview: React.FC<TeamChannelPreviewProps> = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }: { user: { id: string } }) => user.id !== client.userID
    );
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? 'channel-preview__wrapper__selected'
          : 'channel-preview__wrapper'
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
