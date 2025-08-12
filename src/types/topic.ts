// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type ITopic = {
  _id?: string;
  name?: string;
  tags?: string[];
  image?: string;
  description?: string;
  content?: string;
  course_id?: string;
  subject_id?: string;
  chapter_id?: string;
  organization_id?: string;
  user_id?: string;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};

export type ITopicRequest = {
  name: string;
  tags?: string[];
  image?: string;
  description?: string;
  content?: string;
  organization_id: string;
  course_id?: string;
  subject_id?: string;
  chapter_id?: string;
  user_id: string;
};

export type ITopicState = {
  isLoading: boolean;
  error: Error | string | null;
  //   projects: IProject[];
  topics: ITopic[];
  topic: ITopic | null;
  notification: string | null;
  variant: VariantType;
};
