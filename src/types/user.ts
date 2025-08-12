import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

// ----------------------------------------------------------------------

export type IUserSocialLink = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  facebookLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
};

export type IUserProfileCover = {
  name: string;
  cover?: string;
  role: string;
  coverUrl?: string;
  avatarUrl: string;
};

export type IUserProfileFollowers = {
  follower: number;
  following: number;
};

export type IUserProfileAbout = {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
  coverUrl?:string;
};

export type IUserProfile = IUserProfileFollowers &
  IUserProfileAbout & {
    id: string;
    socialLinks: IUserSocialLink;
    totalFollowers: number;
    totalFollowing: number;
  };

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
  isFollowed?: boolean;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date | string | number;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  media: string;
  message: string;
  createdAt: Date | string | number;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    message: string;
    createdAt: Date | string | number;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
};

export type IUserCard = {
  id: string;
  cover: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
  following: number;
  follower: number;
};

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

export type IUserAccount = {
  email: string;
  isPublic: boolean;
  displayName: string;
  city: string | null;
  state: string | null;
  about: string | null;
  country: string | null;
  address: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  photoURL: CustomFile | string | null;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  authToken?: string;
};

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type IUserAccountBillingCreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type IUserAccountBillingInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type IUserAccountBillingAddress = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type IUserAccountLocationsSate = {
  isLoading: boolean;
  error: Error | string | null;
  imageUrl: any[];
  id: number | null;
};

export type IUserAccountLocations = {
  id?: string | number;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  postcode?: string;
  city?: string;
  country?: string;
  primaryContactNumber?: string;
  email?: string;
  imageUrl?: string | File;
  latitude?: string | number;
  longitude?: string | number;
  googlePlaceId?: string;
  status?: string;
  offers?: string;
  icon?: string;
  iconBackgroundColour?: string;
  imageReference?: string;
  authToken?: string;
};

export type IUserAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};
