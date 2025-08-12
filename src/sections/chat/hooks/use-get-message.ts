import { ChatMessage, IUsers } from 'src/types/chat';

// ----------------------------------------------------------------------

type Props = {
  message: ChatMessage;
  currentUserId: string;
  participants: IUsers[];
};

export default function useGetMessage({ message, participants, currentUserId }: Props) {
  const sender = participants.find((participant) => participant._id === message.sender?._id);

  const senderDetails =
    message.sender?._id === currentUserId
      ? {
          type: 'me',
        }
      : {
          avatarUrl: sender?.name || sender?.email,
          firstName: sender?.name.split(' ')[0],
        };

  const me = senderDetails.type === 'me';

  const hasImage = message.files && message.files?.length > 0;

  return {
    hasImage,
    me,
    senderDetails,
  };
}
