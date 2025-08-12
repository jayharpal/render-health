// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type ITaskBoard = {
  _id?: string;
  users?: {
    email: string;
  };
  name: string;
  members_id?: string[];
  members?: string[];
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  priority: string;
  reporter_id?: string[];
  assignee_id?: string[];
  attachments: string[];
  taskList?: ITask[];
};

export type ITask = {
  taskList?: string;
  board_id?: string;
  boardName?: string;
  _id?: string;
  name?: string;
  due?: [Date, Date];
  priority?: string;
  description?: string;
  attachments?: string[];
  assignee?: {
    _id?: string;
    name?: string;
  }[];
  labels?: string[];
  complexity?: string[];
  etatime?: string;
  time?: string;
  reporter?: {
    name?: string;
    avatarUrl?: string;
  };
  user_task?: IUserTask[];
  board_data?: {
    name?: string;
  }
};
export type IUpdateTask = {
  _id?: string;
  id?: string;
  users?: {
    email: string;
  };
  name?: string;
  members_id?: string[];
  members?: string[];
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  priority?: string;
  complexity?: string[];
  reporter_id?: string[];
  assignee_id?: string[];
  assignee?: string[];
  attachments?: (string | File)[];
  board_id?: string;
  project_id?: string;
  task_id?: string;
  due?: {
    startDate: string;
    endDate: string;
  };
};

export type ITaskBoardState = {
  isLoading: boolean;
  isCommentLoading: boolean;
  error: Error | string | null;
  taskboards: ITaskBoard[];
  notification: string | null;
  variant: VariantType;
  comments: IComment[]; // Add this property
};

export type IComment = {
  [x: string]: any;
  messageType: string;
  message: any;
  task_id?: string;
  comment_text: string;
  isLoading: boolean;
  error: Error | string | null;
  taskboards: ITaskBoard[];
  notification: string | null;
  variant: VariantType;
  comments: string[]; // Add this property
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  admin_data?: [
    {
      email?: string;
    },
  ];
  user_data?: [
    {
      name?: string;
    },
  ];
};

export type ICommentAdd = {
  user_id?: string;
  admin_id?: string;
  task_id: string;
  comment_text: string;
  is_private?: boolean;
  recipient_user_id?: string[];
};

export type IUserTask = {
  user_id: string;
  user?: {
    name: string;
  };
  board_data?: {
    name: string;
  };
};

export type ITaskBoardPostData = {
  name: string;
  color_code: string;
  is_default: boolean;
};

export type IAssignee = {
  id: string;
  name?: string;
  avatarUrl?: string;
}