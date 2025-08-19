// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      newPassword: `${ROOTS.AUTH}/firebase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    // auth0: {
    //   login: `${ROOTS.AUTH}/auth0/login`,
    // },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    // chat: `${ROOTS.DASHBOARD}/chat`,
    // blank: `${ROOTS.DASHBOARD}/blank`,
    // calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    // permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      // ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      // analytics: `${ROOTS.DASHBOARD}/analytics`,
      // banking: `${ROOTS.DASHBOARD}/banking`,
      // booking: `${ROOTS.DASHBOARD}/booking`,
      // file: `${ROOTS.DASHBOARD}/file`,
      // inquiry: `${ROOTS.DASHBOARD}/inquiry/list`,
    },
    dashboard: {
      root: `${ROOTS.DASHBOARD}/dashboard`,
    },
    manageAccount: {
      root: `${ROOTS.DASHBOARD}/manage-account`,
      patient: `${ROOTS.DASHBOARD}/manage-account/patient`,
      deals: `${ROOTS.DASHBOARD}/manage-account/deals`,
      facility: `${ROOTS.DASHBOARD}/manage-account/facility`,
      organizations: `${ROOTS.DASHBOARD}/manage-account/organizations`,
      renderEmployee: `${ROOTS.DASHBOARD}/manage-account/render-employee`,
    },
    hmo: {
      root: `${ROOTS.DASHBOARD}/hmo`,
      addHmo: `${ROOTS.DASHBOARD}/hmo/add-hmo`,
      enrollee: `${ROOTS.DASHBOARD}/hmo/enrollee`,
      billsClaims: `${ROOTS.DASHBOARD}/hmo/bills-claims`,
      facilities: `${ROOTS.DASHBOARD}/hmo/facilities`,
      // renderEmployee: `${ROOTS.DASHBOARD}/hmo/render-employee`,
    },
    billings: {
      root: `${ROOTS.DASHBOARD}/billings`,
      billingsByHospital: `${ROOTS.DASHBOARD}/billings/billings-by-hospital`,
      disputedBillings: `${ROOTS.DASHBOARD}/billings/disputed-billings`,
      viewAllBillings: `${ROOTS.DASHBOARD}/billings/view-all-billings`,
    },
    savingsCard: {
      root: `${ROOTS.DASHBOARD}/savings-card`,
      approvedClaims: `${ROOTS.DASHBOARD}/savings-card/approved-claims`,
      companies: `${ROOTS.DASHBOARD}/savings-card/companies`,
      members: `${ROOTS.DASHBOARD}/savings-card/members`,
      merchantRecommendations: `${ROOTS.DASHBOARD}/savings-card/merchant-recommendations`,
      merchants: `${ROOTS.DASHBOARD}/savings-card/merchants`,
      overdrafts: `${ROOTS.DASHBOARD}/savings-card/overdrafts`,
      pancard: `${ROOTS.DASHBOARD}/savings-card/pancard`,
      payment: `${ROOTS.DASHBOARD}/savings-card/payment`,
      pendingRequests: `${ROOTS.DASHBOARD}/savings-card/pending-requests`,
      rebate: `${ROOTS.DASHBOARD}/savings-card/rebate`,
      report: `${ROOTS.DASHBOARD}/savings-card/report`,
      settings: `${ROOTS.DASHBOARD}/savings-card/settings`,
      summary: `${ROOTS.DASHBOARD}/savings-card/summary`,
      tariff: `${ROOTS.DASHBOARD}/savings-card/tariff`,
      topUp: `${ROOTS.DASHBOARD}/savings-card/top-up`,
      transactions: `${ROOTS.DASHBOARD}/savings-card/transactions`,
      withdrawalRequests: `${ROOTS.DASHBOARD}/savings-card/withdrawal-requests`,
    },
    appointment: {
      root: `${ROOTS.DASHBOARD}/appointment`,
    },
    healthRecord: {
      root: `${ROOTS.DASHBOARD}/health-record`,
    },
    searchPatient: {
      root: `${ROOTS.DASHBOARD}/search-patient`,
    },
    inquiry: {
      root: `${ROOTS.DASHBOARD}/inquiry`,
      list: `${ROOTS.DASHBOARD}/inquiry/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/inquiry/${id}/edit`,
    },
    projects: {
      root: `${ROOTS.DASHBOARD}/projects`,
      list: `${ROOTS.DASHBOARD}/projects/list`,
      id: (id: string) => `${ROOTS.DASHBOARD}/projects/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/projects/${id}/edit`,
    },
    intern: {
      root: `${ROOTS.DASHBOARD}/intern`,
      list: `${ROOTS.DASHBOARD}/intern/list`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/intern/${id}/edit`,
    },
    roadmap: {
      root: `${ROOTS.DASHBOARD}/roadmap`,
      list: `${ROOTS.DASHBOARD}/roadmap/list`,
      create: `${ROOTS.DASHBOARD}/roadmap/create`,
      id: (id: string) => `${ROOTS.DASHBOARD}/roadmap/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/roadmap/edit/${id}`,
    },
    community: {
      root: `${ROOTS.DASHBOARD}/community`,
      create: `${ROOTS.DASHBOARD}/community/create`,
      id: (id: string) => `${ROOTS.DASHBOARD}/community/${id}`,
    },
    chat: {
      root: `${ROOTS.DASHBOARD}/chat`,
      id: (id: string) => `${ROOTS.DASHBOARD}/chat/${id}`,
      chatId: (id: string) => `${ROOTS.DASHBOARD}/chat/?id=${id}`,
    },
    courses: {
      root: `${ROOTS.DASHBOARD}/courses`,
      list: `${ROOTS.DASHBOARD}/courses/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/courses/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/courses/${id}/edit`,
      id: (id: string) => `${ROOTS.DASHBOARD}/courses/${id}`,
      subjectId: (id: string, subjectId: string) =>
        `${ROOTS.DASHBOARD}/courses/${id}/subject/${subjectId}`,
      chapterId: (id: string, subjectId: string, chapterId: string) =>
        `${ROOTS.DASHBOARD}/courses/${id}/subject/${subjectId}/chapter/${chapterId}`,
      topic: (id: string, subjectId: string, chapterId: string, topicId: string) =>
        `${ROOTS.DASHBOARD}/courses/${id}/subject/${subjectId}/chapter/${chapterId}/topic/${topicId}`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      // demo: {
      //   edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      // },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
