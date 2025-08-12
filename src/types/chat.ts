// ----------------------------------------------------------------------

import { VariantType } from 'notistack';
import { IIntern } from 'src/types/interns';

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};

export type IChatMessage = {
  id: string;
  body: string;
  createdAt: Date;
  senderId: string;
  contentType: string;
  attachments: IChatAttachment[];
};

export type IChatParticipant = IIntern;

export type IChatContact = {
  contact: {
    _id: string,
    email: string,
    name: string,
    mobile: string,
    is_active: boolean
  },
  chat_room_id: string,
  unreadCount: number,
  lastActivity: string,
  lastActivityAt: string,
};

export type IUsers = {
  _id: string,
  email: string,
  name: string,
  mobile: string,
  is_active: boolean
};

export interface Sender {
  _id: string;
  is_active: boolean;
  name: string;
  email: string;
  mobile: string;
}

export interface ChatMessage {
  _id: string;
  files: any[];
  is_read: boolean;
  message: string;
  updatedAt: string;
  createdAt: string;
  sender: Sender;
  participants: Sender[];
  is_updated: boolean;
}

export type ChatMessagePayload = {
  members_id: string[],
  message: string,
  is_group?: boolean,
  files?: any[]
}

export interface IChatSummary {
  lastActivity: string,
  lastActivityAt: string,
  chat_room_id: string,
  unreadCount: number
}

export type IChatState = {
  chat_messages: ChatMessage[],
  // chat_summary: IChatSummary[],
  users: IUsers[],
  chat_users: IChatContact[],
  isLoading: boolean;
  error: Error | string | null;
  notification: string | null;
  variant: VariantType;
}

// {
//   id: string;
//   name: string;
//   role: string;
//   email: string;
//   address: string;
//   avatarUrl: string;
//   phoneNumber: string;
//   lastActivity: Date;
//   status: 'online' | 'offline' | 'alway' | 'busy';
// };

export type IChatConversation = {
  id: string;
  type: string;
  unreadCount: number;
  messages: IChatMessage[];
  // participants: IChatParticipant[];
  participants: IIntern[];
};

export type IChatConversations = {
  byId: Record<string, IChatConversation>;
  allIds: string[];
};
