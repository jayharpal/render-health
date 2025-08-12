// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type IChapter = {
  _id?: string;
  chapter_name?: string;
  chapter_image?: string;
  chapter_video?: string;
  course_id?: string;
  subject_id?: string;
  organization_id?: string;
  user_id?: string;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};

export type IChapterRequest = {
  chapter_name: string;
  organization_id: string;
  course_id?: string;
  subject_id?: string;
  user_id: string;
};

export type IChapterState = {
  isLoading: boolean;
  error: Error | string | null;
  //   projects: IProject[];
  chapters: IChapter[];
  chapter: IChapter | null;
  notification: string | null;
  variant: VariantType;
};
