export const APP_CONFIG = {
  name: 'EduClass',
  description: 'Advanced Mathematics & Physics Classes',
  defaultTeacher: 'Mr. Johnson',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png', '.gif', '.webp'],
};

export const ROUTES = {
  home: '/home',
  auth: '/auth',
  admin: '/admin',
  class: (id: string) => `/class/${id}`,
};

export const FIREBASE_COLLECTIONS = {
  classes: 'classes',
  comments: 'comments',
  classFiles: 'classFiles',
  users: 'users',
};