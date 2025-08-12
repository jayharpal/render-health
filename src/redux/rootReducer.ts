import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import inquiryReducer from './slices/inquiry';
import projectReducer from './slices/projects';
import internReducer from './slices/interns';
import taskboardReducer from './slices/taskboard';
import roadmapReducer from './slices/roadmap';
import roadmapUserReducer from './slices/roadmap_users';
import communityQuestionReducer from './slices/community_question';
import communityAnswerReducer from './slices/community_answer';
import chatReducer from './slices/chat';
import courseReducer from './slices/course';
import subjectReducer from './slices/subject';
import chapterReducer from './slices/chapter';
import topicReducer from './slices/topic';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const inquiryPersistConfig = {
  key: 'inquiry',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const projectPersistConfig = {
  key: 'projects',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const internPersistConfig = {
  key: 'interns',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const taskboardPersistConfig = {
  key: 'taskboard',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const roadmapPersistConfig = {
  key: 'roadmap',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const roadmapUserPersistConfig = {
  key: 'roadmap_users',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const communityQuestionPersistConfig = {
  key: 'community_question',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const communityAnswerPersistConfig = {
  key: 'community_answer',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const chatPersistConfig = {
  key: 'chat',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const coursePersistConfig = {
  key: 'course',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const subjectPersistConfig = {
  key: 'subject',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const chapterPersistConfig = {
  key: 'chapter',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const topicPersistConfig = {
  key: 'topic',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  inquiry: persistReducer(inquiryPersistConfig, inquiryReducer),
  projects: persistReducer(projectPersistConfig, projectReducer),
  interns: persistReducer(internPersistConfig, internReducer),
  taskboard: persistReducer(taskboardPersistConfig, taskboardReducer),
  roadmap: persistReducer(roadmapPersistConfig, roadmapReducer),
  roadmap_users: persistReducer(roadmapUserPersistConfig, roadmapUserReducer),
  community_question: persistReducer(communityQuestionPersistConfig, communityQuestionReducer),
  community_answer: persistReducer(communityAnswerPersistConfig, communityAnswerReducer),
  chat: persistReducer(chatPersistConfig, chatReducer),
  course: persistReducer(coursePersistConfig, courseReducer),
  subject: persistReducer(subjectPersistConfig, subjectReducer),
  chapter: persistReducer(chapterPersistConfig, chapterReducer),
  topic: persistReducer(topicPersistConfig, topicReducer),
});

export default rootReducer;
