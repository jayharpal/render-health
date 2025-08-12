'use client';

import { useState, useEffect, useCallback } from 'react';
import SocketIOClient from 'socket.io-client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSearchParams } from 'src/routes/hooks';

import { useSettingsContext } from 'src/components/settings';

import { IUsers } from 'src/types/chat';

import { useAuthContext } from 'src/auth/hooks';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearChat, getAllChatUsers, getAllUsers, getChatByChatID } from 'src/redux/slices/chat';

import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';

// ----------------------------------------------------------------------

export default function ChatView() {
  const { user } = useAuthContext();

  const dispatch = useDispatch();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState<IUsers | null>(null);

  const [members, setMembers] = useState<string[] | []>([]);

  const { chat_users, isLoading: chatUsersLoading, users, chat_messages } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (chat_messages && Array.isArray(chat_messages) && chat_messages.length > 0) {
      setMembers(chat_messages[0].participants.map((member) => member._id))
    }
  }, [chat_messages])

  useEffect(() => {
    if (recipients) {
      setMembers([])
    }
  }, [recipients])

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST_API;
    if (apiUrl) {
      const socket = SocketIOClient(apiUrl);
      socket.on('connect', () => {
        console.log('Connected to server');

        socket.emit('join_chat', JSON.stringify({ sender: user?.id || user?._id }));
      });

      socket.on('newMessage', (newMessage) => {
        // dispatch(getAllChatUsers());
        if (selectedConversationId === newMessage?.chat_id) {
          dispatch(getChatByChatID(newMessage?.chat_id));
        }
      });

      socket.on('messageRead', (messageReadRs) => {
      });

      socket.on('error', () => {
        console.log('Connected to server with');
      });

      return () => {
        // Clean up the socket connection when the component is unmounted
        socket.disconnect();
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId, user]);

  useEffect(() => {
    dispatch(clearChat())
    dispatch(getAllUsers());
    dispatch(getAllChatUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  useEffect(() => {
    if (selectedConversationId) {
      dispatch(getChatByChatID(selectedConversationId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);

  const participants = chat_messages && Array.isArray(chat_messages) && chat_messages.length > 0 ? chat_messages[0]?.participants : []
  const singleParticipant = participants.find(participant => (participant._id !== user?.id) || (participant._id !== user?._id));
  // useEffect(() => {
  //   if (conversationError || !selectedConversationId) {
  //     router.push(paths.dashboard.chat);
  //   }
  // }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected: IUsers) => {
    setRecipients(selected);
  }, []);

  const details = chat_messages && Array.isArray(chat_messages) && chat_messages.length > 0;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail singleParticipant={singleParticipant} participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={users} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={chat_users}
      // chatSummary={chat_summary}
      loading={chatUsersLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={chat_messages} chatRoomId={selectedConversationId} participants={participants} />

      <ChatMessageInput
        members={members}
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && <ChatRoom singleParticipant={singleParticipant} conversation={chat_messages} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
