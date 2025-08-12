import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  // chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  inquiry: {
    post: '/inquiry',
    getInquiry: '/admin/inquiry',
    updateInquiry: '/admin/inquiry',
    convertToUser: 'admin/inquiry/convertouser/',
  },
  project: {
    getAll: '/project',
    getById: (id: string) => `/project/${id}`,
    create: '/admin/project',
    update: '/admin/project',
  },
  course: {
    getAll: '/course',
    getById: (id: string) => `/course/${id}`,
    create: '/admin/course',
    update: (id: string) => `/admin/course/${id}`,
    delete: (id: string) => `/admin/course/${id}`,
  },
  subject: {
    getAll: '/subject',
    getById: (id: string) => `/subject/${id}`,
    create: '/admin/subject',
    update: (id: string) => `/admin/subject/${id}`,
    getByCourse: (id: string) => `/subject/course/${id}`,
    delete: (id: string) => `/admin/subject/${id}`,
  },
  chapter: {
    getAll: '/chapter',
    getById: (id: string) => `/chapter/${id}`,
    create: '/admin/chapter',
    update: (id: string) => `/admin/chapter/${id}`,
    getBySubject: (id: string) => `/chapter/subject/${id}`,
    delete: (id: string) => `/admin/chapter/${id}`,
  },
  topic: {
    getAll: '/topic',
    getById: (id: string) => `/topic/${id}`,
    create: '/admin/topic',
    update: (id: string) => `/admin/topic/${id}`,
    getByChapter: (id: string) => `/topic/chapter/${id}`,
    delete: (id: string) => `/admin/topic/${id}`,
  },
  intern: {
    getAll: '/admin/users',
  },
  taskboard: {
    getAll: (id: string) => `/project/task/${id}`,
    create: '/project/task',
    update: '/project/task',
    createBoard: '/admin/project/task/board',
  },
  auth: {
    checkSession: '/checkSession',
    login: '/user/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  comment: {
    getAll: (id: string) => `/comment/task/${id}`,
    create: '/comment/add',
  },
  roadmap: {
    getAll: '/roadmap',
    create: '/admin/create/roadmap',
    delete: '/admin/delete/roadmap',
    getById: (id: string) => `/roadmap/${id}`,
    update: (id: string) => `/admin/update/roadmap/${id}`,
  },
  roadmap_user: {
    getAll: '/roadmap-user',
    delete: '/admin/delete/roadmap-user',
    getRoadmapUSer: '/get-by-roadmapid/roadmap-user/:id',
    create: '/admin/create/roadmap-user',
  },
  community_question: {
    getLLMResponse: '/tfz-ai/question',
    createQuestion: '/community/question',
    getAllQuestions: '/community/questions',
    getById: (id: string) => `/community/question/${id}`,
    update: (id: string) => `/community/question/${id}`,
    delete: (id: string) => `/community/question/${id}`,
  },
  community_answer: {
    createAnswer: '/community/answer',
    getAllAnswers: '/community/answers',
    getById: (id: string) => `/community/answer/${id}`,
    update: (id: string) => `/community/answer/${id}`,
    delete: (id: string) => `/community/answer/${id}`,
    getByQuestionId: (id: string) => `/community/answers/${id}`,
  },
  chat: {
    getChat: (id: string) => `/get/chat/${id}`,
    readChat: (id: string) => `/chat/read/${id}`,
    sendChat: '/chat',
    getContacts: `/chat/contacts`,
    getSummary: `/get/chat/summary`,
    getUsers: `/get/all/user`,
    getConversations: `/chat/conversations`,
  },
};
