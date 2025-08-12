// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type IProject = {
  _id?: string;
  users?: {
    email: string;
  };
  name?: string;
  project_id?: string;
  members_id?: string[];
  members?: string[];
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  is_archived?: boolean;
  visibility?: string;
};

export type IProjectPostData = {
  _id?: string;
  users?: {
    email: string;
  };
  name?: string;
  project_id?: string;
  members_id?: string[];
  members?: string[];
  is_deleted?: boolean;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  is_archived?: boolean;
  organization_id?: string
};

export type IProjectState = {
  isLoading: boolean;
  error: Error | string | null;
  projects: IProject[];
  project: IProject | null;
  notification: string | null;
  variant: VariantType;
};
