// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type ISubject = {
  _id?: string;
  subject_name?: string;
  subject_image?: string;
  subject_video?: string;
  course_id?: string;
  organization_id?: string;
  user_id?: string;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};

export type ISubjectRequest = {
  subject_name: string;
  organization_id: string;
  course_id?: string;
  user_id: string;
};

export type ISubjectState = {
  isLoading: boolean;
  error: Error | string | null;
  //   projects: IProject[];
  subjects: ISubject[];
  subject: ISubject | null;
  notification: string | null;
  variant: VariantType;
};
