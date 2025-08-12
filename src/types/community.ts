// ----------------------------------------------------------------------
import { VariantType } from 'notistack';
import { IIntern } from './interns';

export type ICommunityQuestion = {
  _id?: string;
  question_id?: string;
  user_id?: string;
  content?: string;
  tags?: string[];
  llm_response?: string;
  is_private?: boolean;
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  user?: IIntern;
};
export type ICommunityAnswer = {
  _id?: string;
  user_id?: string;
  user?: {
    name?: string;
    email?: string;
  };
  content?: string;
  community_quetion_id?: string;
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};

export type ICommunityQuestionState = {
  isLoading: boolean;
  isLLMLoading: boolean;
  error: Error | string | null;
  community_question: ICommunityQuestion[];
  community_questions: ICommunityQuestion | null;
  notification: string | null;
  variant: VariantType;
};
export type ICommunityAnswerState = {
  isLoading: boolean;
  error: Error | string | null;
  community_answers: ICommunityAnswer[];
  notification: string | null;
  variant: VariantType;
};
