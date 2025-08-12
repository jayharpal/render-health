// sections
import { Metadata } from 'next';
import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatPage() {
  return <ChatView />;
}
