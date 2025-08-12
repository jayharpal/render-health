// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type ICourse = {
  _id?: string;
  course_name?: string;
  course_image?: string;
  course_video?: string;
  organization_id?: string;
  user_id?: string;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};

export type ICourseRequest = {
  course_name: string;
  organization_id: string;
  user_id: string;
};

export type ICourseState = {
  isLoading: boolean;
  error: Error | string | null;
  //   projects: IProject[];
  courses: ICourse | null;
  notification: string | null;
  variant: VariantType;
  videoLoadingId: null;
};
