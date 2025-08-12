import { VariantType } from 'notistack';

export type IRoadmapProject = {
  project_id: string;
  sequence: number
  _id?: string;
  name?: string;
  progress?: string;
}

export type IRoadmapPostData = {
  _id?: string;
  title?: string;
  description?: string;
  projects?: IRoadmapProject[];
  project_sequence?:IRoadmapProject[],
  is_deleted?: boolean;
  members_id?: string[];
  members?: string[];
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  organization_id?: string
}

export type IRoadmap = {
  _id?: string;
  title?: string;
  description?: string;
  projects?: IRoadmapProject[];
  project_sequence?:IRoadmapProject[],
  is_deleted?: boolean;
  members_id?: string[];
  members?: string[];
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  progress?: number;
};
export type IRoadmapUser = {
  _id?: string;
  roadmap_id?: string;
  user_id: string;
  is_deleted?: boolean;
  assignee?: string[];
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
};
export type IRoadmapState = {
  isLoading: boolean;
  error: Error | string | null;
  roadmaps: IRoadmap[];
  roadmap: IRoadmap | null;
  notification: string | null;
  variant: VariantType;
};
export type IRoadmapUserState = {
  isLoading: boolean;
  error: Error | string | null;
  // roadmaps: IRoadmap[] ;
  // roadmap: IRoadmap | null;
  roadmap_users: IRoadmapUser[];
  roadmap_user: IRoadmapUser | null;
  notification: string | null;
  variant: VariantType;
};
