import { useRef, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import { IUsers } from 'src/types/chat';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from 'src/auth/hooks';
import { sendMessage } from 'src/redux/slices/chat';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  members: string[] | []
  recipients: IUsers | null;
  onAddRecipients: (recipients: IUsers) => void;
  //
  disabled: boolean;
  selectedConversationId: string;
};

export default function ChatMessageInput({
  members,
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
}: Props) {
  const router = useRouter();

  const dispatch = useDispatch();

  const { user } = useAuthContext();

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  // const myContact = useMemo(
  //   () => ({
  //     id: `${user?.id || user?._id}`,
  //     email: `${user?.email}`,
  //     name: `${user?.name}`,
  //     avatarUrl: `${user?.name || user?.email}`,
  //     phoneNumber: `${user?.mobile}`,
  //     status: user?.is_active ? 'online' : 'offline',
  //   }),
  //   [user]
  // );

  // const handleAttach = useCallback(() => {
  //   if (fileRef.current) {
  //     fileRef.current.click();
  //   }
  // }, []);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async () => {
      try {
        if (message.trim()) {
          const payload = {
            members_id: members && Array.isArray(members) && members.length > 1 ? members : [recipients?._id, user?.id || user?._id],
            message
          }

          const res = await dispatch(sendMessage(payload))

          if (res?.data?.status) {
            router.push(paths.dashboard.chat.chatId(res?.data?.result?.chat_id));
          }

          // if (selectedConversationId) {
          // await sendMessage({
          //   message,
          //   recipients
          // });
          // } else {
          // const res = await createConversation(conversationData);

          //   router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);

          //   onAddRecipients([]);
          // }
          setMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    },
    // [conversationData, message, messageData, onAddRecipients, router, selectedConversationId, recipients]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [message, recipients, user]
  );

  const handleKeyPress = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleKeyPress}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleSendMessage} disabled={message.trim().length === 0}>
              <Iconify icon="mynaui:send" />
            </IconButton>
            {/* <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton> */}
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}
