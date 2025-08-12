// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type IInquiry = {
  inquiry_id?: string;
  _id?: string;
  skills: string[] | undefined;
  is_deleted?: boolean;
  mobile_no: string;
  email: string;
  name: string;
  availability: string;
  status: string | undefined;
  role_preference: string;
  experience: string;
  dob: string;
  additional_information: string;
  updatedAt?: Date | string | number;
  createdAt?: Date | string | number;
  __v?: number;
  organization_id?: string;
};

export type IInquiryState = {
  isLoading: boolean;
  error: Error | string | null;
  inquirys: IInquiry[];
  notification: string | null;
  variant: VariantType;
};
