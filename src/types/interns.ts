// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type IIntern = {
  value?: string;
  id?: string;
  _id?: string;
  platform?: string;
  is_active: boolean;
  is_deleted?: boolean;
  mobile: number;
  email: string;
  name: string;
  password?: string;
  updatedAt?: string;
  createdAt?: string;
  __v?: number;
  token?: {
    web: string;
  };
  accesstoken?: string;
  avatarUrl?: string;
  lastActivity?: Date;
  status?: 'online' | 'offline' | 'alway' | 'busy';
  role?: string | null;
  address?: string;
  phoneNumber: string;

};

export type IInternState = {
  isLoading: boolean;
  error: Error | string | null;
  interns: IIntern[];
  notification: string | null;
  variant: VariantType;
};
