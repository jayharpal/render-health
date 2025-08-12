import Box from '@mui/material/Box';

import Scrollbar from 'src/components/scrollbar';

import { ChatMessage, IUsers } from 'src/types/chat';

import { useEffect, useRef } from 'react';
import { readMessage } from 'src/redux/slices/chat';
import { useDispatch } from 'src/redux/store';
import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: ChatMessage[];
  chatRoomId: string;
  participants: IUsers[];
};

export default function ChatMessageList({ messages = [], chatRoomId, participants }: Props) {
  const dispatch = useDispatch();
  const { messagesEndRef } = useMessagesScroll(messages);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async(entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            const isMessangerNotSelf = entry.target.getAttribute('data-message-sender');
            const isMessageRead = entry.target.getAttribute('data-message-read');

            if (messageId && isMessangerNotSelf === "true" && isMessageRead === "false") {
              const res = await dispatch(readMessage(messageId));
              if(res?.data?.status) {
                entry.target.setAttribute('data-message-read', 'true');
              }
            }
          }
        });
      },
      { threshold: 0.1 }
    );
  }, [dispatch]);

  useEffect(() => {
    const currentObserver = observerRef.current;
    const messageElements = document.querySelectorAll('.message-item');

    messageElements.forEach((element) => {
      if (currentObserver) {
        currentObserver.observe(element);
      }
    });

    return () => {
      messageElements.forEach((element) => {
        if (currentObserver) {
          currentObserver.unobserve(element);
        }
      });
    };
  }, [messages]);

  // const slides = messages
  //   .filter((message) => message.contentType === 'image')
  //   .map((message) => ({ src: message.body }));

  // const lightbox = useLightBox(slides);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message._id}
              message={message}
              participants={participants}
              onOpenLightbox={() => {}}
            />
          ))}
        </Box>
      </Scrollbar>

      {/* <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      /> */}
    </>
  );
}
