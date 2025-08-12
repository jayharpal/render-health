// ----------------------------------------------------------------------
import { VariantType } from 'notistack';

export type IOfferReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type IOffer = {
  channel?: string[];
  schemes: Array<any>;
  daysOfWeek: string;
  weekDays?: Array<any>;
  maxTransactionAmount: number;
  minTransactionAmount: number;
  id: string;
  description: string;
  termsAndConditions: string;
  isOneTime: boolean;
  maxRedemptions: string;
  redeemCounter?: string;
  startDate: Date | string | number;
  endDate: Date | string | number;
  imageUrl?: string | File;
  offerStatus: string;
  provider: string;
  offerType: string;
  juxBonus?: string;
  merchantLocations: {
    id: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    postcode: string;
    city: string;
    country: string;
    primaryContactNumber: string;
    email: string;
    imageUrl: string;
    latitude: string;
    longitude: string;
    googlePlaceId: string;
    offers: string;
  }[];
  discountValue: string;
  discountType: string;
  isJoiningOffer: boolean;
  juxBonusToMerchant?: string;
  authToken?: string;
};

export type IOfferFilter = {
  fromDate: string;
  toDate: string;
  showOnly: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
  rating: string;
  sortBy: string;
};

export type IRedeemOfferFilter = {
  fromDate: string;
  toDate: string;
  showOnly: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
  rating: string;
  sortBy: string;
};

// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  colors: string[];
  size: string;
  quantity: number;
  subtotal: number;
};

export type ICheckoutBillingAddress = {
  receiver: string;
  phoneNumber: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};

export type ICheckoutDeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type ICheckoutPaymentOption = {
  value: string;
  title: string;
  description: string;
  icons: string[];
};

export type ICheckoutCardOption = {
  value: string;
  label: string;
};

// ----------------------------------------------------------------------

export type IOfferCheckoutState = {
  activeStep: number;
  cart: ICheckoutCartItem[];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  billing: ICheckoutBillingAddress | null;
  totalItems: number;
};

export type IOfferState = {
  isLoading: boolean;
  error: Error | string | null;
  mydemo: string | null;
  offers: IOffer[];
  offer: IOffer | null | any;
  notification: string | null;
  variant: VariantType;
  checkout: IOfferCheckoutState;
  pageNumber: Number;
  pageSize: Number;
  totalElements: Number;
  totalPages: Number;
};
